"use client";

import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const TICKER_ITEMS = [
  { pair: "XAU/USD (ORO)", price: "$2,514.80", change: "+1.64%", isUp: true, tag: "Zona de Liquidez Máxima" },
  { pair: "EUR/USD", price: "1.0842", change: "-0.18%", isUp: false, tag: "London Killzone" },
  { pair: "US30 (DOW)", price: "40,210.00", change: "+0.45%", isUp: true, tag: "Apertura NY" },
  { pair: "NAS100", price: "19,840.50", change: "+0.92%", isUp: true, tag: "Volumen Institucional" },
  { pair: "GBP/JPY", price: "191.35", change: "+0.78%", isUp: true, tag: "Tendencia Expansiva" },
  { pair: "BTC/USD", price: "$64,820.00", change: "+2.30%", isUp: true, tag: "Volatilidad Macro" },
  { pair: "XAG/USD (PLATA)", price: "$28.92", change: "+1.12%", isUp: true, tag: "Correlación Oro" },
  { pair: "VIX (VOLATILIDAD)", price: "14.85", change: "-3.20%", isUp: false, tag: "Entorno Óptimo 1:3" },
];

export default function MarketTicker() {
  return (
    <aside aria-label="Cotizaciones en vivo" className="w-full bg-[#05080f] border-b border-slate-800/80 overflow-hidden py-2 text-xs font-mono select-none">
      <div className="flex items-center">
        {/* Live status badge on the left */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 py-0.5 bg-slate-900/90 border-r border-slate-800 text-slate-300 shrink-0 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider text-[11px] text-emerald-400 uppercase flex items-center gap-1">
            <Activity className="w-3 h-3" />
            MERCADO EN VIVO
          </span>
        </div>

        {/* Continuous ticker track */}
        <div className="flex whitespace-nowrap overflow-hidden w-full">
          <div className="flex items-center gap-8 animate-ticker hover:[animation-play-state:paused]">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2.5 text-slate-300">
                <span className="font-bold text-white">{item.pair}</span>
                <span className="text-slate-200">{item.price}</span>
                <span
                  className={`inline-flex items-center gap-0.5 font-bold ${
                    item.isUp ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.change}
                </span>
                <span className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                  {item.tag}
                </span>
                <span className="text-slate-700">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
