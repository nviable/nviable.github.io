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

For a static preview of the build without Cloudflare, you can serve `dist/` with any static file server after `npm run build`.

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
