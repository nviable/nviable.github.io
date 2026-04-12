/**
 * Shorten long text for card and list previews (abstracts, descriptions).
 */
export function truncateForPreview(text: string, maxChars = 220): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const cut = t.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + '…';
}
