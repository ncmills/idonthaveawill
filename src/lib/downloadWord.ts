import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  Packer,
  SectionType,
} from "docx";
import { saveAs } from "file-saver";
import type { GeneratedWill } from "@/lib/types";

export async function downloadWord(will: GeneratedWill) {
  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: will.title,
          bold: true,
          size: 28,
          font: "Times New Roman",
        }),
      ],
    })
  );

  // Preamble
  children.push(
    ...textToParagraphs(will.preamble)
  );

  // Articles
  for (const article of will.articles) {
    children.push(
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: article.heading,
            bold: true,
            size: 24,
            font: "Times New Roman",
            allCaps: true,
          }),
        ],
      })
    );
    children.push(
      ...textToParagraphs(article.content)
    );
  }

  // Testimonium
  children.push(
    new Paragraph({ spacing: { before: 400 }, children: [] })
  );
  children.push(
    ...textToParagraphs(will.testimonium)
  );

  // Signature block
  children.push(
    new Paragraph({ spacing: { before: 300 }, children: [] })
  );
  for (const line of will.signatureBlock.split("\n")) {
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: line,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      })
    );
  }

  // Witness block
  if (will.witnessBlock) {
    children.push(
      new Paragraph({ spacing: { before: 400 }, children: [] })
    );
    for (const line of will.witnessBlock.split("\n")) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: line,
              font: "Times New Roman",
              size: 24,
            }),
          ],
        })
      );
    }
  }

  // Self-proving affidavit
  if (will.selfProvingAffidavit) {
    children.push(
      new Paragraph({
        spacing: { before: 400 },
        thematicBreak: true,
        children: [],
      })
    );
    for (const line of will.selfProvingAffidavit.split("\n")) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: line,
              font: "Times New Roman",
              size: 24,
            }),
          ],
        })
      );
    }
  }

  // Notarial attestation
  if (will.notarialAttestation) {
    children.push(
      new Paragraph({
        spacing: { before: 400 },
        thematicBreak: true,
        children: [],
      })
    );
    for (const line of will.notarialAttestation.split("\n")) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: line,
              font: "Times New Roman",
              size: 24,
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          type: SectionType.CONTINUOUS,
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Last-Will-and-Testament.docx");
}

function textToParagraphs(text: string): Paragraph[] {
  return text.split("\n").map(
    (line) =>
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: line,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      })
  );
}
