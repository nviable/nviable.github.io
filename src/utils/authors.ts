/**
 * Highlight the site owner in a publication author string.
 * Authors are stored as one string; only the matching name is wrapped.
 */
const OWNER_NAME_SOURCE =
  'Saniat(?:\\s+Javid)?\\s+Sohrawardi|S\\.\\s*J\\.\\s*Sohrawardi|Sohrawardi,\\s*(?:Saniat(?:\\s+Javid)?|S\\.\\s*J\\.?)';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function emphasizeOwner(authors: string): string {
  const source = authors ?? '';
  const pattern = new RegExp(OWNER_NAME_SOURCE, 'g');
  let html = '';
  let cursor = 0;

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(source.slice(cursor, index));
    html += `<strong>${escapeHtml(match[0])}</strong>`;
    cursor = index + match[0].length;
  }

  html += escapeHtml(source.slice(cursor));
  return html;
}
