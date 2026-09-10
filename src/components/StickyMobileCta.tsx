"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Zap, X, ChevronRight } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <aside aria-label="Acceso rápido WhatsApp" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[360px] w-[calc(100%-32px)]">
      <div className="relative rounded-2xl bg-slate-950/95 border-2 border-cyan-400/60 p-3.5 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
        
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700 shadow text-xs transition-colors"
          aria-label="Cerrar aviso flotante"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          {/* Avatar with live pulse */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#00e5ff] relative">
              <Image
                src="/richard-veintimilla-live.png"
                alt="Richard Veintimilla"
                fill
                className="object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>

          {/* Texts & Button */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                Solo 18 cupos libres
              </span>
            </div>
            <strong className="block text-xs font-bold text-white truncate">
              {EVENT_CONFIG.nombreEvento} · Zoom
            </strong>
            <span className="text-[11px] text-slate-300 block truncate">
              3 Días Gratis con Richard Veintimilla
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
          <Link
            href="#registro"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00e5ff] hover:bg-cyan-300 text-black text-xs font-black tracking-wide shadow-md shadow-[#00e5ff]/20 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Unirme al Grupo VIP de WhatsApp</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </aside>
  );
}
