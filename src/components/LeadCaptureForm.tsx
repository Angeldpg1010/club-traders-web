"use client";

import { MessageSquare, ShieldCheck, ArrowRight, Zap, CheckCircle2, Lock } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function LeadCaptureForm() {
  const whatsappUrl = (EVENT_CONFIG.whatsappGroupUrl && !EVENT_CONFIG.whatsappGroupUrl.includes("clubtraders-bootcamp"))
    ? EVENT_CONFIG.whatsappGroupUrl
    : `https://wa.me/${EVENT_CONFIG.whatsappDirect}?text=${encodeURIComponent("¡Hola Richard! Quiero asegurar mi cupo gratuito al Bootcamp de 3 Días de Trading por Zoom con ClubTraders.")}`;

  return (
    <section id="registro" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#0e1628] to-[#0a101d] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/40 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ACCESO DIRECTO E INSTANTÁNEO POR WHATSAPP</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
            Asegura Tu Cupo al Bootcamp del Club
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
            Sin formularios largos ni correos. Escríbele directo a <strong className="text-white">Richard Veintimilla</strong> por WhatsApp y recibe los enlaces de Zoom y los descargables en PDF de cada jornada:
          </p>

          {/* Value highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <Zap className="w-5 h-5 text-[#00e5ff] mb-2" />
              <strong className="block text-xs font-bold text-white mb-1">Pase a Zoom</strong>
              <span className="text-[11px] text-slate-400 leading-snug block">
                Enlace directo a las 3 clases en vivo en horario nocturno (GMT-5).
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <strong className="block text-xs font-bold text-white mb-1">Checklist en PDF</strong>
              <span className="text-[11px] text-slate-400 leading-snug block">
                Plantillas de trading y mapa de liquidez compartidos en el chat.
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
              <strong className="block text-xs font-bold text-white mb-1">100% Gratuito</strong>
              <span className="text-[11px] text-slate-400 leading-snug block">
                Cero venta de cursos costosos. Solo operativa real y transparencia.
              </span>
            </div>
          </div>

          {/* Big Green Direct WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 py-4 sm:py-5 px-6 rounded-2xl text-base sm:text-lg font-black bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all mb-4 group"
          >
            <MessageSquare className="w-6 h-6 fill-current shrink-0 group-hover:rotate-12 transition-transform" />
            <span>ENTRAR AL WHATSAPP DE RICHARD AHORA</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>

          {/* Trust indicators */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Richard Veintimilla ({EVENT_CONFIG.whatsappDisplay})
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-rose-400 font-bold">
                Solo 18 cupos libres para esta edición
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conexión directa y segura con WhatsApp oficial de Club de Traders. Cero spam.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
