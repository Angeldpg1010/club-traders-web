import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const buckets = new Map<string, { count: number; until: number }>();
const secret = () => process.env.REGISTRATION_SECRET || "";
export function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}
export function token(kind: string, value = randomUUID()) {
  const payload = `${kind}:${Date.now()}:${value}`;
  return `${payload}.${sign(payload)}`;
}
export function verify(value: unknown, kind: string, minimumAge = 0): string | null {
  if (!secret() || typeof value !== "string" || value.length > 250) return null;
  const parts = value.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  if (!payload || !signature || !/^[a-f0-9]{64}$/.test(signature)) return null;
  if (!timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(sign(payload), "hex"))) return null;
  const fields = payload.split(":");
  if (fields.length !== 3) return null;
  const [type, issued, id] = fields;
  const age = Date.now() - Number(issued);
  return type === kind && Number.isFinite(age) && age >= minimumAge && age < 2 * 60 * 60 * 1000 && /^[a-zA-Z0-9-]{1,80}$/.test(id) ? id : null;
}
export function clientKey(request: Request) {
  // Vercel overwrites x-vercel-forwarded-for. Do not trust a client-supplied x-forwarded-for.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") || "unknown" : "local";
  return sign(`${new Date().toISOString().slice(0, 10)}:${ip}`);
}
export function limited(key: string, maximum: number, windowMs = 600000) {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.until <= now) buckets.delete(k);
  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= 10000) return true;
    bucket = { count: 0, until: now + windowMs };
    buckets.set(key, bucket);
  }
  return ++bucket.count > maximum;
}
export function sameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}
export function attribution(value: unknown): Record<string, string> {
  const result: Record<string, string> = {};
  if (!value || typeof value !== "object") return result;
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const raw = (value as Record<string, unknown>)[key];
    // Campaign labels only: discard email addresses, URLs and other arbitrary payloads.
    if (typeof raw === "string" && /^[\p{L}\p{N} _.-]{1,80}$/u.test(raw)) result[key] = raw;
  }
  return result;
}
export async function scriptRequest(body: Record<string, unknown>) {
  const url = process.env.REGISTRATION_SCRIPT_URL;
  if (!url || !secret() || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url)) throw new Error("configuration");
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, secret: secret() }), cache: "no-store", signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error("upstream_http");
  return response.json();
}
export function report(event: string, requestId: string, started: number, outcome: string) {
  const entry = JSON.stringify({ event, requestId, durationMs: Date.now() - started, outcome });
  // Never log submitted fields, campaign labels, IPs, receipts or secrets.
  if (outcome === "saved" || outcome === "duplicate" || outcome === "tracked") console.info(entry);
  else console.warn(entry);
}
