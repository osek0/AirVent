import { getIcon } from "@/lib/icons";

interface OfferSectionProps {
  header: { subtitle: string; title: string };
  items: { id: string; icon: string; title: string; description: string; order: number }[];
}

export function OfferSection({ header, items }: OfferSectionProps) {
  return (
    <section id="oferta" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            {header.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            {header.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((offer) => {
            const Icon = getIcon(offer.icon);
            return (
              <div
                key={offer.id}
                className="group p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {offer.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
