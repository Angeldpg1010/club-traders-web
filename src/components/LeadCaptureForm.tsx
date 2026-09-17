"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/data/config";

export default function LeadCaptureForm() {
  const [details, setDetails] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slow, setSlow] = useState(false);
  const [formToken, setFormToken] = useState("");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [trackingWarning, setTrackingWarning] = useState(false);
  const trackingSent = useRef(false);
  const campaign = useRef<Record<string, string>>({});
  const submitting = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const value = params.get(key);
      if (value && /^[\p{L}\p{N} _.-]{1,80}$/u.test(value)) campaign.current[key] = value;
    }
    fetch("/api/registro", { cache: "no-store", signal: AbortSignal.timeout(15000) }).then(async r => { const data = await r.json(); if (!r.ok || !data.token) throw new Error("prepare"); return data; }).then(r => setFormToken(r.token)).catch(() => setError("No pudimos preparar el formulario. Recarga la página para volver a intentarlo."));
  }, []);

  useEffect(() => {
    if (!saving) return;
    const timer = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(timer);
  }, [saving]);

  function trackWhatsApp() {
    if (!receipt || trackingSent.current) return;
    trackingSent.current = true;
    fetch("/api/eventos", {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ event: "whatsapp_click", receipt }),
    }).then(r => { if (!r.ok) throw new Error("tracking"); }).catch(() => {
      trackingSent.current = false;
      setTrackingWarning(true);
    });
  }
  const nextStep = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (details) nextStep.current?.focus();
  }, [details]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError("");
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Escribe tu nombre.");
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const phone = phoneInput.value.trim().replace(/[\s().-]/g, "");
    phoneInput.setCustomValidity(/^\+[1-9]\d{7,14}$/.test(phone) ? "" : "Incluye el prefijo del país, por ejemplo +593 99 123 4567.");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const registration = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      phone,
    };
    submitting.current = true;
    setSaving(true);
    setSlow(false);
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...registration, consent: data.get("consent") === "on", website: data.get("website") || "", formToken, measurement: data.get("measurement") === "on", attribution: data.get("measurement") === "on" ? campaign.current : {} }),
        signal: AbortSignal.timeout(70000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.message || "No pudimos guardar tu registro. Inténtalo de nuevo.");
      setReceipt(result.receipt || null);
      setDetails(registration);
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "La conexión tardó demasiado o se interrumpió. Conservamos los datos en este formulario: reintenta con el mismo correo para evitar duplicados.");
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  const whatsappUrl = EVENT_CONFIG.whatsappGroupUrl;
  const inputClass = "mt-2 w-full rounded-xl border border-slate-600 bg-white/5 px-4 py-4 text-base text-white placeholder:text-slate-500 focus:border-[#00e5ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/30";

  return (
    <section id="registro" aria-labelledby="registration-title" className="scroll-mt-28 max-w-3xl mx-auto">
      <div className="rounded-3xl border border-slate-700 bg-[#142039] p-6 sm:p-10 shadow-2xl shadow-cyan-950/20">
        <div className="flex items-center justify-center gap-3 text-xs font-semibold mb-6" aria-label={details ? "Paso 2 de 2: WhatsApp" : "Paso 1 de 2: Tus datos"}>
          <span className={details ? "text-slate-400" : "text-[#00e5ff]"}>1. Tus datos</span>
          <ArrowRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span className={details ? "text-emerald-400" : "text-slate-400"}>2. WhatsApp</span>
        </div>

        {!details ? (
          <>
            <h2 id="registration-title" className="text-2xl sm:text-3xl font-bold text-white text-center">Regístrate gratis al Bootcamp</h2>
            <p className="mt-3 mb-7 text-sm sm:text-base text-slate-300 text-center">
              Completa tus datos para registrarte gratis. Después podrás acceder a WhatsApp para recibir las clases.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5" aria-busy={saving}>
              <div hidden aria-hidden="true"><label htmlFor="registration-website">Website</label><input id="registration-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div>
                <label htmlFor="registration-name" className="font-semibold text-slate-200">Nombre completo</label>
                <input id="registration-name" name="name" type="text" autoComplete="name" placeholder="Escribe tu nombre" required maxLength={120} className={inputClass}
                  onInput={(event) => event.currentTarget.setCustomValidity("")} />
              </div>
              <div>
                <label htmlFor="registration-email" className="font-semibold text-slate-200">Correo electrónico</label>
                <input id="registration-email" name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" required maxLength={254} className={inputClass} />
              </div>
              <div>
                <label htmlFor="registration-phone" className="font-semibold text-slate-200">Teléfono (WhatsApp)</label>
                <input id="registration-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+593 99 123 4567" required maxLength={30} aria-describedby="phone-help" className={inputClass}
                  onInput={(event) => event.currentTarget.setCustomValidity("")} />
                <p id="phone-help" className="mt-2 text-xs text-slate-400">Incluye el prefijo de tu país: +593 Ecuador, +34 España, etc.</p>
              </div>
              <p id="registration-note" className="text-xs text-slate-400 leading-relaxed">
                Responsable: Richard Veintimilla, Club de Traders. Usaremos tu nombre, correo y teléfono para gestionar esta inscripción y las comunicaciones del Bootcamp. Puedes pedir acceso, corrección o eliminación en {EVENT_CONFIG.academia.email}. <Link href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Consulta cómo tratamos tus datos</Link>.
              </p>
              <label className="flex items-start gap-3 text-sm text-slate-300"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" /><span>He leído la información de privacidad y autorizo el uso de mis datos para gestionar mi participación y recibir comunicaciones de este Bootcamp.</span></label>
              <label className="flex items-start gap-3 text-sm text-slate-300"><input type="checkbox" name="measurement" className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" /><span>Opcional: permito asociar mi inscripción a la campaña de procedencia y registrar si pulso el botón de WhatsApp, para mejorar la difusión del evento.</span></label>
              {saving && <p role="status" aria-live="polite" className="text-sm text-cyan-200">{slow ? "Seguimos esperando la confirmación. Puede tardar hasta un minuto. Mantén esta página abierta; no necesitas volver a enviar." : "Estamos guardando tu inscripción. Te mostraremos WhatsApp cuando recibamos la confirmación."}</p>}
              {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
              <button disabled={saving || !formToken} type="submit" aria-describedby="registration-note" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#d6ad55] hover:bg-[#e5bf70] px-5 py-4 font-bold text-lg text-[#101b30] transition-colors disabled:opacity-60 disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6ad55]">
                {saving ? "Guardando registro…" : !formToken ? "Preparando formulario…" : "Registrarme sin costo"} <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-400">{EVENT_CONFIG.duracion} · {EVENT_CONFIG.horario}</p>
          </>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" aria-hidden="true" />
            <h2 id="registration-title" ref={nextStep} tabIndex={-1} className="text-2xl sm:text-3xl font-bold text-white focus:outline-none">
              {details.name.split(" ")[0]}, ¡tu registro está guardado!
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Únete al grupo de WhatsApp para recibir los enlaces de las clases en vivo y los materiales del Bootcamp.
            </p>
            <a onClick={trackWhatsApp} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] px-5 py-4 text-base sm:text-lg font-bold text-[#062512] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
              <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
              Unirme al grupo de WhatsApp
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </a>
            {trackingWarning && <p role="status" className="mt-3 text-xs text-slate-400">Tu inscripción está guardada. No pudimos registrar la estadística del clic; puedes continuar a WhatsApp con normalidad.</p>}
            <p className="mt-4 text-xs text-slate-400">Se abrirá la invitación al grupo. Sigue las indicaciones de WhatsApp para unirte.</p>
          </div>
        )}
      </div>
    </section>
  );
}
