import { prisma } from "@/lib/prisma";

export async function getHeroContent() {
  const data = await prisma.heroContent.findUnique({ where: { id: "singleton" } });
  return data ?? {
    id: "singleton",
    tagline: "Profesjonalny montaż wywietrzników",
    heading: "Świeże powietrze w Twoim domu przez cały rok",
    description: "Specjalizujemy się w montażu nawiewników okiennych, zapewniając optymalną wentylację i komfort w każdym pomieszczeniu.",
    primaryBtnText: "Bezpłatna wycena",
    secondaryBtnText: "Poznaj naszą ofertę",
    backgroundImage: "/images/hero-window.jpg",
  };
}

export async function getOfferData() {
  const header = await prisma.sectionHeader.findUnique({ where: { section: "offer" } });
  const items = await prisma.offerItem.findMany({ orderBy: { order: "asc" } });

  return {
    header: header ?? { section: "offer", subtitle: "Nasza oferta", title: "Kompleksowe rozwiązania wentylacyjne" },
    items: items.length > 0 ? items : [
      { id: "1", icon: "Wind", title: "Nawiewniki higrosterowane", description: "Automatycznie regulują przepływ powietrza w zależności od poziomu wilgotności w pomieszczeniu.", order: 0 },
      { id: "2", icon: "Settings", title: "Nawiewniki ciśnieniowe", description: "Idealne rozwiązanie do pomieszczeń z wentylacją mechaniczną, reagują na różnicę ciśnień.", order: 1 },
      { id: "3", icon: "Wrench", title: "Montaż i serwis", description: "Kompleksowa usługa montażu nawiewników wraz z późniejszym serwisem gwarancyjnym.", order: 2 },
      { id: "4", icon: "ShieldCheck", title: "Doradztwo techniczne", description: "Pomożemy dobrać odpowiedni typ nawiewnika do Twoich potrzeb i rodzaju wentylacji.", order: 3 },
    ],
  };
}

export async function getAboutData() {
  const content = await prisma.aboutContent.findUnique({ where: { id: "singleton" } });
  const stats = await prisma.aboutStat.findMany({ orderBy: { order: "asc" } });

  return {
    content: content ?? {
      id: "singleton",
      subtitle: "O nas",
      heading: "Eksperci w dziedzinie wentylacji okiennej",
      paragraph1: "Od ponad 10 lat zajmujemy się profesjonalnym montażem nawiewników okiennych. Nasza firma powstała z pasji do tworzenia zdrowych i komfortowych przestrzeni życiowych.",
      paragraph2: "Współpracujemy z wiodącymi producentami nawiewników, co pozwala nam oferować produkty najwyższej jakości w konkurencyjnych cenach. Każdy montaż wykonujemy z najwyższą starannością, dbając o estetykę i funkcjonalność.",
      image: "/images/realization-3.jpg",
    },
    stats: stats.length > 0 ? stats : [
      { id: "1", value: "10+", label: "Lat doświadczenia", order: 0 },
      { id: "2", value: "2500+", label: "Zrealizowanych montaży", order: 1 },
      { id: "3", value: "98%", label: "Zadowolonych klientów", order: 2 },
    ],
  };
}

export async function getWhyData() {
  const content = await prisma.whyContent.findUnique({ where: { id: "singleton" } });
  const benefits = await prisma.benefit.findMany({ orderBy: { order: "asc" } });
  const advantages = await prisma.advantage.findMany({ orderBy: { order: "asc" } });

  return {
    content: content ?? {
      id: "singleton",
      subtitle: "Dlaczego warto",
      heading: "Korzyści z montażu nawiewników okiennych",
      description: "Inwestycja w nawiewniki to inwestycja w zdrowie i komfort Twojej rodziny. Oto główne powody, dla których warto zdecydować się na to rozwiązanie.",
    },
    benefits: benefits.length > 0 ? benefits : [
      { id: "1", number: "01", title: "Zdrowe powietrze", description: "Nawiewniki zapewniają stały dopływ świeżego powietrza, eliminując problem zbyt szczelnych okien i wilgoci.", order: 0 },
      { id: "2", number: "02", title: "Oszczędność energii", description: "Kontrolowana wentylacja pozwala zachować ciepło w domu, zmniejszając rachunki za ogrzewanie.", order: 1 },
      { id: "3", number: "03", title: "Ochrona przed pleśnią", description: "Prawidłowa wymiana powietrza zapobiega kondensacji pary wodnej i rozwojowi grzybów.", order: 2 },
      { id: "4", number: "04", title: "Cicha praca", description: "Nowoczesne nawiewniki pracują bezgłośnie, nie zakłócając codziennego komfortu.", order: 3 },
    ],
    advantages: advantages.length > 0 ? advantages : [
      { id: "1", text: "Bezpłatna wycena i doradztwo", order: 0 },
      { id: "2", text: "Gwarancja na montaż i produkty", order: 1 },
      { id: "3", text: "Elastyczne terminy realizacji", order: 2 },
      { id: "4", text: "Atrakcyjne ceny", order: 3 },
    ],
  };
}

