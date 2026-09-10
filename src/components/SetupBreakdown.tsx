"use client";

import { useState } from "react";
import { Crosshair, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";

export default function SetupBreakdown() {
  const [activeTab, setActiveTab] = useState<"gold" | "forex">("gold");

  return (
    <section className="py-16 md:py-24 bg-[#0a0f1d] border-t border-slate-800/80 relative overflow-hidden">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-bold uppercase tracking-wider mb-4">
            <Crosshair className="w-4 h-4" />
            <span>Anatomía de una Operación Institucional</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Cómo se Ve una Entrada con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-emerald-400">
              Ratio 1:3 en el Mercado Real
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Sin adivinar velas ni seguir señales a ciegas. Richard te enseñará en vivo el paso a paso para operar con la precisión de los fondos de inversión:
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab("gold")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "gold"
                  ? "bg-[#00e5ff] text-black shadow-lg shadow-[#00e5ff]/20"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              👑 Setup en Oro (XAU/USD)
            </button>
            <button
              onClick={() => setActiveTab("forex")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "forex"
                  ? "bg-[#00e5ff] text-black shadow-lg shadow-[#00e5ff]/20"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              💶 Setup en Forex (EUR/USD)
            </button>
          </div>
        </div>

        {/* Setup Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0e1628] border border-cyan-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-cyan-950/40">
          {activeTab === "gold" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Graphic Simulation Card */}
              <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 sm:p-6 font-mono text-xs relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-bold text-white text-sm">XAU/USD · Gráfico 15M / 5M</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    RATIO 1:3.4 ALCANZADO
                  </span>
                </div>

                {/* Tactical visual schema */}
                <div className="space-y-3 py-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-amber-400">
                    <span className="text-amber-400 font-bold block text-[11px]">1. Rango de Asia & Piscinas de Liquidez</span>
                    <span className="text-slate-300">Máximos y mínimos clave identificados antes de la sesión europea.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-rose-400">
                    <span className="text-rose-400 font-bold block text-[11px]">2. Barrido Institucional (London Killzone)</span>
                    <span className="text-slate-300">Vela expansiva que activa los Stop Losses del retail y captura liquidez.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-cyan-400">
                    <span className="text-[#00e5ff] font-bold block text-[11px]">3. Quiebre de Estructura (CHoCH) + FVG</span>
                    <span className="text-slate-300">Entrada precisa al retest del bloque institucional. Cero persecución del precio.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border-l-4 border-emerald-400">
                    <span className="text-emerald-400 font-bold block text-[11px]">4. Take Profit en Piscina de Liquidez Opuesta</span>
                    <span className="text-emerald-200">Stop Loss: 18 pips · Take Profit: 62 pips (+3.4R de beneficio).</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                  <span>Riesgo asumido: $100 USD (1%)</span>
                  <span className="text-emerald-400 font-bold">Beneficio cerrado: +$344 USD</span>
                </div>
              </div>

              {/* Explanatory Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  Especialidad de Richard Veintimilla
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  El Oro no se opera con indicadores: se opera con horario y liquidez
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  El Oro (XAU/USD) es el activo con mayor volatilidad del mercado minorista. Si intentas operarlo con cruces de medias o RSI, te sacará por volatilidad el 80% de las veces.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En el <strong className="text-[#00e5ff]">Día 2 del Bootcamp</strong>, Richard abrirá su gráfico en directo y te mostrará exactamente cómo identificar el barrido de Londres y colocar órdenes con Stop Loss milimétrico.
                </p>

                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="block text-xs text-slate-400">Horario Clave:</span>
                      <strong className="text-white text-sm">08:00 - 11:30 AM (GMT-5)</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="block text-xs text-slate-400">Ratio Promedio:</span>
                      <strong className="text-[#00e5ff] text-sm">1:3 a 1:4</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Graphic Simulation Card */}
              <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 sm:p-6 font-mono text-xs relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="font-bold text-white text-sm">EUR/USD · Sesión New York (Apertura)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    RATIO 1:3.0 EJECUTADO
                  </span>
                </div>

                <div className="space-y-3 py-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-cyan-400">
                    <span className="text-[#00e5ff] font-bold block text-[11px]">1. Identificación de la Tendencia Macro Diaria</span>
                    <span className="text-slate-300">Alineación institucional con las órdenes del Banco Central Europeo.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-amber-400">
                    <span className="text-amber-400 font-bold block text-[11px]">2. Toma de Liquidez de Londres</span>
                    <span className="text-slate-300">Mitigación del desbalance en 1.0820 antes del reporte económico.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border-l-4 border-emerald-400">
                    <span className="text-emerald-400 font-bold block text-[11px]">3. Entrada en Descuento (OTE)</span>
                    <span className="text-slate-300">Stop Loss estricto de 12 pips colocado por encima del máximo protegido.</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border-l-4 border-emerald-400">
                    <span className="text-emerald-400 font-bold block text-[11px]">4. Salida en Objetivo Previo</span>
                    <span className="text-emerald-200">Take profit de 36 pips asegurado sin sobreoperar.</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                  <span>Riesgo: 1% de la cuenta</span>
                  <span className="text-emerald-400 font-bold">Retorno: +3% de rentabilidad neta</span>
                </div>
              </div>

              {/* Explanatory Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00e5ff] text-xs font-bold">
                  Disciplina en Divisas Principales
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Forex con Lógica Interbancaria: Menor estrés, alta precisión
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Para los traders que buscan una operativa más metódica y menos acelerada que los índices, los pares mayores como el EUR/USD y GBP/USD ofrecen estructuras limpias y repetitivas.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Aprenderás a descartar el 90% del ruido diario y entrar únicamente cuando el algoritmo institucional ofrece una asimetría mínima de 1 a 3.
                </p>

                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="block text-xs text-slate-400">Spread Promedio:</span>
                      <strong className="text-white text-sm">Ultra Bajo con Broker XM</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="block text-xs text-slate-400">Duración Promedio:</span>
                      <strong className="text-[#00e5ff] text-sm">Intradía (1 a 4 horas)</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
