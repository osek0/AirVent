export const dynamic = "force-dynamic";

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Image, FileText, Users, Star, MessageSquare, Settings, Award } from "lucide-react"

export default async function AdminDashboard() {
  const session = await auth()

  const [realizationCount, testimonialCount, offerCount, contactInfoCount] = await Promise.all([
    prisma.realization.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.offerItem.count().catch(() => 0),
    prisma.contactInfo.count().catch(() => 0),
  ])

  const sections = [
    { href: "/admin/hero", label: "Hero", description: "Sekcja główna strony", icon: Image },
    { href: "/admin/offer", label: "Oferta", description: `${offerCount || "—"} pozycji`, icon: FileText },
    { href: "/admin/about", label: "O nas", description: "Informacje o firmie", icon: Users },
    { href: "/admin/why", label: "Dlaczego warto", description: "Korzyści i zalety", icon: Award },
    { href: "/admin/realizations", label: "Realizacje", description: `${realizationCount || "—"} projektów`, icon: Image },
    { href: "/admin/testimonials", label: "Opinie", description: `${testimonialCount || "—"} opinii`, icon: Star },
    { href: "/admin/contact", label: "Kontakt", description: `${contactInfoCount || "—"} pozycji`, icon: MessageSquare },
    { href: "/admin/settings", label: "Ustawienia", description: "Nazwa firmy", icon: Settings },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel Administracyjny</h1>
        <p className="text-muted-foreground">
          Witaj, {session?.user?.name}! Zarządzaj treścią strony głównej.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Realizacje</h2>
          <p className="text-3xl font-bold">{realizationCount}</p>
          <p className="text-sm text-muted-foreground">Dodane realizacje</p>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Opinie</h2>
          <p className="text-3xl font-bold">{testimonialCount}</p>
          <p className="text-sm text-muted-foreground">Opinie klientów</p>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Oferta</h2>
          <p className="text-3xl font-bold">{offerCount}</p>
          <p className="text-sm text-muted-foreground">Pozycje w ofercie</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Sekcje strony</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-3 rounded-lg border bg-background p-4 hover:bg-muted transition-colors"
            >
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{section.label}</p>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
