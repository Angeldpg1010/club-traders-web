import MarketTicker from "@/components/MarketTicker";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import InstitutionalVsRetail from "@/components/InstitutionalVsRetail";
import ThreeDaysProgram from "@/components/ThreeDaysProgram";
import AudienceTarget from "@/components/AudienceTarget";
import AboutRichard from "@/components/AboutRichard";
import RadicalTransparency from "@/components/RadicalTransparency";
import Faq from "@/components/Faq";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-[#00e5ff]/30 selection:text-white">
      {/* Live market streaming ticker */}
      <MarketTicker />

      {/* Sticky navigation */}
      <Navbar />

      {/* Hero section with video & primary offer */}
      <HeroVideo />

      {/* Reality check: 95% retail vs 5% institutional */}
      <InstitutionalVsRetail />

      {/* Full 3-day curriculum + PDF Lead Magnet */}
      <ThreeDaysProgram />

      {/* Target audience filter */}
      <AudienceTarget />

      {/* About Richard Veintimilla */}
      <AboutRichard />

      {/* Radical transparency: why it's 100% free */}
      <RadicalTransparency />

      {/* Frequently asked questions */}
      <Faq />

      {/* Regulatory financial risk disclaimer */}
      <RiskDisclaimer />

      {/* Footer */}
      <Footer />

      {/* Floating sticky VIP WhatsApp trigger */}
      <StickyMobileCta />
    </main>
  );
}

