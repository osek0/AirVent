import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anna Kowalska",
    role: "Właścicielka mieszkania",
    content:
      "Profesjonalna obsługa od początku do końca. Nawiewniki zostały zamontowane szybko i czysto. Różnica w jakości powietrza jest odczuwalna od pierwszego dnia.",
    rating: 5,
  },
  {
    name: "Marek Nowak",
    role: "Inwestor",
    content:
      "Współpracuję z firmą przy wykończeniu całego osiedla. Terminowość i jakość wykonania na najwyższym poziomie. Polecam każdemu deweloperowi.",
    rating: 5,
  },
  {
    name: "Katarzyna Wiśniewska",
    role: "Właścicielka domu",
    content:
      "Problem z wilgocią i skraplającą się parą na oknach zniknął całkowicie. Żałuję tylko, że nie zamontowaliśmy nawiewników wcześniej!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="opinie" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Opinie klientów
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            Co mówią o nas klienci
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border border-border rounded-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-foreground text-foreground"
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {`"${testimonial.content}"`}
              </p>
              <div>
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
