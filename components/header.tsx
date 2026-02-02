"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wind } from "lucide-react";

const navLinks = [
  { href: "#oferta", label: "Oferta" },
  { href: "#o-nas", label: "O nas" },
  { href: "#dlaczego-warto", label: "Dlaczego warto" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#opinie", label: "Opinie" },
];

interface HeaderProps {
  companyName: string;
}

export function Header({ companyName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-foreground" />
            <span className="text-lg font-semibold tracking-tight">{companyName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild>
              <a href="#kontakt">Kontakt</a>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="w-full mt-2">
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)}>
                Kontakt
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
