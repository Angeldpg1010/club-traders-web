import { ShieldAlert } from "lucide-react";
import { EVENT_CONFIG } from "@/data/config";

export default function RiskDisclaimer() {
  return (
    <section className="py-10 bg-black/80 border-t border-slate-800/80 text-slate-400 text-xs leading-relaxed">
      <div className="w-[min(1000px,calc(100%-32px))] mx-auto">
        <div className="flex items-start gap-3.5 mb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Aviso de Riesgo Legal & Descargo de Responsabilidad Financiera
          </h4>
        </div>

        <p className="mb-2.5">
          El trading en mercados financieros, incluyendo el mercado de divisas (Forex), materias primas (Oro) y derivados financieros con apalancamiento, conlleva un alto nivel de riesgo de pérdida de capital y puede no ser adecuado para todos los perfiles de inversor. Antes de decidir operar en los mercados financieros, debe considerar cuidadosamente sus objetivos de inversión, su nivel de experiencia y su tolerancia al riesgo. Existe la posibilidad de que sufra la pérdida de parte o la totalidad de su capital invertido.
        </p>

        <p className="mb-2.5">
          Todo el contenido, sesiones en vivo y material proporcionado en <strong>{EVENT_CONFIG.nombreEvento}</strong> por <strong>{EVENT_CONFIG.mentor.nombre}</strong> y <strong>{EVENT_CONFIG.academia.nombre}</strong> tiene fines estrictamente educativos e informativos. En ningún caso constituye asesoramiento financiero, recomendación de inversión, gestión de cuentas de terceros ni solicitud para comprar o vender activo alguno. <strong>{EVENT_CONFIG.academia.nombre}</strong> no capta dinero de alumnos ni gestiona fondos ajenos.
        </p>

        <p>
          Responsable del evento y formación: <strong>{EVENT_CONFIG.mentor.nombre}</strong> · Contacto oficial: <a href={`mailto:${EVENT_CONFIG.academia.email}`} className="text-[#00e5ff] hover:underline">{EVENT_CONFIG.academia.email}</a>.
        </p>
      </div>
    </section>
  );
}
