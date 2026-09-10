import MarketTicker from "@/components/MarketTicker";
import Navbar from "@/components/Navbar";
import CountdownUrgencyBar from "@/components/CountdownUrgencyBar";
import HeroVideo from "@/components/HeroVideo";
import InstitutionalVsRetail from "@/components/InstitutionalVsRetail";
import TradingCalculator from "@/components/TradingCalculator";
import ThreeDaysProgram from "@/components/ThreeDaysProgram";
import SetupBreakdown from "@/components/SetupBreakdown";
import AudienceTarget from "@/components/AudienceTarget";
import AboutRichard from "@/components/AboutRichard";
import RadicalTransparency from "@/components/RadicalTransparency";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Faq from "@/components/Faq";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-[#00e5ff]/30 selection:text-white">
      {/* 1. Live market streaming ticker */}
      <MarketTicker />

      {/* 2. Sticky navigation */}
      <Navbar />

      {/* 3. Live urgency countdown bar (250 Zoom spots max) */}
      <CountdownUrgencyBar />

      {/* 4. Hero section with video & primary offer */}
      <HeroVideo />

      {/* 5. Reality check: 95% retail vs 5% institutional */}
      <InstitutionalVsRetail />

      {/* 6. Interactive institutional risk/reward calculator */}
      <TradingCalculator />

      {/* 7. Full 3-day curriculum + PDF Lead Magnet */}
      <ThreeDaysProgram />

      {/* 8. Anatomy of real trades in Gold & Forex */}
      <SetupBreakdown />

      {/* 9. Target audience filter */}
      <AudienceTarget />

      {/* 10. About Richard Veintimilla */}
      <AboutRichard />

      {/* 11. Radical transparency: why it's 100% free */}
      <RadicalTransparency />

      {/* 12. Lead capture form + WhatsApp redirect */}
      <LeadCaptureForm />

      {/* 13. Frequently asked questions */}
      <Faq />

      {/* 14. Regulatory financial risk disclaimer */}
      <RiskDisclaimer />

      {/* 15. Footer */}
      <Footer />

      {/* 16. Floating sticky VIP WhatsApp trigger */}
      <StickyMobileCta />
    </main>
  );
}

