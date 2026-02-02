import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  header: { subtitle: string; title: string };
  items: { id: string; name: string; role: string; content: string; rating: number; order: number }[];
}

export function TestimonialsSection({ header, items }: TestimonialsSectionProps) {
  return (
    <section id="opinie" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            {header.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            {header.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
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
