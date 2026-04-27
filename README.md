# nviable.github.io

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">

[![Visit site](https://img.shields.io/badge/Visit_site-→-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://nviable.me)
[![View source](https://img.shields.io/badge/View_source-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nviable/nviable.github.io)

</div>

Personal research site built with [Astro](https://astro.build). It highlights work at the intersection of human–computer interaction, usability, and AI-assisted media verification—research projects, publications, and contact—in a case-study-style layout (based on the [Case](https://github.com/erlandv/case) theme).

**Live site:** [https://nviable.me](https://nviable.me)

## Prerequisites

- **Node.js** — current LTS (e.g. 20.x or 22.x) and npm
- **Git** — to clone the repository

## Local development

### 1. Clone and install dependencies

```bash
git clone https://github.com/nviable/nviable.github.io.git
cd nviable.github.io
npm install
```

### 2. Environment variables

Create a local `.env` from the example file and edit values for your machine and identity:

```bash
cp .env.example .env
```

At minimum, set **`SITE_URL`** to the URL you care about for metadata:

- For day-to-day local work, `http://localhost:4321` is fine.
- For production builds and deployment, use your public URL (e.g. `https://nviable.me`).

Other variables (`SITE_TITLE`, `SITE_AUTHOR_*`, `SOCIAL_*`, etc.) drive the global config in `src/config.ts`. Leave a social URL empty to hide that link in the UI.

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). The dev server reloads when you change files.

**File watching on Windows / WSL:** If you keep the repo on a Windows drive inside WSL (paths under `/mnt/...`), saves might not trigger reloads. This project enables Vite polling in that situation in `astro.config.mjs`; if you still see stale pages, move the clone to the Linux filesystem (e.g. under `/home/...`).

## Useful scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Development server (same as `npm start`) |
| `npm run build` | Typecheck (`astro check`) and production build to `dist/` |
| `npm run preview` | Build, then run locally with [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare adapter) |
| `npm run deploy` | Build and deploy to Cloudflare (requires Wrangler login and project setup) |
| `npm run cf-typegen` | Regenerate Wrangler-related types |
| `npm run assets:upload` | Upload a file to R2 (see [Images on Cloudflare R2](#images-on-cloudflare-r2)) |

For a static preview of the build without Cloudflare, you can serve `dist/` with any static file server after `npm run build`.

## Images on Cloudflare R2

The site can load optimized images from a **public** R2 bucket (or custom domain) using `PUBLIC_ASSETS_URL` and the `RemoteImage` component (`src/components/RemoteImage.astro`). The repo includes a small uploader that talks to R2’s **S3-compatible API**.

### One-time: bucket, public URL, and API credentials

1. In the [Cloudflare dashboard](https://dash.cloudflare.com) open **R2** → **Create bucket** (e.g. `my-site-assets`). Object keys are the path (e.g. `journey/2026-04-11/photo.jpg`).

2. **Expose objects in the browser** (pick one or both):
   - **Custom domain** (recommended for production): R2 → your bucket → **Settings** → **Custom Domains** — connect something like `cdn.yoursite.com` and note the public URL pattern (sometimes the path includes the bucket name, e.g. `https://cdn.yoursite.com/bucket-name/...`).

3. **S3 API credentials** for uploads: R2 → **Manage R2 API Tokens** (or **Account API Tokens** with R2 permissions) → create a token with **Object Read & Write** (and **Create** for the target bucket as needed). You get:
   - **Access Key ID** and **Secret Access Key** — map to `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` in `.env`.
   - **S3 API endpoint** for the account, usually: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` (no bucket in the hostname) — this is `R2_ENDPOINT`.

4. **Environment variables** (copy from [`.env.example`](./.env.example), fill a local `.env` — **never commit secrets**):
   - **`R2_ENDPOINT`** — account S3 endpoint (see above).
   - **`R2_ACCESS_KEY_ID`**, **`R2_SECRET_ACCESS_KEY`** — from the R2 / S3 API token.
   - **`R2_BUCKET`** — exact bucket name.
   - **`R2_PUBLIC_BASE_URL`** (optional but useful) — the **https** prefix that matches what visitors use in the browser, **no trailing slash**. If the public URL is `https://cdn.example.com/my-bucket/key`, set this to `https://cdn.example.com/my-bucket` so the uploader can print the final public URL.
   - **`PUBLIC_ASSETS_URL`** — same idea as the public base for the site: the prefix Astro uses for `RemoteImage` and `astro.config` remote image patterns. It should match how objects are **actually** served (including bucket in the path if your CDN is set up that way). Set in **local `.env` and Cloudflare Pages** environment for builds.

5. `astro.config.mjs` whitelists your asset origin; after changing `PUBLIC_ASSETS_URL`, restart the dev server.

### Upload a file from this repo

With `.env` loaded and dependencies installed:

```bash
npm run assets:upload -- <object-key> <path-to-local-file>
```

Example:

```bash
npm run assets:upload -- journey/2026-04-11/ims.jpg ./images/ims.jpg
```

The script (`scripts/upload-r2.mjs`) uses `@aws-sdk/client-s3` with `forcePathStyle: true` (required for R2). It sets a long `Cache-Control` for images. If `R2_PUBLIC_BASE_URL` is set, it prints the full **https** URL to use in content.

**Alternatives:** [Wrangler R2](https://developers.cloudflare.com/workers/wrangler/commands/#r2) (`wrangler r2 object put ...`), the R2 **Upload** action in the dashboard, or any S3 client pointed at the same endpoint and bucket.

### Use an image in MDX

Reference the public URL. Prefer the env-based prefix so dev/prod stay aligned:

```mdx
<RemoteImage
  src={`${import.meta.env.PUBLIC_ASSETS_URL}/journey/2026-04-11/ims.jpg`}
  alt="Description"
/>
```

If `PUBLIC_ASSETS_URL` is empty locally, the image will not resolve until the variable is set.

## Project layout (short)

- **`src/pages/`** — Routes (e.g. home, projects, publications, contact)
- **`src/content/`** — MDX content collections (projects, publications, and other collections used by the theme)
- **`src/components/`** — Astro components
- **`src/config.ts`** — Site title, nav, author, and social links (values from `.env`)
- **`astro.config.mjs`** — Astro, MDX, sitemap, image, and Cloudflare adapter settings

Navigation items are defined in `src/config.ts` (`siteConfig.nav`).

## Theme documentation

The repository still includes the Case theme docs under [`docs/`](./docs/) (content schemas, styling, deployment ideas). Use them when you add or change collection front matter, components, or layout.

## License

Theme and site materials are covered by the [MIT License](./LICENSE) unless noted otherwise.
