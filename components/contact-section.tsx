"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kontakt@airventpro.pl",
    href: "mailto:kontakt@airventpro.pl",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "ul. Wentylacyjna 15, Warszawa",
    href: "#",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted:", formData);
    alert("Dziękujemy za wiadomość! Skontaktujemy się wkrótce.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-24 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-background/60 mb-2">
              Kontakt
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-background mb-6 text-balance">
              Porozmawiajmy o Twoim projekcie
            </h2>
            <p className="text-background/80 leading-relaxed mb-10">
              Skontaktuj się z nami, aby uzyskać bezpłatną wycenę lub dowiedzieć się więcej 
              o naszych usługach. Odpowiemy na wszystkie pytania.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                    <info.icon className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-background/60">{info.label}</p>
                    <p className="text-background font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-medium text-foreground mb-6">
              Wyślij zapytanie
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Imię i nazwisko"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <Input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Textarea
                  placeholder="Opisz swój projekt lub zadaj pytanie..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Wyślij wiadomość
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
