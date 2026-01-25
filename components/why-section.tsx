import { Check } from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Zdrowe powietrze",
    description:
      "Nawiewniki zapewniają stały dopływ świeżego powietrza, eliminując problem zbyt szczelnych okien i wilgoci.",
  },
  {
    number: "02",
    title: "Oszczędność energii",
    description:
      "Kontrolowana wentylacja pozwala zachować ciepło w domu, zmniejszając rachunki za ogrzewanie.",
  },
  {
    number: "03",
    title: "Ochrona przed pleśnią",
    description:
      "Prawidłowa wymiana powietrza zapobiega kondensacji pary wodnej i rozwojowi grzybów.",
  },
  {
    number: "04",
    title: "Cicha praca",
    description:
      "Nowoczesne nawiewniki pracują bezgłośnie, nie zakłócając codziennego komfortu.",
  },
];

const advantages = [
  "Bezpłatna wycena i doradztwo",
  "Gwarancja na montaż i produkty",
  "Elastyczne terminy realizacji",
  "Atrakcyjne ceny",
];

export function WhySection() {
  return (
    <section id="dlaczego-warto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Dlaczego warto
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-balance">
              Korzyści z montażu nawiewników okiennych
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Inwestycja w nawiewniki to inwestycja w zdrowie i komfort Twojej rodziny. 
              Oto główne powody, dla których warto zdecydować się na to rozwiązanie.
            </p>

            <div className="flex flex-wrap gap-3">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
                >
                  <Check className="h-4 w-4 text-foreground" />
                  <span className="text-sm text-foreground">{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
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
