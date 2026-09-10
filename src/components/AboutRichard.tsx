import Image from "next/image";
import { Check, Award, Users, TrendingUp } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function AboutRichard() {
  return (
    <section id="mentor" className="py-16 md:py-24 bg-[#0a0f1d] border-t border-slate-800/80">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Visual Poster */}
        <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
          <div className="relative rounded-3xl overflow-hidden border border-[#00e5ff]/30 shadow-2xl bg-black aspect-[4/5]">
            <Image
              src="/richard-gotrader-schedule.png"
              alt="Profesor Richard Veintimilla"
              fill
              className="object-cover object-center"
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
            Con más de <strong className="text-white">7 años de experiencia operando en los mercados financieros</strong> y más de 500 alumnos capacitados, Richard se enfoca en enseñar la realidad cruda y técnica del trading: cómo reacciona el precio en mercado real, cómo gestionar el riesgo y cómo eliminar el ruido de indicadores obsoletos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 text-center">
              <strong className="block text-2xl font-black text-[#00e5ff]">+7 Años</strong>
              <span className="text-[11px] text-slate-400">Operando en Real</span>
            </div>
            <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 text-center">
              <strong className="block text-2xl font-black text-emerald-400">+500</strong>
              <span className="text-[11px] text-slate-400">Alumnos Formados</span>
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
