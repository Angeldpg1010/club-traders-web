"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function LeadCaptureForm() {
  const [details, setDetails] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
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
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...registration, consent: data.get("consent") === "on", website: data.get("website") || "" }),
        signal: AbortSignal.timeout(70000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.message || "No pudimos guardar tu registro. Inténtalo de nuevo.");
      setDetails(registration);
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "La conexión tardó demasiado. Vuelve a intentarlo.");
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  const message = details
    ? `¡Hola Richard! Quiero inscribirme sin costo al Bootcamp del Club.\nNombre: ${details.name}\nCorreo: ${details.email}\nTeléfono: ${details.phone}\nYa completé mi registro en la web. ¿Puedes enviarme el acceso al grupo de WhatsApp y a las clases por Zoom?`
    : "";
  const whatsappUrl = `https://wa.me/${EVENT_CONFIG.whatsappDirect}?text=${encodeURIComponent(message)}`;
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
                Guardaremos tu nombre, correo y teléfono para gestionar tu inscripción al Bootcamp. Puedes solicitar su eliminación escribiendo a {EVENT_CONFIG.academia.email}.
              </p>
              <label className="flex items-start gap-3 text-sm text-slate-300"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" /><span>Autorizo el registro de mis datos para gestionar mi participación y recibir información de este Bootcamp.</span></label>
              {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
              <button disabled={saving} type="submit" aria-describedby="registration-note" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#d6ad55] hover:bg-[#e5bf70] px-5 py-4 font-bold text-lg text-[#101b30] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6ad55]">
                {saving ? "Guardando registro…" : "Registrarme sin costo"} <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
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
              Continúa a WhatsApp y envía el mensaje a Richard para pedir acceso al grupo. Allí recibirás los enlaces de las clases en vivo y los materiales del Bootcamp.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] px-5 py-4 text-base sm:text-lg font-bold text-[#062512] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
              <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
              Continuar a WhatsApp
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-4 text-xs text-slate-400">Se abrirá el chat de {EVENT_CONFIG.mentor.nombre} ({EVENT_CONFIG.whatsappDisplay}). Recuerda enviar el mensaje.</p>
          </div>
        )}
      </div>
    </section>
  );
}
