import type { APIRoute } from 'astro';
import {
  fetchAppleStock,
  recordStockCheckToD1,
  getD1RestockHistory,
  getD1RecentChecks,
} from '../../lib/stockChecker';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const env = (locals as any)?.runtime?.env;
  const db = env?.DB;
  const webhookUrl = env?.RESTOCK_WEBHOOK_URL;

  // Endpoint to query only stored history from Cloudflare D1
  if (action === 'history' || url.searchParams.has('history')) {
    const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 100);
    const history = db ? await getD1RestockHistory(db, limit) : [];
    return new Response(
      JSON.stringify({
        status: 'ok',
        source: db ? 'd1' : 'none',
        history,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }

  // Endpoint to query recent checks (all events)
  if (action === 'recent') {
    const limit = Math.min(Number(url.searchParams.get('limit')) || 60, 100);
    const recent = db ? await getD1RecentChecks(db, limit) : [];
    return new Response(
      JSON.stringify({
        status: 'ok',
        source: db ? 'd1' : 'none',
        recent,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }

  // Standard live inventory check
  try {
    const stockResult = await fetchAppleStock();

    if (!stockResult.success) {
      return new Response(
        JSON.stringify({
          status: 'error',
          error: stockResult.error || 'Failed to fetch Apple stock data',
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Persist to Cloudflare D1 and trigger restock notifications
    let restocks: any[] = [];
    if (db) {
      try {
        const recordResult = await recordStockCheckToD1(db, stockResult, webhookUrl);
        restocks = recordResult.restocks;
      } catch (dbErr) {
        console.error('Failed to log stock check into D1:', dbErr);
      }
    }

    // Retrieve recent restock history from D1
    const d1History = db ? await getD1RestockHistory(db, 30) : [];

    return new Response(
      JSON.stringify({
        status: 'ok',
        timestamp: stockResult.timestamp,
        location: stockResult.location,
        zip: stockResult.location,
        stores: stockResult.stores,
        history: d1History,
        restocks,
        d1Active: Boolean(db),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30, s-maxage=30',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        error: err?.message || 'Internal server error while checking stock',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
