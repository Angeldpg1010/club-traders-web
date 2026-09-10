"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageSquare, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pais: "Ecuador",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Guardar localmente
    try {
      const existingLeads = JSON.parse(localStorage.getItem("club_traders_leads") || "[]");
      existingLeads.push({
        ...formData,
        fecha: new Date().toISOString(),
      });
      localStorage.setItem("club_traders_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.error(err);
    }

    const getWhatsAppTarget = () => {
      if (EVENT_CONFIG.whatsappGroupUrl && !EVENT_CONFIG.whatsappGroupUrl.includes("clubtraders-bootcamp")) {
        return EVENT_CONFIG.whatsappGroupUrl;
      }
      return `https://wa.me/${EVENT_CONFIG.whatsappDirect}?text=${encodeURIComponent(
        `¡Hola Richard! Acabo de registrarme en la web al Bootcamp de ClubTraders. Mi nombre es ${formData.nombre} (${formData.email}). ¿Me pasas el enlace de acceso al grupo oficial de Zoom y WhatsApp?`
      )}`;
    };

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const targetUrl = getWhatsAppTarget();
      if (targetUrl) {
        window.open(targetUrl, "_blank");
      }
    }, 600);
  };

  return (
    <section id="registro" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        <div className="max-w-2xl mx-auto bg-[#0e1628] border-2 border-[#00e5ff]/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/50">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Pase Gratuito por Zoom</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Reserva Tu Cupo al Bootcamp del Club
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Completa tus datos para recibir los enlaces de Zoom y ser redirigido directamente al{" "}
                  <strong className="text-white">Grupo Oficial de WhatsApp</strong>.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5ff] transition-colors text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5ff] transition-colors text-sm"
                  />
                </div>

                {/* WhatsApp & País */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Número de WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Ej. +593 99 999 9999"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5ff] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      País de Residencia
                    </label>
                    <select
                      value={formData.pais}
                      onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-[#00e5ff] transition-colors text-sm"
                    >
                      <option value="Ecuador">Ecuador 🇪🇨</option>
                      <option value="Perú">Perú 🇵🇪</option>
                      <option value="Colombia">Colombia 🇨🇴</option>
                      <option value="México">México 🇲🇽</option>
                      <option value="Argentina">Argentina 🇦🇷</option>
                      <option value="Chile">Chile 🇨🇱</option>
                      <option value="España">España 🇪🇸</option>
                      <option value="Estados Unidos">Estados Unidos 🇺🇸</option>
                      <option value="Otro">Otro país</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-4 rounded-xl font-black text-sm sm:text-base bg-gradient-to-r from-[#00e5ff] via-cyan-400 to-emerald-400 text-black hover:brightness-110 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Procesando registro...</span>
                  ) : (
                    <>
                      <span>ENTRAR AL GRUPO DE WHATSAPP GRATIS</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Tus datos están 100% protegidos. No hacemos spam.</span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">¡Registro Confirmado con Éxito!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                Gracias, <strong className="text-[#00e5ff]">{formData.nombre}</strong>. Para no perderte ningún enlace de Zoom ni los descargables en PDF, únete ahora mismo al grupo oficial:
              </p>

              <a
                href={
                  EVENT_CONFIG.whatsappGroupUrl && !EVENT_CONFIG.whatsappGroupUrl.includes("clubtraders-bootcamp")
                    ? EVENT_CONFIG.whatsappGroupUrl
                    : `https://wa.me/${EVENT_CONFIG.whatsappDirect}?text=${encodeURIComponent(
                        `¡Hola Richard! Acabo de registrarme en la web al Bootcamp de ClubTraders. Mi nombre es ${formData.nombre} (${formData.email}). ¿Me pasas el enlace de acceso al grupo oficial de Zoom y WhatsApp?`
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-black bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-600/30 active:scale-95 transition-all mb-4"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>ABRIR WHATSAPP AHORA</span>
              </a>

              <p className="text-xs text-slate-400">
                Si la ventana no abrió automáticamente, haz clic en el botón de arriba.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
