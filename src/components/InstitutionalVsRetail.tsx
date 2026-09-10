import { XCircle, CheckCircle2, ShieldAlert, Sparkles, Target, Flame, Lock } from "lucide-react";

export default function InstitutionalVsRetail() {
  const comparisons = [
    {
      criterio: "Análisis del Gráfico",
      retail: "Satura la pantalla con 5 o 6 indicadores rezagados (RSI, MACD, Medias) que solo le dicen lo que ya pasó.",
      club: "Gráfico limpio: lee la huella de los grandes bancos, piscinas de liquidez (Stop Hunts) y desbalances de precio (FVG).",
    },
    {
      criterio: "Gestión de Riesgo",
      retail: "Arriesga el 10% o 20% de su cuenta por trade intentando hacerse millonario en una semana. Quema la cuenta en 3 rachas malas.",
      club: "Preservación institucional innegociable: arriesga estrictamente el 1% por operación. Cero posibilidad de quebrar.",
    },
    {
      criterio: "Ratio Riesgo / Beneficio",
      retail: "Cierra en pánico ganando $15, pero cuando va perdiendo $80 no corta esperando un milagro (Asimetría negativa).",
      club: "Asimetría 1:3: corta pérdidas en segundos si el escenario invalida, y deja correr los beneficios hacia zonas de liquidez.",
    },
    {
      criterio: "Horarios & Sesiones",
      retail: "Pasa 8 horas pegado a la pantalla operando en momentos de ruido y baja volatilidad por pura ansiedad.",
      club: "Opera como un francotirador solo en las Killzones de Londres y New York, donde las instituciones inyectan volumen real.",
    },
    {
      criterio: "Modelo de Aprendizaje",
      retail: "Paga $1,000 por cursos grabados llenos de teoría genérica de YouTube vendidos por personajes sin cuentas auditadas.",
      club: "Bootcamp 100% gratuito en vivo por Zoom con Richard Veintimilla. Análisis en tiempo real y comunidad activa.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#080c14] relative overflow-hidden">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>El Choque de Realidad Financiera</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            ¿Por qué el 95% de los Novatos pierde dinero en Trading y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-emerald-400">
              cómo se posiciona el 5% de Élite?
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            El mercado no es una casa de apuestas ni un casino de criptos. Es una subasta interbancaria implacable. Compara los dos caminos:
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
                  <h3 className="text-lg font-black text-white">El Trader Retail Promedio</h3>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    El 95% que pierde capital
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
                ⚠️ Resultado: Frustración, cuentas quemadas y meses perdidos.
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
                    <h3 className="text-lg font-black text-white">El Trader ClubTraders</h3>
                    <span className="text-xs font-bold text-[#00e5ff] uppercase tracking-wider">
                      El 5% con Método y Disciplina
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                  Rentabilidad Asimétrica
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
                🚀 Resultado: Consistencia matemática, paz mental y retiros sostenibles.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
