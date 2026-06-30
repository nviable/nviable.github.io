/**
 * Build-time Open Graph card generator.
 *
 * Renders a branded, "editorial" link-preview image (1200×630) for a page from
 * plain text fields, using an SVG template rasterized to PNG with sharp (already
 * a project dependency). Used only by the prerendered `/og/[...].png` endpoint,
 * so sharp runs at build time — never on the Cloudflare Worker at runtime.
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

// Pulled from the site's design tokens (src/styles/global.css).
const COLOR = {
  bg: '#0a0a0a',
  accent: '#43489C',
  accentLight: '#B9BDFF',
  title: '#f5f5f5',
  subtitle: '#a3a3a3',
  footer: '#e5e5e5',
  muted: '#8a8a8a',
  rule: '#2a2a2a',
};

export interface OgCard {
  /** Small uppercase label above the title (e.g. "Research project · Ongoing"). */
  eyebrow: string;
  /** Main heading. */
  title: string;
  /** Optional supporting line. */
  subtitle?: string;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (c) =>
    c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c === "'" ? '&apos;' : '&quot;',
  );
}

/** Greedy word-wrap to at most `maxLines`; ellipsizes the last line on overflow. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = '';
  for (const word of words) {
    const candidate = cur ? `${cur} ${word}` : word;
    if (candidate.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
      if (lines.length === maxLines) {
        cur = '';
        break;
      }
    } else {
      cur = candidate;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);

  const placed = lines.join(' ').split(/\s+/).filter(Boolean).length;
  if (placed < words.length && lines.length) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/[.,;:]?$/, '') + '…';
  }
  return lines;
}

export function ogSvg({ eyebrow, title, subtitle }: OgCard): string {
  const titleLines = wrap(title, 17, 2);
  const subLines = subtitle ? wrap(subtitle, 52, 2) : [];

  const titleSize = titleLines.length > 1 ? 74 : 88;
  const titleLH = titleSize + 6;
  const titleTop = titleLines.length > 1 ? 248 : 286;

  const titleTspans = titleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleLH}">${escapeXml(line)}</tspan>`)
    .join('');

  const subTop = titleTop + (titleLines.length - 1) * titleLH + 74;
  const subTspans = subLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 50}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${COLOR.bg}"/>
  <rect x="80" y="118" width="46" height="6" rx="3" fill="${COLOR.accent}"/>
  <text x="142" y="129" font-family="sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="${COLOR.accentLight}">${escapeXml(eyebrow.toUpperCase())}</text>
  <text y="${titleTop}" font-family="sans-serif" font-size="${titleSize}" font-weight="700" fill="${COLOR.title}">${titleTspans}</text>
  ${subLines.length ? `<text y="${subTop}" font-family="sans-serif" font-size="38" font-weight="400" fill="${COLOR.subtitle}">${subTspans}</text>` : ''}
  <rect x="80" y="520" width="1040" height="2" fill="${COLOR.rule}"/>
  <text x="80" y="573" font-family="sans-serif" font-size="30" font-weight="600" fill="${COLOR.footer}">Saniat Sohrawardi</text>
  <text x="1120" y="573" text-anchor="end" font-family="sans-serif" font-size="28" font-weight="500" fill="${COLOR.muted}">nviable.me</text>
</svg>`;
}

export async function ogPng(card: OgCard): Promise<Buffer> {
  return sharp(Buffer.from(ogSvg(card))).png().toBuffer();
}
