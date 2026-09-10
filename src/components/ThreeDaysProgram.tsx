import { Calendar, FileText, ArrowRight, Check } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function ThreeDaysProgram() {
  return (
    <section id="programa" className="py-16 md:py-24 bg-[#0a0f1d] border-y border-slate-800/80 relative">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#00e5ff] mb-2 inline-block">
            Cronograma Oficial del Evento
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            3 Días de Formación Práctica en Vivo
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Una experiencia estructurada bajo la metodología oficial de Club de Traders:{" "}
            <span className="text-white font-semibold">Entiende → Analiza → Construye → Opera</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVENT_CONFIG.cronograma.map((item, index) => (
            <div
              key={index}
              className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative hover:border-[#00e5ff]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                    {item.dia}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {item.fase}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#00e5ff] transition-colors leading-snug">
                  {item.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Entregable al finalizar:</strong>
                  {item.entregable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Retención & Checklist Info */}
        <div className="mt-12 bg-gradient-to-r from-[#00e5ff]/10 via-[#0e1628] to-emerald-500/10 border border-[#00e5ff]/30 rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto">
          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
            📥 Material de Trabajo Tangible: "Checklist del Trader"
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Al finalizar cada jornada en vivo por Zoom, Richard compartirá en el grupo de WhatsApp un documento PDF exclusivo con resúmenes, mapas y plantillas de trabajo para aplicar de inmediato en tus gráficos.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
            <Check className="w-4 h-4" />
            <span>Exclusivo para miembros registrados en el grupo de WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
