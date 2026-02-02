import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  data: {
    tagline: string;
    heading: string;
    description: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    backgroundImage: string;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt="Nowoczesne wnętrze z wywietrznikami"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-widest text-background/80 mb-4">
          {data.tagline}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-background leading-tight text-balance mb-6">
          {data.heading}
        </h1>
        <p className="text-lg text-background/80 max-w-2xl mx-auto mb-8 text-pretty">
          {data.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
            <a href="#kontakt">
              {data.primaryBtnText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-background text-background hover:bg-background/10 bg-transparent">
            <a href="#oferta">{data.secondaryBtnText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
