import { XCircle, CheckCircle2, ShieldAlert, Sparkles, Target, Flame, Lock } from "lucide-react";

export default function InstitutionalVsRetail() {
  const comparisons = [
    { criterio: "Análisis del gráfico", retail: "Entrar sin una hipótesis definida ni criterios para revisarla.", club: "Estudiar la estructura del precio y contrastar escenarios. Ningún patrón asegura el movimiento siguiente." },
    { criterio: "Gestión de riesgo", retail: "Aumentar la exposición para intentar recuperar pérdidas.", club: "Definir límites de exposición y estudiar las pérdidas posibles. Los límites y los stops no eliminan el riesgo de perder capital." },
    { criterio: "Riesgo y beneficio", retail: "Ignorar los costes, el deslizamiento y las operaciones perdedoras.", club: "Comparar el riesgo y el beneficio potencial de cada escenario. Un ratio teórico no garantiza rentabilidad." },
    { criterio: "Planificación", retail: "Operar por impulso, sin reglas para entrar, salir o dejar de operar.", club: "Preparar un plan y revisar las decisiones con una bitácora, empezando por ejercicios de práctica." },
    { criterio: "Aprendizaje", retail: "Buscar señales infalibles o beneficios rápidos.", club: "Clases educativas en directo con Richard Veintimilla. La formación no garantiza resultados ni sustituye asesoramiento individual." },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#080c14] relative overflow-hidden">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>Método y riesgo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Aprender a analizar el mercado y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-emerald-400">
              comprender sus riesgos
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Comparamos hábitos de trabajo, no resultados prometidos. Puedes perder parte o la totalidad del capital, incluso siguiendo un método.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Column 1: Retail Trader */}
          <div className="rounded-3xl bg-slate-950/60 border border-rose-500/30 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-rose-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[60px] pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Operar sin un plan</h3>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Hábitos que dificultan el aprendizaje
                  </span>
                </div>
              </div>

              <ul className="space-y-5">
                {comparisons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-200 font-semibold mb-0.5">{c.criterio}:</strong>
                      <span className="text-slate-400 leading-relaxed">{c.retail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-500/20 text-center">
              <span className="text-xs font-mono font-bold text-rose-300">
                Identificar estos hábitos ayuda a revisar tus decisiones.
              </span>
            </div>
          </div>

          {/* Column 2: ClubTraders Institutional */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0e172a] to-[#0a101d] border-2 border-cyan-500/40 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-cyan-950/40">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00e5ff]/15 blur-[70px] pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/20 border border-[#00e5ff]/50 flex items-center justify-center text-[#00e5ff] shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Practicar con un método</h3>
                    <span className="text-xs font-bold text-[#00e5ff] uppercase tracking-wider">
                      El enfoque del Bootcamp
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                  Formación educativa
                </span>
              </div>

              <ul className="space-y-5">
                {comparisons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-semibold mb-0.5">{c.criterio}:</strong>
                      <span className="text-slate-300 leading-relaxed">{c.club}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/20 text-center">
              <span className="text-xs font-mono font-bold text-[#00e5ff]">
                Disciplina y formación no garantizan beneficios.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
