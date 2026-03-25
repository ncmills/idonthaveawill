import { jsPDF } from "jspdf";
import type { GeneratedWill } from "@/lib/types";

const MARGIN = 72; // 1 inch in points
const PAGE_WIDTH = 612; // Letter width in points
const PAGE_HEIGHT = 792; // Letter height in points
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FONT = "times";
const FONT_SIZE = 12;
const LINE_HEIGHT = 16;

export function downloadPdf(will: GeneratedWill) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  let y = MARGIN;

  function ensureSpace(needed: number) {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  }

  function writeLines(
    text: string,
    options?: { bold?: boolean; size?: number; center?: boolean; allCaps?: boolean }
  ) {
    const size = options?.size ?? FONT_SIZE;
    const style = options?.bold ? "bold" : "normal";
    doc.setFont(FONT, style);
    doc.setFontSize(size);

    const lineH = (size / FONT_SIZE) * LINE_HEIGHT;
    const paragraphs = text.split("\n");

    for (const para of paragraphs) {
      const displayText = options?.allCaps ? para.toUpperCase() : para;

      if (displayText.trim() === "") {
        y += lineH * 0.5;
        continue;
      }

      const wrapped = doc.splitTextToSize(displayText, CONTENT_WIDTH) as string[];
      for (const line of wrapped) {
        ensureSpace(lineH);
        if (options?.center) {
          doc.text(line, PAGE_WIDTH / 2, y, { align: "center" });
        } else {
          doc.text(line, MARGIN, y);
        }
        y += lineH;
      }
    }
  }

  // Title
  writeLines(will.title, { bold: true, size: 14, center: true });
  y += LINE_HEIGHT;

  // Preamble
  writeLines(will.preamble);
  y += LINE_HEIGHT * 0.5;

  // Articles
  for (const article of will.articles) {
    ensureSpace(LINE_HEIGHT * 3);
    y += LINE_HEIGHT * 0.5;
    writeLines(article.heading, { bold: true, allCaps: true });
    y += 4;
    writeLines(article.content);
  }

  // Testimonium
  y += LINE_HEIGHT;
  writeLines(will.testimonium);

  // Signature block
  y += LINE_HEIGHT;
  writeLines(will.signatureBlock);

  // Witness block
  if (will.witnessBlock) {
    y += LINE_HEIGHT * 1.5;
    writeLines(will.witnessBlock);
  }

  // Self-proving affidavit
  if (will.selfProvingAffidavit) {
    y += LINE_HEIGHT * 1.5;
    // Draw a separator line
    ensureSpace(LINE_HEIGHT * 3);
    doc.setDrawColor(180);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += LINE_HEIGHT;
    writeLines(will.selfProvingAffidavit);
  }

  // Notarial attestation
  if (will.notarialAttestation) {
    y += LINE_HEIGHT * 1.5;
    ensureSpace(LINE_HEIGHT * 3);
    doc.setDrawColor(180);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += LINE_HEIGHT;
    writeLines(will.notarialAttestation);
  }

  doc.save("Last-Will-and-Testament.pdf");
}
