import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import ThreeDaysProgram from "@/components/ThreeDaysProgram";
import AudienceTarget from "@/components/AudienceTarget";
import AboutRichard from "@/components/AboutRichard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Faq from "@/components/Faq";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080c14]">
      <Navbar />
      <HeroVideo />
      <ThreeDaysProgram />
      <AudienceTarget />
      <AboutRichard />
      <LeadCaptureForm />
      <Faq />
      <RiskDisclaimer />
      <Footer />
    </main>
  );
}
