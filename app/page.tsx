export const dynamic = "force-dynamic";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { OfferSection } from "@/components/offer-section";
import { AboutSection } from "@/components/about-section";
import { WhySection } from "@/components/why-section";
import { RealizationsSection } from "@/components/realizations-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import {
  getHeroContent,
  getOfferData,
  getAboutData,
  getWhyData,
  getRealizationsData,
  getTestimonialsData,
  getContactData,
  getSiteSettings,
} from "@/lib/db";

export default async function Home() {
  const [hero, offer, about, why, realizations, testimonials, contact, settings] = await Promise.all([
    getHeroContent(),
    getOfferData(),
    getAboutData(),
    getWhyData(),
    getRealizationsData(),
    getTestimonialsData(),
    getContactData(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header companyName={settings.companyName} />
      <main>
        <HeroSection data={hero} />
        <OfferSection header={offer.header} items={offer.items} />
        <AboutSection content={about.content} stats={about.stats} />
        <WhySection content={why.content} benefits={why.benefits} advantages={why.advantages} />
        <RealizationsSection header={realizations.header} items={realizations.items} />
        <TestimonialsSection header={testimonials.header} items={testimonials.items} />
        <ContactSection content={contact.content} items={contact.items} />
      </main>
      <Footer companyName={settings.companyName} />
    </>
  );
}
