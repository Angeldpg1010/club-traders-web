import Image from "next/image";
import Link from "next/link";
import { EVENT_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-slate-900 text-slate-500 text-xs">
      <div className="w-[min(1200px,calc(100%-32px))] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 rounded-md overflow-hidden bg-black border border-slate-800">
            <Image
              src="/clubtraders-logo.png"
              alt="Logo Club de Traders"
              fill
              className="object-contain"
            />
          </div>
          <span>
            © {new Date().getFullYear()} {EVENT_CONFIG.academia.nombre} · {EVENT_CONFIG.academia.lema}. Todos los derechos reservados.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={EVENT_CONFIG.academia.webOficial}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00e5ff] transition-colors"
          >
            Web Oficial
          </a>
          <a
            href={`https://wa.me/${EVENT_CONFIG.whatsappDirect}?text=${encodeURIComponent("¡Hola Richard! Me gustaría información sobre el Bootcamp de ClubTraders.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00e5ff] transition-colors"
          >
            WhatsApp ({EVENT_CONFIG.whatsappDisplay})
          </a>
          <a
            href={`mailto:${EVENT_CONFIG.academia.email}`}
            className="hover:text-[#00e5ff] transition-colors"
          >
            Contacto
          </a>
          <Link href="#registro" className="text-[#00e5ff] font-bold hover:underline">
            Unirme al Bootcamp
          </Link>
        </div>
      </div>
    </footer>
  );
}
