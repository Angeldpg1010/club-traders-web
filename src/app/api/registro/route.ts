import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { attribution, clientKey, limited, report, sameOrigin, scriptRequest, token, verify } from "@/lib/registration-security";
export const runtime = "nodejs";
export const maxDuration = 65;
export async function GET(request: Request) {
  if (!process.env.REGISTRATION_SECRET) return NextResponse.json({ ok: false }, { status: 503 });
  if (limited(`token:${clientKey(request)}`, 60)) return NextResponse.json({ ok: false }, { status: 429 });
  return NextResponse.json({ token: token("form") }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const requestId = randomUUID();
  const started = Date.now();
  const fail = (message: string, status = 400) => NextResponse.json({ ok: false, message, requestId }, { status, headers: status === 429 ? { "Retry-After": "600" } : undefined });
  if (!sameOrigin(request)) return fail("Solicitud no válida.", 403);
  const key = clientKey(request);
  if (limited(`register:${key}`, 10)) { report("registration", requestId, started, "rate_limited"); return fail("Has realizado varios intentos. Espera 10 minutos antes de volver a intentarlo.", 429); }
  try {
    if (Number(request.headers.get("content-length")) > 4096) return fail("Solicitud demasiado grande.", 413);
    const raw = await request.text();
    if (raw.length > 4096) return fail("Solicitud demasiado grande.", 413);
    let data;
    try { data = JSON.parse(raw); } catch { return fail("Solicitud no válida."); }
    if (!data || typeof data !== "object" || data.website || !verify(data.formToken, "form", 2000)) return fail("La sesión del formulario ha caducado o no es válida. Recarga la página y vuelve a intentarlo.");
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim().replace(/[\s().-]/g, "") : "";
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+[1-9]\d{7,14}$/.test(phone) || data.consent !== true) return fail("Revisa tu nombre, correo, teléfono y autorización de registro.");
    const id = randomUUID();
    const measurement = data.measurement === true;
    const result = await scriptRequest({ action: "register", name, email, phone, consent: true, policyVersion: "2026-09-17", measurement, attribution: measurement ? attribution(data.attribution) : {}, id, clientKey: key });
    if (result.code === "rate_limited") { report("registration", requestId, started, "rate_limited"); return fail("Has realizado varios intentos. Espera 10 minutos antes de volver a intentarlo.", 429); }
    if (result.ok !== true) throw new Error("upstream_rejected");
    report("registration", requestId, started, result.duplicate ? "duplicate" : "saved");
    // Never expose the ID/receipt of an existing email to another visitor.
    return NextResponse.json({ ok: true, receipt: measurement && !result.duplicate ? token("event", id) : null });
  } catch (error) {
    const outcome = error instanceof Error && error.name === "TimeoutError" ? "upstream_timeout" : "upstream_error";
    report("registration", requestId, started, outcome);
    return fail("No hemos podido confirmar el registro. Tus datos siguen en el formulario: puedes reintentar con el mismo correo sin duplicar la inscripción.", 503);
  }
}
