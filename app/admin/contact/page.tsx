"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateContactContent,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "@/app/admin/actions";
import { toast } from "sonner";
import { iconNames, iconMap } from "@/lib/icons";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface ContactData {
  subtitle: string;
  heading: string;
  description: string;
  formTitle: string;
}

interface ContactInfoData {
  id?: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  order: number;
}

export default function ContactEditor() {
  const [content, setContent] = useState<ContactData>({
    subtitle: "Kontakt",
    heading: "Porozmawiajmy o Twoim projekcie",
    description: "Skontaktuj się z nami, aby uzyskać bezpłatną wycenę lub dowiedzieć się więcej o naszych usługach. Odpowiemy na wszystkie pytania.",
    formTitle: "Wyślij zapytanie",
  });
  const [items, setItems] = useState<ContactInfoData[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<ContactInfoData | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact")
      .then((r) => r.json())
      .then((d) => {
        if (d?.content) setContent(d.content);
        if (d?.items) setItems(d.items);
      })
      .catch(() => {});
  }, []);

  async function handleSaveContent() {
    setSaving(true);
    try {
      await updateContactContent(content);
      toast.success("Zapisano");
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleSaveItem() {
    if (!editingItem) return;
    setSaving(true);
    try {
      if (isNew) {
        await createContactInfo({ icon: editingItem.icon, label: editingItem.label, value: editingItem.value, href: editingItem.href, order: editingItem.order });
      } else if (editingItem.id) {
        await updateContactInfo(editingItem.id, { icon: editingItem.icon, label: editingItem.label, value: editingItem.value, href: editingItem.href, order: editingItem.order });
      }
      toast.success("Zapisano");
      setEditingItem(null);
      const r = await fetch("/api/admin/contact");
      const d = await r.json();
      if (d?.items) setItems(d.items);
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć?")) return;
    try {
      await deleteContactInfo(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Kontakt</h1>
        <p className="text-muted-foreground">Zarządzaj danymi kontaktowymi.</p>
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
        <div>
          <label className="text-sm font-medium">Tytuł formularza</label>
          <Input value={content.formTitle} onChange={(e) => setContent({ ...content, formTitle: e.target.value })} />
        </div>
        <Button onClick={handleSaveContent} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz treść
        </Button>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Dane kontaktowe ({items.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNew(true); setEditingItem({ icon: "Phone", label: "", value: "", href: "", order: items.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded border">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-medium text-sm truncate">{item.value}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => { setIsNew(false); setEditingItem({ ...item }); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => item.id && handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}

        {editingItem && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNew ? "Nowa pozycja" : "Edytuj pozycję"}</h3>
            <div>
              <label className="text-sm font-medium">Ikona</label>
              <select
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                value={editingItem.icon}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
              >
                {iconNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Etykieta</label>
              <Input value={editingItem.label} onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })} placeholder="np. Telefon" />
            </div>
            <div>
              <label className="text-sm font-medium">Wartość</label>
              <Input value={editingItem.value} onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })} placeholder="np. +48 123 456 789" />
            </div>
            <div>
              <label className="text-sm font-medium">Link (href)</label>
              <Input value={editingItem.href} onChange={(e) => setEditingItem({ ...editingItem, href: e.target.value })} placeholder="np. tel:+48123456789" />
            </div>
            <div>
              <label className="text-sm font-medium">Kolejność</label>
              <Input type="number" value={editingItem.order} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveItem} disabled={saving} size="sm">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>Anuluj</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
