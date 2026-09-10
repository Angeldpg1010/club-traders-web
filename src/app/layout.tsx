import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EVENT_CONFIG } from "@/data/config";

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://clubtraders.vercel.app"),
  title: `${EVENT_CONFIG.nombreEvento} · ${EVENT_CONFIG.academia.nombre}`,
  description: `Masterclass Gratuita de 3 Días de Trading en Vivo con ${EVENT_CONFIG.mentor.nombre}. Aprende a operar Oro y Forex sin cursos costosos. Regístrate gratis.`,
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://clubtraders.vercel.app/",
    siteName: EVENT_CONFIG.academia.nombre,
    title: `${EVENT_CONFIG.nombreEvento} · Clases de Trading en Vivo Gratis`,
    description: "3 Días en Vivo por Zoom con Richard Veintimilla. Cero venta de cursos. Acceso exclusivo por WhatsApp.",
    images: [
      {
        url: "/richard-veintimilla-live.png",
        width: 1200,
        height: 675,
        alt: `${EVENT_CONFIG.nombreEvento} - ${EVENT_CONFIG.mentor.nombre}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT_CONFIG.nombreEvento} · ${EVENT_CONFIG.mentor.nombre}`,
    description: "3 Días de Trading en Vivo por Zoom con Richard Veintimilla. 100% Gratis.",
    images: ["/richard-veintimilla-live.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#080c14] text-slate-100 min-h-screen selection:bg-[#00e5ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
