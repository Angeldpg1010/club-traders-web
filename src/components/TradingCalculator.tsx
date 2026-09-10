"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, CheckCircle, XCircle, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";

export default function TradingCalculator() {
  const [accountSize, setAccountSize] = useState<number>(5000);
  const riskPercent = 1; // 1% Fixed Institutional Rule
  const [rrRatio, setRrRatio] = useState<number>(3); // 1:3 Richard Standard
  const [winRate, setWinRate] = useState<number>(40); // 40% Win Rate default

  const totalTrades = 10;
  const wins = Math.round((winRate / 100) * totalTrades);
  const losses = totalTrades - wins;

  const riskPerTradeUSD = (accountSize * riskPercent) / 100;
  const rewardPerTradeUSD = riskPerTradeUSD * rrRatio;

  const totalLossUSD = losses * riskPerTradeUSD;
  const totalWinUSD = wins * rewardPerTradeUSD;
  const netProfitUSD = totalWinUSD - totalLossUSD;
  const netRoiPercent = (netProfitUSD / accountSize) * 100;

  return (
    <section id="calculadora" className="py-16 md:py-24 bg-[#0a0f1d] relative overflow-hidden border-t border-slate-800/80">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4" />
            <span>Simulador Matemático Institucional</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            La Verdad que los Vendehumos te Ocultan:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-emerald-400">
              Cómo ser rentable fallando el 60% de tus operaciones
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            El 95% de los novatos quema sus cuentas buscando un 90% de acierto milagroso. Los traders de élite gestionan <strong className="text-white">Asimetría Matemática</strong> (Riesgo 1 : Beneficio 3). Pon a prueba los números tú mismo:
          </p>
        </div>

        {/* Interactive Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0e1526] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-cyan-950/30">
          
          {/* Controls (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div>
              {/* Account size selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-200">
                    Capital de tu Cuenta de Trading:
                  </label>
                  <span className="text-base sm:text-lg font-mono font-black text-[#00e5ff]">
                    ${accountSize.toLocaleString("en-US")} USD
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[1000, 3000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAccountSize(amount)}
                      className={`py-1.5 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        accountSize === amount
                          ? "bg-[#00e5ff] text-black border-[#00e5ff] shadow-md shadow-[#00e5ff]/20"
                          : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      ${amount >= 1000 ? `${amount / 1000}k` : amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk per trade rule */}
              <div className="mb-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-white">Riesgo Institucional por Operación</span>
                    <span className="text-[11px] text-slate-400">Innegociable para no quemar cuentas jamás</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  1.0% (${riskPerTradeUSD.toFixed(0)} USD)
                </span>
              </div>

              {/* Risk:Reward Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-200">
                    Ratio Riesgo / Beneficio (R:R):
                  </label>
                  <span className="text-sm font-mono font-black text-[#00e5ff]">
                    1 : {rrRatio} ({rrRatio === 3 ? "Estándar ClubTraders" : `Buscando x${rrRatio}`})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setRrRatio(ratio)}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                        rrRatio === ratio
                          ? "bg-[#00e5ff] text-black border-[#00e5ff] shadow-md shadow-[#00e5ff]/20"
                          : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      1 : {ratio} {ratio === 3 ? "⭐ Estándar" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Win Rate Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-200">
                    Tasa de Acierto (Win Rate):
                  </label>
                  <span className={`text-sm font-mono font-black ${winRate <= 40 ? "text-amber-400" : "text-emerald-400"}`}>
                    {winRate}% ({wins} aciertos de 10 operaciones)
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="60"
                  step="10"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full accent-[#00e5ff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>30% (Pierdes 7 de 10)</span>
                  <span className="text-amber-300 font-bold">40% (Pierdes 6 de 10)</span>
                  <span>50%</span>
                  <span>60%</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-[#00e5ff] block mb-0.5">💡 Principio del Trader Veterano:</strong>
              No necesitas predecir el futuro ni tener la razón todo el tiempo. Con el ratio 1:3 de Richard, puedes equivocarte 6 de cada 10 veces y aun así terminar en ganancia neta y retirar beneficios.
            </div>
          </div>

          {/* Results (Right 6 cols) */}
          <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00e5ff]" />
                  Simulación en 10 Operaciones
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Serie Estadística</span>
              </div>

              {/* Trade icons simulation */}
              <div className="mb-5">
                <span className="block text-xs text-slate-400 mb-2">Secuencia de resultados de la serie:</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isWin = i < wins;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                          isWin
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {isWin ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>Trade #{i + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Breakdown numbers */}
              <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-rose-500/20">
                  <span className="text-slate-400 block text-[11px]">Pérdidas ({losses} trades):</span>
                  <span className="text-rose-400 text-sm sm:text-base font-black">
                    -${totalLossUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD
                  </span>
                  <span className="text-[10px] text-slate-500 block">(-{losses * riskPercent}%)</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/20">
                  <span className="text-slate-400 block text-[11px]">Ganancias ({wins} trades):</span>
                  <span className="text-emerald-400 text-sm sm:text-base font-black">
                    +${totalWinUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD
                  </span>
                  <span className="text-[10px] text-slate-500 block">(+{wins * riskPercent * rrRatio}%)</span>
                </div>
              </div>

              {/* Net Result Highlight */}
              <div className={`p-4 rounded-2xl border text-center ${
                netProfitUSD > 0
                  ? "bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/50"
                  : "bg-slate-900 border-slate-700"
              }`}>
                <span className="text-xs uppercase tracking-widest text-slate-300 font-bold block mb-1">
                  Resultado Neto en 10 Operaciones
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400 mb-1">
                  {netProfitUSD >= 0 ? `+$${netProfitUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD` : `-$${Math.abs(netProfitUSD).toLocaleString("en-US")} USD`}
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-black/40 px-3 py-1 rounded-full">
                  <span>Crecimiento de Cuenta:</span>
                  <span className="text-[#00e5ff] font-black">
                    {netRoiPercent >= 0 ? `+${netRoiPercent.toFixed(1)}%` : `${netRoiPercent.toFixed(1)}%`}
                  </span>
                  {netProfitUSD > 0 && <span>🚀 Rentabilidad Positiva</span>}
                </div>
              </div>
            </div>

            {/* CTA inside calculator */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <Link
                href="#registro"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-cyan-300 hover:to-emerald-400 text-black font-black text-sm tracking-wide shadow-lg shadow-[#00e5ff]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Aprender a Ejecutar este Ratio en Vivo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="block text-[11px] text-slate-400 mt-2">
                Bootcamp Gratuito de 3 Días con Richard Veintimilla · Cupos Limitados
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
