import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Hero Content
  await prisma.heroContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      tagline: "Profesjonalny montaż wywietrzników",
      heading: "Świeże powietrze w Twoim domu przez cały rok",
      description: "Specjalizujemy się w montażu nawiewników okiennych, zapewniając optymalną wentylację i komfort w każdym pomieszczeniu.",
      primaryBtnText: "Bezpłatna wycena",
      secondaryBtnText: "Poznaj naszą ofertę",
      backgroundImage: "/images/hero-window.jpg",
    },
  });
  console.log("  ✓ Hero content");

  // About Content
  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      subtitle: "O nas",
      heading: "Eksperci w dziedzinie wentylacji okiennej",
      paragraph1: "Od ponad 10 lat zajmujemy się profesjonalnym montażem nawiewników okiennych. Nasza firma powstała z pasji do tworzenia zdrowych i komfortowych przestrzeni życiowych.",
      paragraph2: "Współpracujemy z wiodącymi producentami nawiewników, co pozwala nam oferować produkty najwyższej jakości w konkurencyjnych cenach. Każdy montaż wykonujemy z najwyższą starannością, dbając o estetykę i funkcjonalność.",
      image: "/images/realization-3.jpg",
    },
  });
  console.log("  ✓ About content");

  // Why Content
  await prisma.whyContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      subtitle: "Dlaczego warto",
      heading: "Korzyści z montażu nawiewników okiennych",
      description: "Inwestycja w nawiewniki to inwestycja w zdrowie i komfort Twojej rodziny. Oto główne powody, dla których warto zdecydować się na to rozwiązanie.",
    },
  });
  console.log("  ✓ Why content");

  // Contact Content
  await prisma.contactContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      subtitle: "Kontakt",
      heading: "Porozmawiajmy o Twoim projekcie",
      description: "Skontaktuj się z nami, aby uzyskać bezpłatną wycenę lub dowiedzieć się więcej o naszych usługach. Odpowiemy na wszystkie pytania.",
      formTitle: "Wyślij zapytanie",
    },
  });
  console.log("  ✓ Contact content");

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      companyName: "BS BestService",
    },
  });
  console.log("  ✓ Site settings");

  // Section Headers
  const headers = [
    { section: "offer", subtitle: "Nasza oferta", title: "Kompleksowe rozwiązania wentylacyjne" },
    { section: "realizations", subtitle: "Nasze realizacje", title: "Wybrane projekty" },
    { section: "testimonials", subtitle: "Opinie klientów", title: "Co mówią o nas klienci" },
  ];
  for (const h of headers) {
    await prisma.sectionHeader.upsert({
      where: { section: h.section },
      update: {},
      create: h,
    });
  }
  console.log("  ✓ Section headers");

  // Offer Items
  const offerItems = [
    { icon: "Wind", title: "Nawiewniki higrosterowane", description: "Automatycznie regulują przepływ powietrza w zależności od poziomu wilgotności w pomieszczeniu.", order: 0 },
    { icon: "Settings", title: "Nawiewniki ciśnieniowe", description: "Idealne rozwiązanie do pomieszczeń z wentylacją mechaniczną, reagują na różnicę ciśnień.", order: 1 },
    { icon: "Wrench", title: "Montaż i serwis", description: "Kompleksowa usługa montażu nawiewników wraz z późniejszym serwisem gwarancyjnym.", order: 2 },
    { icon: "ShieldCheck", title: "Doradztwo techniczne", description: "Pomożemy dobrać odpowiedni typ nawiewnika do Twoich potrzeb i rodzaju wentylacji.", order: 3 },
  ];
  const existingOffers = await prisma.offerItem.count();
  if (existingOffers === 0) {
    for (const item of offerItems) {
      await prisma.offerItem.create({ data: item });
    }
  }
  console.log("  ✓ Offer items");

  // About Stats
  const aboutStats = [
    { value: "10+", label: "Lat doświadczenia", order: 0 },
    { value: "2500+", label: "Zrealizowanych montaży", order: 1 },
    { value: "98%", label: "Zadowolonych klientów", order: 2 },
  ];
  const existingStats = await prisma.aboutStat.count();
  if (existingStats === 0) {
    for (const stat of aboutStats) {
      await prisma.aboutStat.create({ data: stat });
    }
  }
  console.log("  ✓ About stats");

  // Benefits
  const benefits = [
    { number: "01", title: "Zdrowe powietrze", description: "Nawiewniki zapewniają stały dopływ świeżego powietrza, eliminując problem zbyt szczelnych okien i wilgoci.", order: 0 },
    { number: "02", title: "Oszczędność energii", description: "Kontrolowana wentylacja pozwala zachować ciepło w domu, zmniejszając rachunki za ogrzewanie.", order: 1 },
    { number: "03", title: "Ochrona przed pleśnią", description: "Prawidłowa wymiana powietrza zapobiega kondensacji pary wodnej i rozwojowi grzybów.", order: 2 },
    { number: "04", title: "Cicha praca", description: "Nowoczesne nawiewniki pracują bezgłośnie, nie zakłócając codziennego komfortu.", order: 3 },
  ];
  const existingBenefits = await prisma.benefit.count();
  if (existingBenefits === 0) {
    for (const b of benefits) {
      await prisma.benefit.create({ data: b });
    }
  }
  console.log("  ✓ Benefits");

  // Advantages
  const advantages = [
    { text: "Bezpłatna wycena i doradztwo", order: 0 },
    { text: "Gwarancja na montaż i produkty", order: 1 },
    { text: "Elastyczne terminy realizacji", order: 2 },
    { text: "Atrakcyjne ceny", order: 3 },
  ];
  const existingAdvantages = await prisma.advantage.count();
  if (existingAdvantages === 0) {
    for (const a of advantages) {
      await prisma.advantage.create({ data: a });
    }
  }
  console.log("  ✓ Advantages");

  // Realizations
  const realizations = [
    { image: "/images/realization-1.jpg", title: "Montaż nawiewników w apartamencie", location: "Warszawa, Mokotów", order: 0 },
    { image: "/images/realization-2.jpg", title: "Wentylacja w domu jednorodzinnym", location: "Kraków, Krowodrza", order: 1 },
    { image: "/images/realization-3.jpg", title: "Kompleksowa instalacja w biurowcu", location: "Wrocław, Centrum", order: 2 },
    { image: "/images/realization-4.jpg", title: "Nawiewniki w nowym budownictwie", location: "Poznań, Jeżyce", order: 3 },
  ];
  const existingRealizations = await prisma.realization.count();
  if (existingRealizations === 0) {
    for (const r of realizations) {
      await prisma.realization.create({ data: r });
    }
  }
  console.log("  ✓ Realizations");

  // Testimonials
  const testimonials = [
    { name: "Anna Kowalska", role: "Właścicielka mieszkania", content: "Profesjonalna obsługa od początku do końca. Nawiewniki zostały zamontowane szybko i czysto. Różnica w jakości powietrza jest odczuwalna od pierwszego dnia.", rating: 5, order: 0 },
    { name: "Marek Nowak", role: "Inwestor", content: "Współpracuję z firmą przy wykończeniu całego osiedla. Terminowość i jakość wykonania na najwyższym poziomie. Polecam każdemu deweloperowi.", rating: 5, order: 1 },
    { name: "Katarzyna Wiśniewska", role: "Właścicielka domu", content: "Problem z wilgocią i skraplającą się parą na oknach zniknął całkowicie. Żałuję tylko, że nie zamontowaliśmy nawiewników wcześniej!", rating: 5, order: 2 },
  ];
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("  ✓ Testimonials");

  // Contact Info
  const contactInfos = [
    { icon: "Phone", label: "Telefon", value: "+48 123 456 789", href: "tel:+48123456789", order: 0 },
    { icon: "Mail", label: "Email", value: "kontakt@bestservice.pl", href: "mailto:kontakt@bestservice.pl", order: 1 },
    { icon: "MapPin", label: "Adres", value: "ul. Wentylacyjna 15, Warszawa", href: "#", order: 2 },
  ];
  const existingContactInfos = await prisma.contactInfo.count();
  if (existingContactInfos === 0) {
    for (const c of contactInfos) {
      await prisma.contactInfo.create({ data: c });
    }
  }
  console.log("  ✓ Contact info");

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
