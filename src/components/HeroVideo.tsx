"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, CheckCircle2, Users, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="inicio" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00e5ff]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            <span>Lanzamiento Oficial · 3 Días por Zoom</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cero Venta de Cursos</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.12] text-white mb-5">
            Aprende a analizar el mercado en vivo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-cyan-300 to-emerald-400">
              sin que te vendan un curso de $1,000
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            El <strong className="text-white">Bootcamp del Club</strong> es una experiencia 100% gratuita de 3 días en directo con{" "}
            <span className="text-[#00e5ff] font-bold">Richard Veintimilla</span>. Lógica de mercado real, estructura en Oro y Forex, y disciplina operativa.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00e5ff]" />
              <span>En las noches (Hora Ecuador)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>+500 Alumnos Formados</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
              <span>Acceso Gratis vía Zoom</span>
            </div>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-[#0e1424] shadow-2xl shadow-cyan-950/40 aspect-video group">
            {!isPlaying ? (
              <div className="relative w-full h-full">
                {/* Thumbnail Poster */}
                <Image
                  src="/richard-veintimilla-live.png"
                  alt="Richard Veintimilla Sesión en Vivo Club de Traders"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label="Reproducir vídeo de presentación de Richard Veintimilla"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00e5ff] hover:bg-cyan-300 text-black flex items-center justify-center shadow-xl shadow-[#00e5ff]/30 hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </button>

                  <div className="mt-4 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-xs sm:text-sm font-semibold text-white">
                      ▶ Mira el mensaje de Richard Veintimilla (1 min)
                    </span>
                  </div>
                </div>

                {/* Bottom Bar Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                  <div>
                    <strong className="block text-white text-sm sm:text-base font-bold">
                      Richard Veintimilla · Founder Club de Traders
                    </strong>
                    <span className="text-xs text-[#00e5ff]">
                      Metodología: Entiende → Analiza → Construye → Opera
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md">
                  <span className="text-4xl mb-3 block">🎥</span>
                  <h3 className="text-xl font-bold text-white mb-2">Vídeo de Bienvenida de Richard</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    En este espacio se reproducirá el vídeo directo de Richard explicando el Bootcamp y la invitación al grupo de WhatsApp.
                  </p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Volver a la portada
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Primary Hero CTA */}
        <div className="text-center">
          <Link
            href="#registro"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-black bg-gradient-to-r from-[#00e5ff] via-cyan-400 to-emerald-400 text-black hover:brightness-110 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <span>RESERVAR MI CUPO GRATIS EN WHATSAPP</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-slate-400 mt-3">
            Acceso libre · 100% Gratuito · Enlace de Zoom directo en el grupo
          </p>
        </div>
      </div>
    </section>
  );
}
