/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * Cloudflare Worker runtime bindings exposed on `Astro.locals.runtime.env`
 * for on-demand routes (e.g. the contact form). All optional so the route can
 * degrade gracefully when the bindings/secrets are not configured.
 */
interface CloudflareEnv {
  /** Cloudflare Email Routing `send_email` binding (set in wrangler config). */
  CONTACT_MAILER?: { send(message: unknown): Promise<void> };
  /** Verified "from" address on an Email-Routing-enabled domain. */
  CONTACT_FROM?: string;
  /** Verified destination address that receives form submissions. */
  CONTACT_TO?: string;
  /** Cloudflare Turnstile secret key (set via `wrangler secret put`). */
  TURNSTILE_SECRET_KEY?: string;
  [key: string]: unknown;
}

type CloudflareRuntime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals extends CloudflareRuntime {}
}

/** Workers built-in module for sending email through an Email Routing binding. */
declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string | ReadableStream);
  }
}
