import Image from "next/image";

interface AboutSectionProps {
  content: {
    subtitle: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
  };
  stats: { id: string; value: string; label: string; order: number }[];
}

export function AboutSection({ content, stats }: AboutSectionProps) {
  return (
    <section id="o-nas" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={content.image}
              alt="Nasz zespół przy pracy"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              {content.subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-balance">
              {content.heading}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.id}>
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
