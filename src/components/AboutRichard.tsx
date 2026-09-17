import Image from "next/image";
import { Check, Award, Users, TrendingUp } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function AboutRichard() {
  return (
    <section id="mentor" className="py-16 md:py-24 bg-[#0a0f1d] border-t border-slate-800/80">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Foto del mentor */}
        <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
          <div className="relative rounded-3xl overflow-hidden border border-[#00e5ff]/30 shadow-2xl bg-black aspect-[4/5]">
            <Image
              src="/richard-profesional.webp"
              alt="Profesor Richard Veintimilla"
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 480px) 448px, calc(100vw - 32px)"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Bio info */}
        <div className="lg:col-span-7">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#00e5ff] mb-2 inline-block">
            Tu Instructor & Mentor
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Richard Veintimilla
          </h2>
          <p className="text-sm font-semibold text-emerald-400 mb-6">
            Founder & Instructor Principal en Club de Traders
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            Richard imparte las sesiones del Bootcamp sobre estructura del precio, planificación y gestión del riesgo. Los ejemplos se utilizan con fines educativos y no acreditan resultados futuros.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 text-center">
              <strong className="block text-2xl font-black text-[#00e5ff]">En vivo</strong>
              <span className="text-[11px] text-slate-400">Clases por Zoom</span>
            </div>
            <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 text-center">
              <strong className="block text-2xl font-black text-emerald-400">Práctica</strong>
              <span className="text-[11px] text-slate-400">Análisis y bitácora</span>
            </div>
            <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 text-center">
              <strong className="block text-2xl font-black text-white">Gold & FX</strong>
              <span className="text-[11px] text-slate-400">Especialidad</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>Sesiones nocturnas en vivo (Hora Ecuador) en directo por Zoom.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>Acompañamiento cercano en el grupo oficial de WhatsApp.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>Posibilidad de continuar en el Grupo VIP del Club tras el evento.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
