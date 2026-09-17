import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight, Award, Zap } from "lucide-react";

export default function RadicalTransparency() {
  return (
    <section className="py-16 md:py-24 bg-[#080c14] relative overflow-hidden border-t border-slate-800/80">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto relative z-10">
        
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0e1628] to-[#0a101d] border border-cyan-500/30 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl shadow-cyan-950/40">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Photo of Richard */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 aspect-[4/5] shadow-xl shadow-[#00e5ff]/10 group">
                <Image
                  src="/richard-profesional-beige.webp"
                  alt="Richard Veintimilla - Founder Club de Traders"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 800px, calc(100vw - 80px)"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 text-xs font-bold text-[#00e5ff]">
                    Richard Veintimilla · Founder
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Transparent Truth */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Transparencia Radical & Cero Humo</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">Qué incluye el Bootcamp gratuito</h2>
              <div className="space-y-3.5 text-slate-300 text-sm leading-relaxed">
                <p>Tres clases educativas por Zoom con Richard Veintimilla para conocer el enfoque de Club de Traders y practicar el análisis de mercados.</p>
                <p>El Bootcamp no promete ingresos, rentabilidad ni recuperación de pérdidas. Cualquier decisión de inversión requiere una evaluación independiente de sus riesgos.</p>
              </div>

              {/* The Win-Win Model */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <strong className="text-xs uppercase tracking-wider text-[#00e5ff] block">
                  Contenido y continuidad:
                </strong>

                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1. Bootcamp 100% Gratis:</strong> Tres clases en directo y materiales de apoyo en PDF.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>2. Cero Venta de Cursos:</strong> El registro en estas tres clases no solicita tarjeta ni realiza cobros.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>3. Comunidad VIP en Broker XM:</strong> En la última clase se presenta la comunidad. Solicita sus condiciones antes de decidir participar; registrarte al Bootcamp no abre una cuenta en un broker.</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="#registro"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00e5ff] hover:bg-cyan-300 text-black font-black text-sm tracking-wide shadow-lg shadow-[#00e5ff]/25 hover:scale-[1.03] active:scale-95 transition-all"
                >
                  <span>Asegurar Mi Cupo Gratis en Zoom</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="block text-[11px] text-slate-400 mt-2">
                  Consulta el uso de tus datos y las autorizaciones en el formulario de registro.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
