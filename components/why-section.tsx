import { Check } from "lucide-react";

interface WhySectionProps {
  content: {
    subtitle: string;
    heading: string;
    description: string;
  };
  benefits: { id: string; number: string; title: string; description: string; order: number }[];
  advantages: { id: string; text: string; order: number }[];
}

export function WhySection({ content, benefits, advantages }: WhySectionProps) {
  return (
    <section id="dlaczego-warto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              {content.subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-balance">
              {content.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {advantages.map((advantage) => (
                <div
                  key={advantage.id}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
                >
                  <Check className="h-4 w-4 text-foreground" />
                  <span className="text-sm text-foreground">{advantage.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex gap-4 p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {benefit.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
