"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateWhyContent,
  createBenefit,
  updateBenefit,
  deleteBenefit,
  createAdvantage,
  updateAdvantage,
  deleteAdvantage,
} from "@/app/admin/actions";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface WhyData {
  subtitle: string;
  heading: string;
  description: string;
}

interface BenefitData {
  id?: string;
  number: string;
  title: string;
  description: string;
  order: number;
}

interface AdvantageData {
  id?: string;
  text: string;
  order: number;
}

export default function WhyEditor() {
  const [content, setContent] = useState<WhyData>({
    subtitle: "Dlaczego warto",
    heading: "Korzyści z montażu nawiewników okiennych",
    description: "Inwestycja w nawiewniki to inwestycja w zdrowie i komfort Twojej rodziny. Oto główne powody, dla których warto zdecydować się na to rozwiązanie.",
  });
  const [benefits, setBenefits] = useState<BenefitData[]>([]);
  const [advantages, setAdvantages] = useState<AdvantageData[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<BenefitData | null>(null);
  const [editingAdvantage, setEditingAdvantage] = useState<AdvantageData | null>(null);
  const [isNewBenefit, setIsNewBenefit] = useState(false);
  const [isNewAdvantage, setIsNewAdvantage] = useState(false);

  useEffect(() => {
    fetch("/api/admin/why")
      .then((r) => r.json())
      .then((d) => {
        if (d?.content) setContent(d.content);
        if (d?.benefits) setBenefits(d.benefits);
        if (d?.advantages) setAdvantages(d.advantages);
      })
      .catch(() => {});
  }, []);

  async function handleSaveContent() {
    setSaving(true);
    try {
      await updateWhyContent(content);
      toast.success("Zapisano");
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleSaveBenefit() {
    if (!editingBenefit) return;
    setSaving(true);
    try {
      if (isNewBenefit) {
        await createBenefit({ number: editingBenefit.number, title: editingBenefit.title, description: editingBenefit.description, order: editingBenefit.order });
      } else if (editingBenefit.id) {
        await updateBenefit(editingBenefit.id, { number: editingBenefit.number, title: editingBenefit.title, description: editingBenefit.description, order: editingBenefit.order });
      }
      toast.success("Zapisano");
      setEditingBenefit(null);
      const r = await fetch("/api/admin/why");
      const d = await r.json();
      if (d?.benefits) setBenefits(d.benefits);
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleDeleteBenefit(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć?")) return;
    try {
      await deleteBenefit(id);
      setBenefits(benefits.filter((b) => b.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  async function handleSaveAdvantage() {
    if (!editingAdvantage) return;
    setSaving(true);
    try {
      if (isNewAdvantage) {
        await createAdvantage({ text: editingAdvantage.text, order: editingAdvantage.order });
      } else if (editingAdvantage.id) {
        await updateAdvantage(editingAdvantage.id, { text: editingAdvantage.text, order: editingAdvantage.order });
      }
      toast.success("Zapisano");
      setEditingAdvantage(null);
      const r = await fetch("/api/admin/why");
      const d = await r.json();
      if (d?.advantages) setAdvantages(d.advantages);
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleDeleteAdvantage(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć?")) return;
    try {
      await deleteAdvantage(id);
      setAdvantages(advantages.filter((a) => a.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Dlaczego warto</h1>
        <p className="text-muted-foreground">Zarządzaj korzyściami i zaletami.</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <h2 className="font-semibold">Treść</h2>
        <div>
          <label className="text-sm font-medium">Podtytuł</label>
          <Input value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Nagłówek</label>
          <Input value={content.heading} onChange={(e) => setContent({ ...content, heading: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Opis</label>
          <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={3} />
        </div>
        <Button onClick={handleSaveContent} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz treść
        </Button>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Korzyści ({benefits.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNewBenefit(true); setEditingBenefit({ number: String(benefits.length + 1).padStart(2, "0"), title: "", description: "", order: benefits.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        {benefits.map((b) => (
          <div key={b.id} className="flex items-center gap-3 p-3 rounded border">
            <span className="text-sm font-medium text-muted-foreground shrink-0">{b.number}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{b.title}</p>
              <p className="text-xs text-muted-foreground truncate">{b.description}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => { setIsNewBenefit(false); setEditingBenefit({ ...b }); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => b.id && handleDeleteBenefit(b.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {editingBenefit && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNewBenefit ? "Nowa korzyść" : "Edytuj korzyść"}</h3>
            <div>
              <label className="text-sm font-medium">Numer</label>
              <Input value={editingBenefit.number} onChange={(e) => setEditingBenefit({ ...editingBenefit, number: e.target.value })} placeholder="np. 01" />
            </div>
            <div>
              <label className="text-sm font-medium">Tytuł</label>
              <Input value={editingBenefit.title} onChange={(e) => setEditingBenefit({ ...editingBenefit, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Opis</label>
              <Textarea value={editingBenefit.description} onChange={(e) => setEditingBenefit({ ...editingBenefit, description: e.target.value })} rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium">Kolejność</label>
              <Input type="number" value={editingBenefit.order} onChange={(e) => setEditingBenefit({ ...editingBenefit, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveBenefit} disabled={saving} size="sm">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditingBenefit(null)}>Anuluj</Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Zalety ({advantages.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNewAdvantage(true); setEditingAdvantage({ text: "", order: advantages.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        {advantages.map((a) => (
          <div key={a.id} className="flex items-center gap-3 p-3 rounded border">
            <div className="flex-1 min-w-0">
              <p className="text-sm">{a.text}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => { setIsNewAdvantage(false); setEditingAdvantage({ ...a }); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => a.id && handleDeleteAdvantage(a.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {editingAdvantage && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNewAdvantage ? "Nowa zaleta" : "Edytuj zaletę"}</h3>
            <div>
              <label className="text-sm font-medium">Tekst</label>
              <Input value={editingAdvantage.text} onChange={(e) => setEditingAdvantage({ ...editingAdvantage, text: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Kolejność</label>
              <Input type="number" value={editingAdvantage.order} onChange={(e) => setEditingAdvantage({ ...editingAdvantage, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveAdvantage} disabled={saving} size="sm">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditingAdvantage(null)}>Anuluj</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
