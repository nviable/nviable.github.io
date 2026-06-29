# Contact form setup (Cloudflare-native)

The `/contact` page works in two modes:

- **Before setup** — it shows your email plus prefilled-subject `mailto:` buttons. No configuration
  needed; this is live as soon as you deploy.
- **After setup** — it renders a real form. Submissions are sent to your inbox using **Cloudflare
  Email Routing** (no third-party service), with **Cloudflare Turnstile** for spam protection.

The page is server-rendered on demand (`export const prerender = false`) and runs on your existing
Cloudflare Worker. The form appears automatically once the `CONTACT_MAILER` binding exists — there is
no code change to make.

---

## 1. Enable Email Routing & verify a destination

1. Cloudflare dashboard → your zone (`nviable.me`) → **Email** → **Email Routing** → enable it.
2. **Destination addresses** → add your real inbox (e.g. a Gmail/RIT address) and click the
   verification link Cloudflare emails you. This is the address that will *receive* form submissions.

> The `send_email` binding can only deliver to a **verified** destination address — which is exactly
> what a contact form needs.

## 2. Add the binding in `wrangler.jsonc`

Uncomment the two trailing blocks in [`wrangler.jsonc`](../wrangler.jsonc) and set your verified
address:

```jsonc
,"send_email": [
  { "name": "CONTACT_MAILER", "destination_address": "you@verified-inbox.example" }
]
,"vars": {
  "CONTACT_FROM": "website@nviable.me",
  "CONTACT_TO": "you@verified-inbox.example"
}
```

- `CONTACT_FROM` must be an address on an Email-Routing-enabled domain you control (`@nviable.me`).
- `CONTACT_TO` must equal the **verified** destination from step 1.

## 3. Set up Turnstile (spam protection)

1. Cloudflare dashboard → **Turnstile** → add a widget for `nviable.me`. Copy the **Site key** and
   **Secret key**.
2. Site key (public) → set `PUBLIC_TURNSTILE_SITE_KEY` in your build environment
   (local `.env` and your production build env).
3. Secret key (private) → store as a Worker secret:

   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```

If you skip Turnstile, the form still works (a hidden honeypot field provides basic bot defense),
but adding it is recommended.

## 4. Deploy

```bash
npm run deploy
```

Visit `/contact`. With the binding present you'll see the form; submit a test message and confirm it
lands in your inbox. Replies go straight to the sender (their address is set as `Reply-To`).

---

## How it works / security notes

- POSTs are handled in [`src/pages/contact.astro`](../src/pages/contact.astro) using the
  Post/Redirect/Get pattern, so refreshing never re-submits.
- The sender's address is placed in `Reply-To`; all user-supplied values are stripped of CR/LF before
  going into email headers (prevents header injection).
- Turnstile is verified server-side against `siteverify` before any email is sent.
- If the binding is missing or sending fails, the page falls back to the direct-email path and shows a
  clear message — it never silently drops a submission.

## Troubleshooting

- **Form not showing** → the `CONTACT_MAILER` binding isn't being picked up. Re-check `wrangler.jsonc`
  and redeploy.
- **`Invalid binding` / send errors** → the destination address isn't verified, or `CONTACT_FROM`
  isn't on an Email-Routing domain.
- **Turnstile always fails** → site key and secret are from different widgets, or the secret wasn't
  saved with `wrangler secret put`.
