#!/usr/bin/env node
/**
 * Upload a file to Cloudflare R2 via the S3-compatible API.
 *
 * Prerequisites (in .env — do not commit secrets):
 *   R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID=...
 *   R2_SECRET_ACCESS_KEY=...
 *   R2_BUCKET=your-bucket-name
 *
 * Optional:
 *   R2_PUBLIC_BASE_URL=https://cdn.example.com/your-bucket   (no trailing slash; include bucket in path if that is how objects are served publicly)
 *
 * Usage:
 *   node scripts/upload-r2.mjs <object-key> <local-file-path>
 *
 * Example:
 *   node scripts/upload-r2.mjs journey/2026-hcic/banner.webp ./banner.webp
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** Load root `.env` into process.env when keys are unset (no extra dependency). */
function loadEnvFile() {
  const p = resolve(__dirname, '../.env');
  if (!existsSync(p)) return;
  const text = readFileSync(p, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadEnvFile();

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

function contentTypeFor(path) {
  const lower = path.toLowerCase();
  const dot = lower.lastIndexOf('.');
  const ext = dot >= 0 ? lower.slice(dot) : '';
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

const [key, localPath] = process.argv.slice(2);
if (!key || !localPath) {
  console.error('Usage: node scripts/upload-r2.mjs <object-key> <local-file-path>');
  process.exit(1);
}

const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;

if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
  console.error(
    'Missing R2 env: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET'
  );
  process.exit(1);
}

const abs = resolve(process.cwd(), localPath);
if (!existsSync(abs)) {
  console.error(`File not found: ${abs}`);
  process.exit(1);
}

const body = readFileSync(abs);
const client = new S3Client({
  region: 'auto',
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  /** Required for R2 so objects land under the bucket/key layout the S3 API and public URLs expect */
  forcePathStyle: true,
});

const normalizedKey = key.replace(/^\/+/, '');

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: normalizedKey,
    Body: body,
    ContentType: contentTypeFor(abs),
    CacheControl: 'public, max-age=31536000, immutable',
  })
);

const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';
if (base) {
  console.log(`${base}/${normalizedKey}`);
} else {
  console.log(`OK s3://${bucket}/${normalizedKey}`);
}