export async function getRealizationsData() {
  const header = await prisma.sectionHeader.findUnique({ where: { section: "realizations" } });
  const items = await prisma.realization.findMany({ orderBy: { order: "asc" } });

  return {
    header: header ?? { section: "realizations", subtitle: "Nasze realizacje", title: "Wybrane projekty" },
    items: items.length > 0 ? items : [
      { id: "1", image: "/images/realization-1.jpg", title: "Montaż nawiewników w apartamencie", location: "Warszawa, Mokotów", order: 0 },
      { id: "2", image: "/images/realization-2.jpg", title: "Wentylacja w domu jednorodzinnym", location: "Kraków, Krowodrza", order: 1 },
      { id: "3", image: "/images/realization-3.jpg", title: "Kompleksowa instalacja w biurowcu", location: "Wrocław, Centrum", order: 2 },
      { id: "4", image: "/images/realization-4.jpg", title: "Nawiewniki w nowym budownictwie", location: "Poznań, Jeżyce", order: 3 },
    ],
  };
}

export async function getTestimonialsData() {
  const header = await prisma.sectionHeader.findUnique({ where: { section: "testimonials" } });
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return {
    header: header ?? { section: "testimonials", subtitle: "Opinie klientów", title: "Co mówią o nas klienci" },
    items: items.length > 0 ? items : [
      { id: "1", name: "Anna Kowalska", role: "Właścicielka mieszkania", content: "Profesjonalna obsługa od początku do końca. Nawiewniki zostały zamontowane szybko i czysto. Różnica w jakości powietrza jest odczuwalna od pierwszego dnia.", rating: 5, order: 0 },
      { id: "2", name: "Marek Nowak", role: "Inwestor", content: "Współpracuję z firmą przy wykończeniu całego osiedla. Terminowość i jakość wykonania na najwyższym poziomie. Polecam każdemu deweloperowi.", rating: 5, order: 1 },
      { id: "3", name: "Katarzyna Wiśniewska", role: "Właścicielka domu", content: "Problem z wilgocią i skraplającą się parą na oknach zniknął całkowicie. Żałuję tylko, że nie zamontowaliśmy nawiewników wcześniej!", rating: 5, order: 2 },
    ],
  };
}

export async function getContactData() {
  const content = await prisma.contactContent.findUnique({ where: { id: "singleton" } });
  const items = await prisma.contactInfo.findMany({ orderBy: { order: "asc" } });

  return {
    content: content ?? {
      id: "singleton",
      subtitle: "Kontakt",
      heading: "Porozmawiajmy o Twoim projekcie",
      description: "Skontaktuj się z nami, aby uzyskać bezpłatną wycenę lub dowiedzieć się więcej o naszych usługach. Odpowiemy na wszystkie pytania.",
      formTitle: "Wyślij zapytanie",
    },
    items: items.length > 0 ? items : [
      { id: "1", icon: "Phone", label: "Telefon", value: "+48 123 456 789", href: "tel:+48123456789", order: 0 },
      { id: "2", icon: "Mail", label: "Email", value: "kontakt@bestservice.pl", href: "mailto:kontakt@bestservice.pl", order: 1 },
      { id: "3", icon: "MapPin", label: "Adres", value: "ul. Wentylacyjna 15, Warszawa", href: "#", order: 2 },
      { id: "4", icon: "Facebook", label: "Facebook", value: "BS BestService", href: "https://facebook.com/", order: 3 },
      { id: "5", icon: "Instagram", label: "Instagram", value: "@bestservice", href: "https://instagram.com/", order: 4 },
    ],
  };
}

export async function getSiteSettings() {
  const data = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  return data ?? { id: "singleton", companyName: "BS BestService" };
}
