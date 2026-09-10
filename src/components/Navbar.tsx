import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#080c14]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#inicio" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00e5ff]/30 p-1 bg-black flex items-center justify-center group-hover:border-[#00e5ff] transition-all">
            <Image
              src="/clubtraders-logo.png"
              alt="Club de Traders Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="block font-black tracking-widest text-white text-base sm:text-lg leading-tight group-hover:text-[#00e5ff] transition-colors">
              CLUB<span className="text-[#00e5ff]">TRADERS</span>
            </span>
            <span className="block text-[10px] tracking-wider text-slate-400 uppercase font-medium">
              Traders en Evolución
            </span>
          </div>
        </Link>

        {/* Live Pill & CTA */}
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Masterclass 3 Días · 100% Gratis</span>
          </div>

          <Link
            href="#registro"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#00e5ff] to-cyan-500 text-black hover:brightness-110 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Asegurar Mi Cupo</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
