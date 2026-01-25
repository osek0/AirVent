import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const realizations = [
  {
    image: "/images/realization-1.jpg",
    title: "Montaż nawiewników w apartamencie",
    location: "Warszawa, Mokotów",
  },
  {
    image: "/images/realization-2.jpg",
    title: "Wentylacja w domu jednorodzinnym",
    location: "Kraków, Krowodrza",
  },
  {
    image: "/images/realization-3.jpg",
    title: "Kompleksowa instalacja w biurowcu",
    location: "Wrocław, Centrum",
  },
  {
    image: "/images/realization-4.jpg",
    title: "Nawiewniki w nowym budownictwie",
    location: "Poznań, Jeżyce",
  },
];

export function RealizationsSection() {
  return (
    <section id="realizacje" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Nasze realizacje
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            Wybrane projekty
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {realizations.map((realization, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={realization.image || "/placeholder.svg"}
                alt={realization.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-background mb-1">
                      {realization.title}
                    </h3>
                    <p className="text-sm text-background/80">
                      {realization.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
