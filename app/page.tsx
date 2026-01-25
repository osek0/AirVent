import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { OfferSection } from "@/components/offer-section";
import { AboutSection } from "@/components/about-section";
import { WhySection } from "@/components/why-section";
import { RealizationsSection } from "@/components/realizations-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <OfferSection />
        <AboutSection />
        <WhySection />
        <RealizationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
