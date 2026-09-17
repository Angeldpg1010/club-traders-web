import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { clientKey, limited, report, sameOrigin, scriptRequest, verify } from "@/lib/registration-security";
export const runtime = "nodejs";
export const maxDuration = 65;
export async function POST(request: Request) {
  const started = Date.now(), requestId = randomUUID();
  if (!sameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  if (limited(`event:${clientKey(request)}`, 20)) return NextResponse.json({ ok: false }, { status: 429 });
  try {
    const raw = await request.text();
    if (raw.length > 1024) return NextResponse.json({ ok: false }, { status: 413 });
    const data = JSON.parse(raw);
    const id = verify(data?.receipt, "event");
    if (!id || data.event !== "whatsapp_click") return NextResponse.json({ ok: false }, { status: 400 });
    const result = await scriptRequest({ action: "whatsapp_click", id });
    if (result.ok !== true) throw new Error("event_rejected");
    report("whatsapp_click", requestId, started, "tracked");
    return NextResponse.json({ ok: true });
  } catch {
    report("whatsapp_click", requestId, started, "tracking_error");
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
