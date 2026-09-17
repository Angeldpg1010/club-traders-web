import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const fail = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return fail("Solicitud no válida.", 403);
  }
  try {
    const raw = await request.text();
    if (raw.length > 4096) return fail("Solicitud demasiado grande.", 413);
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || data.website) return fail("Solicitud no válida.");
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim().replace(/[\s().-]/g, "") : "";
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+[1-9]\d{7,14}$/.test(phone) || data.consent !== true) {
      return fail("Revisa tu nombre, correo, teléfono y autorización de registro.");
    }
    const url = process.env.REGISTRATION_SCRIPT_URL;
    const secret = process.env.REGISTRATION_SECRET;
    if (!url || !secret || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url)) {
      return fail("El registro no está disponible en este momento. Inténtalo más tarde.", 503);
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, consent: true, secret }),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok || (await response.json()).ok !== true) {
      return fail("No pudimos guardar tu registro. Vuelve a intentarlo.", 502);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return fail("No pudimos guardar tu registro. Revisa tus datos y vuelve a intentarlo.", 503);
  }
}
