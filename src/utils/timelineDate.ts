/** Single format for all timeline rows: "Apr 12, 2024" */
export function formatTimelineDate(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}
