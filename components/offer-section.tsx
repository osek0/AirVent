import { Wind, Settings, Wrench, ShieldCheck } from "lucide-react";

const offers = [
  {
    icon: Wind,
    title: "Nawiewniki higrosterowane",
    description:
      "Automatycznie regulują przepływ powietrza w zależności od poziomu wilgotności w pomieszczeniu.",
  },
  {
    icon: Settings,
    title: "Nawiewniki ciśnieniowe",
    description:
      "Idealne rozwiązanie do pomieszczeń z wentylacją mechaniczną, reagują na różnicę ciśnień.",
  },
  {
    icon: Wrench,
    title: "Montaż i serwis",
    description:
      "Kompleksowa usługa montażu nawiewników wraz z późniejszym serwisem gwarancyjnym.",
  },
  {
    icon: ShieldCheck,
    title: "Doradztwo techniczne",
    description:
      "Pomożemy dobrać odpowiedni typ nawiewnika do Twoich potrzeb i rodzaju wentylacji.",
  },
];

export function OfferSection() {
  return (
    <section id="oferta" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Nasza oferta
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            Kompleksowe rozwiązania wentylacyjne
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="group p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <offer.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
