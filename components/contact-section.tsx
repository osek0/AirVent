"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions";
import { getIcon } from "@/lib/icons";

interface ContactSectionProps {
  content: {
    subtitle: string;
    heading: string;
    description: string;
    formTitle: string;
  };
  items: { id: string; icon: string; label: string; value: string; href: string; order: number }[];
}

export function ContactSection({ content, items }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || "Wystąpił błąd podczas wysyłania wiadomości.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-background/60 mb-2">
              {content.subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-background mb-6 text-balance">
              {content.heading}
            </h2>
            <p className="text-background/80 leading-relaxed mb-10">
              {content.description}
            </p>

            <div className="space-y-6">
              {items.map((info) => {
                const Icon = getIcon(info.icon);
                return (
                  <a
                    key={info.id}
                    href={info.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                      <Icon className="h-5 w-5 text-background" />
                    </div>
                    <div>
                      <p className="text-sm text-background/60">{info.label}</p>
                      <p className="text-background font-medium">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-medium text-foreground mb-6">
              {content.formTitle}
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                Dziękujemy za wiadomość! Skontaktujemy się wkrótce.
              </div>
            )}

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
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Wysyłanie...
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Wyślij wiadomość
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
