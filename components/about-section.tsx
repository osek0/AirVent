import Image from "next/image";

const stats = [
  { value: "10+", label: "Lat doświadczenia" },
  { value: "2500+", label: "Zrealizowanych montaży" },
  { value: "98%", label: "Zadowolonych klientów" },
];

export function AboutSection() {
  return (
    <section id="o-nas" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/realization-3.jpg"
              alt="Nasz zespół przy pracy"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              O nas
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-balance">
              Eksperci w dziedzinie wentylacji okiennej
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Od ponad 10 lat zajmujemy się profesjonalnym montażem nawiewników okiennych. 
                Nasza firma powstała z pasji do tworzenia zdrowych i komfortowych przestrzeni życiowych.
              </p>
              <p>
                Współpracujemy z wiodącymi producentami nawiewników, co pozwala nam oferować 
                produkty najwyższej jakości w konkurencyjnych cenach. Każdy montaż wykonujemy 
                z najwyższą starannością, dbając o estetykę i funkcjonalność.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl sm:text-4xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
