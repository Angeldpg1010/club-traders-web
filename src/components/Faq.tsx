import { HelpCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function Faq() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0f1d] border-t border-slate-800/80">
      <div className="w-[min(900px,calc(100%-32px))] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#00e5ff] mb-2 inline-block">
            Resolvemos Tus Dudas
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Transparencia total sobre el Bootcamp del Club y las sesiones en vivo.
          </p>
        </div>

        <div className="space-y-4">
          {EVENT_CONFIG.faq.map((item, idx) => (
            <details
              key={idx}
              className="group bg-[#0e1628] border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-white hover:text-[#00e5ff] transition-colors">
                <span>{item.q}</span>
                <span className="text-[#00e5ff] text-xl font-black group-open:rotate-45 transition-transform shrink-0 ml-4">
                  +
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 pt-4 border-t border-slate-800/80">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
