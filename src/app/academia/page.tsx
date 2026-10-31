import type { Metadata } from "next";
import AcademiaExperience from "@/components/academia/AcademiaExperience";
import "./academia.css";

export const metadata: Metadata = {
  title: "Academia por suscripción (demo) | Club de Traders",
  description:
    "Prototipo interactivo de la academia de Club de Traders: formación, membresías mensuales, simulación de pago online y área privada del alumno.",
  robots: { index: false, follow: false },
};

export default function AcademiaPage() {
  return <AcademiaExperience />;
}
