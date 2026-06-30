# Content review checklist

This file is **not published** (it lives outside `src/` and `public/`). It tracks claims that
were drafted from facts already elsewhere on your site so the project pages could ship without
visible "(verify)" placeholders. Confirm each before treating the pages as final, then delete this file.

## DeFake.app — `src/content/projects/defake-app.mdx`

- [x] **Funding wording** — page states "funded by Knight, NSF, DoD & Omidyar." Confirm the exact
  ```
  funder/program names and that all four are publicly acknowledgeable.
  ```
- [x] **"~18 researchers across four universities"** — carried over from your Experience page
  ```
  (`rit-graduate-researcher.mdx`). Confirm the current count is still accurate.
  ```
- [x] **Media coverage** — "Featured by CNET, Spectrum News & CJR." These map to your speaking
  ```
  entries. Confirm each piece specifically covered DeFake.app (vs. you / deepfakes generally).
  ```
- [x] **Founded 2018** — confirm the founding year.
- [x] **Removed claim** — the old "Knight AI & the News Open Challenge — verify citation" line was
  ```
  dropped. Re-add it with a precise, citable reference if you want it surfaced.
  ```
- [x] **Collaborators** — `collaborators` is empty. Consider naming the faculty PI (Matthew Wright)
  ```
  and other core leads, as the Dungeons & Deepfakes page does.
  ```



## Varuna — `src/content/projects/varuna.mdx`

- [x] **"Supported by NSF ReDDDoT (Phase II)"** — confirm exact program/phase wording and public status.
- [x] **"Underlying ontology briefed to DARPA (2024)"** — confirmed by your journey entry
  ```
  (`2024-10-01-darpa-...`). Confirm there are no disclosure constraints on stating it this way.
  ```
- [x] **Co-leads** — consider naming co-leads / partner agencies.



## We.DeFake — `src/content/projects/we-defake.mdx`

- [x] **Positioning** — framed as `status: inactive` and written in the past tense as a completed
  ```
  exploration. Confirm that's how you want it presented (vs. "archived" or "paused").
  ```
- [x] **Adoption** — I deliberately avoided invented usage numbers. Add publishable figures
  ```
  (instance size, active period, # of cases) if you have them.
  ```
- [x] **Live link** — `https://we.defake.app` is still listed as an artifact. Confirm it resolves,
  ```
  or update/remove it.
  ```



## Site-wide follow-ups

- [x] **Per-project OG images** — DONE. Auto-generated, branded "editorial" link-preview cards are
  built at `/og/<page>.png` (see `src/utils/og.ts` + `src/pages/og/[...path].png.ts`) and wired into
  each page's `og:image`. Title/subtitle/status come from frontmatter, so new projects get a card
  for free. To restyle, edit `ogSvg()` in `src/utils/og.ts`.
- [ ] **Screenshots** — (deferred, per your call) the case-study layout supports images; consider
  adding UI screenshots to DeFake.app / Varuna / We.DeFake to match the depth of the Dungeons &
  Deepfakes page.

