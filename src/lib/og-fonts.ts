/**
 * Font loading for the `next/og` link-preview card.
 *
 * ── WHY ───────────────────────────────────────────────────────────────────
 * Satori — the renderer behind ImageResponse — cannot see `next/font`,
 * `var(--font-display)`, or anything the browser has loaded. A `fontFamily` it
 * cannot resolve is NOT an error: it substitutes its own default and the build
 * stays green. This card asked for `Georgia, 'Iowan Old Style', serif` and
 * `system-ui, sans-serif`; edge Satori has neither, so the headline — the one
 * piece of this site most people ever see — rendered in a generic grotesque
 * while the site itself is set in Lora. The card and the page were two
 * different publications.
 *
 * Google's css2 endpoint serves WOFF2 to modern-Chrome UA strings and TTF when
 * no UA is sent. Satori only accepts TTF/OTF, so no UA is sent.
 *
 * ── WHY THIS FAILS OPEN ───────────────────────────────────────────────────
 * This is a network call inside an image route. If it throws, the card 500s
 * and the site has NO link preview at all, which is worse than the wrong
 * typeface. A failure returns an empty list and the card renders substituted,
 * exactly as it does today.
 */

async function googleTTF(query: string): Promise<ArrayBuffer> {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?${query}&display=swap`,
  );
  if (!cssRes.ok) throw new Error(`font css ${cssRes.status} for ${query}`);
  const css = await cssRes.text();
  const url =
    css.match(
      /src:\s*url\((https:[^)]+)\)\s*format\(['"]?(?:truetype|opentype)['"]?\)/,
    )?.[1] ?? css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`no font url for ${query}`);
  const fontRes = await fetch(url);
  if (!fontRes.ok) throw new Error(`font ${fontRes.status} for ${query}`);
  return fontRes.arrayBuffer();
}

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600;
  style: "normal" | "italic";
};

/**
 * Lora is the display face and BOTH cuts are needed — the card's second line
 * and its deck are italic, and Satori does not synthesise an oblique. Without
 * the italic file it would silently fall back to the roman and the two lines
 * would stop being two voices.
 */
export async function loadOgFonts(): Promise<OgFont[]> {
  try {
    const [lora, loraItalic, inter] = await Promise.all([
      googleTTF("family=Lora:wght@600"),
      googleTTF("family=Lora:ital,wght@1,500"),
      googleTTF("family=Inter:wght@500"),
    ]);
    return [
      { name: "Lora", data: lora, weight: 600, style: "normal" },
      { name: "Lora", data: loraItalic, weight: 500, style: "italic" },
      { name: "Inter", data: inter, weight: 500, style: "normal" },
    ];
  } catch {
    return [];
  }
}
