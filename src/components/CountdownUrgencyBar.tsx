"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Zap } from "lucide-react";

export default function CountdownUrgencyBar() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 2,
    horas: 14,
    minutos: 38,
    segundos: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.segundos > 0) {
          return { ...prev, segundos: prev.segundos - 1 };
        } else if (prev.minutos > 0) {
          return { ...prev, minutos: prev.minutos - 1, segundos: 59 };
        } else if (prev.horas > 0) {
          return { ...prev, horas: prev.horas - 1, minutos: 59, segundos: 59 };
        } else if (prev.dias > 0) {
          return { ...prev, dias: prev.dias - 1, horas: 23, minutos: 59, segundos: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-label="Disponibilidad y cuenta regresiva" className="w-full bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border-y border-cyan-500/20 py-3.5 px-4">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left: Scarcity & Server Cap */}
        <div className="flex items-center gap-3 text-center lg:text-left">
          <div className="w-9 h-9 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shrink-0 text-[#00e5ff]">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                SALA ZOOM: 250 CUPOS MÁXIMOS
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                (Por capacidad de la sala en vivo)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Quedan <strong className="text-[#00e5ff] font-extrabold">18 cupos libres</strong> para el acceso al grupo exclusivo de WhatsApp
            </p>
          </div>
        </div>

        {/* Center: Live Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-center font-mono">
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 min-w-[50px]">
              <span className="text-base sm:text-lg font-black text-white">
                {String(timeLeft.dias).padStart(2, "0")}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400">Días</span>
            </div>
            <span className="text-cyan-400 font-bold text-lg">:</span>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 min-w-[50px]">
              <span className="text-base sm:text-lg font-black text-white">
                {String(timeLeft.horas).padStart(2, "0")}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400">Horas</span>
            </div>
            <span className="text-cyan-400 font-bold text-lg">:</span>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 min-w-[50px]">
              <span className="text-base sm:text-lg font-black text-white">
                {String(timeLeft.minutos).padStart(2, "0")}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400">Min</span>
            </div>
            <span className="text-cyan-400 font-bold text-lg">:</span>
            <div className="bg-slate-950/80 border border-cyan-500/40 rounded-lg px-2.5 py-1 min-w-[50px] shadow-[0_0_10px_rgba(0,229,255,0.2)]">
              <span className="text-base sm:text-lg font-black text-[#00e5ff]">
                {String(timeLeft.segundos).padStart(2, "0")}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-cyan-300">Seg</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action */}
        <Link
          href="#registro"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5ff] hover:bg-cyan-300 text-black text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-[#00e5ff]/20 hover:scale-[1.03] active:scale-95 transition-all shrink-0"
        >
          <span>Reservar Mi Cupo Gratis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}
