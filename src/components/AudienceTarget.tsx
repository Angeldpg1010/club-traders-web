import { UserCheck, ShieldAlert, Sparkles } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function AudienceTarget() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#00e5ff] mb-2 inline-block">
            ¿Es Este Evento Para Ti?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Diseñado para Quienes Buscan Aprendizaje Real
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            No importa tu nivel previo: abordamos el mercado con seriedad, lógica y acompañamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {EVENT_CONFIG.audiencia.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-[#00e5ff] flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.tipo}</h3>
                <span className="text-xs font-semibold text-emerald-400 italic block mb-3">
                  {item.frase}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Para quién NO es */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              Para quién NO es este Bootcamp
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No es para personas que buscan hacerse ricas de la noche a la mañana, ni para quienes buscan "señales milagrosas" o fórmulas mágicas sin asumir la responsabilidad y disciplina que exige el trading profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
