export const DEFAULT_MEDIA_THUMBNAIL = "/images/media/media-default-thumb.png";

const ARTICLES_CACHE_REL_DIR = "/images/media/articles";
const cachedFilesMap = import.meta.glob("/public/images/media/articles/*");

function sanitizeSlug(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function findCachedThumbnail(safeSlug: string): string | null {
  for (const key of Object.keys(cachedFilesMap)) {
    const fileName = key.split("/").pop() || "";
    if (fileName.startsWith(`${safeSlug}.`)) {
      return `${ARTICLES_CACHE_REL_DIR}/${fileName}`;
    }
  }
  return null;
}

function isSafePublicHttpsUrl(rawUrl: string): URL | null {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
      /^169\.254\./.test(host)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function extractArticleMetaImage(html: string, baseUrl: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
    /<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match && match[1]) {
      const raw = match[1].replace(/&amp;/g, "&").trim();
      try {
        return new URL(raw, baseUrl).href;
      } catch {
        return null;
      }
    }
  }
  return null;
}

function detectImageExtension(buf: Uint8Array, contentType: string): "webp" | "png" | "jpg" | null {
  if (buf.length < 12) return null;
  // PNG magic bytes: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "png";
  }
  // JPEG magic bytes: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpg";
  }
  // WEBP magic bytes: RIFF....WEBP
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return "webp";
  }
  const ct = contentType.toLowerCase();
  if (ct.includes("image/webp")) return "webp";
  if (ct.includes("image/png")) return "png";
  if (ct.includes("image/jpeg") || ct.includes("image/jpg")) return "jpg";
  return null;
}

export async function resolveArticleThumbnail(options: {
  slug: string;
  url?: string;
  explicitThumbnail?: string;
}): Promise<string> {
  if (options.explicitThumbnail) {
    return options.explicitThumbnail;
  }

  const safeSlug = sanitizeSlug(options.slug);
  const cached = findCachedThumbnail(safeSlug);
  if (cached) {
    return cached;
  }

  if (!options.url) {
    return DEFAULT_MEDIA_THUMBNAIL;
  }

  const parsedArticleUrl = isSafePublicHttpsUrl(options.url);
  if (!parsedArticleUrl || parsedArticleUrl.pathname === "/" || parsedArticleUrl.pathname === "") {
    return DEFAULT_MEDIA_THUMBNAIL;
  }

  try {
    const res = await fetch(parsedArticleUrl.href, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      return DEFAULT_MEDIA_THUMBNAIL;
    }

    const html = await res.text();
    const metaImageUrl = extractArticleMetaImage(html, parsedArticleUrl.href);
    if (!metaImageUrl) {
      return DEFAULT_MEDIA_THUMBNAIL;
    }

    const parsedImageUrl = isSafePublicHttpsUrl(metaImageUrl);
    if (!parsedImageUrl) {
      return DEFAULT_MEDIA_THUMBNAIL;
    }

    const imgRes = await fetch(parsedImageUrl.href, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!imgRes.ok) {
      return DEFAULT_MEDIA_THUMBNAIL;
    }

    const buf = new Uint8Array(await imgRes.arrayBuffer());
    const ext = detectImageExtension(buf, imgRes.headers.get("content-type") || "");
    if (!ext || buf.length < 1024) {
      return DEFAULT_MEDIA_THUMBNAIL;
    }

    return parsedImageUrl.href;
  } catch {
    return DEFAULT_MEDIA_THUMBNAIL;
  }
}
