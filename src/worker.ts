import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler';
import type { SSRManifest } from 'astro';
import { fetchAppleStock, recordStockCheckToD1 } from './lib/stockChecker';

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  const fetch = async (request: any, env: any, context: any) => {
    return await handle(manifest, app, request, env, context);
  };

  const scheduled = async (_controller: any, env: any, context: any) => {
    context.waitUntil(
      (async () => {
        try {
          const result = await fetchAppleStock();
          if (env.DB) {
            await recordStockCheckToD1(env.DB, result, env.RESTOCK_WEBHOOK_URL);
          }
        } catch (err) {
          console.error('Scheduled stock check error:', err);
        }
      })()
    );
  };

  return {
    default: { fetch, scheduled },
  };
}
