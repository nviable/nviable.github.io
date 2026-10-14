/**
 * Cover assets are either logo lockups or a real figure.
 * Logo files are named as such, or shipped as SVG. Other raster covers are figures.
 * Missing covers stay missing — callers should not invent a frame.
 */
export function projectCoverKind(url: string | undefined): 'logo' | 'figure' | null {
  if (!url) return null;
  const path = url.split(/[?#]/)[0].toLowerCase();
  if (path.endsWith('.svg') || path.includes('logo') || path.includes('lockup')) return 'logo';
  return 'figure';
}
