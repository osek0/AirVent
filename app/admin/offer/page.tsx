"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateSectionHeader,
  createOfferItem,
  updateOfferItem,
  deleteOfferItem,
} from "@/app/admin/actions";
import { toast } from "sonner";
import { iconNames, iconMap } from "@/lib/icons";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface OfferItemData {
  id?: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export default function OfferEditor() {
  const [header, setHeader] = useState({ subtitle: "Nasza oferta", title: "Kompleksowe rozwiązania wentylacyjne" });
  const [items, setItems] = useState<OfferItemData[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<OfferItemData | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/offer")
      .then((r) => r.json())
      .then((d) => {
        if (d?.header) setHeader(d.header);
        if (d?.items) setItems(d.items);
      })
      .catch(() => {});
  }, []);

  async function handleSaveHeader() {
    setSaving(true);
    try {
      await updateSectionHeader("offer", header);
      toast.success("Zapisano nagłówek");
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
        await createOfferItem({
          icon: editingItem.icon,
          title: editingItem.title,
          description: editingItem.description,
          order: editingItem.order,
        });
      } else if (editingItem.id) {
        await updateOfferItem(editingItem.id, {
          icon: editingItem.icon,
          title: editingItem.title,
          description: editingItem.description,
          order: editingItem.order,
        });
      }
      toast.success("Zapisano");
      setEditingItem(null);
      // Refresh
      const r = await fetch("/api/admin/offer");
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
      await deleteOfferItem(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  function startNew() {
    setIsNew(true);
    setEditingItem({ icon: "Wind", title: "", description: "", order: items.length });
  }

  function startEdit(item: OfferItemData) {
    setIsNew(false);
    setEditingItem({ ...item });
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Oferta</h1>
        <p className="text-muted-foreground">Zarządzaj nagłówkiem i pozycjami oferty.</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <h2 className="font-semibold">Nagłówek sekcji</h2>
        <div>
          <label className="text-sm font-medium">Podtytuł</label>
          <Input value={header.subtitle} onChange={(e) => setHeader({ ...header, subtitle: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Tytuł</label>
          <Input value={header.title} onChange={(e) => setHeader({ ...header, title: e.target.value })} />
        </div>
        <Button onClick={handleSaveHeader} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz nagłówek
        </Button>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Pozycje oferty ({items.length})</h2>
          <Button variant="outline" size="sm" onClick={startNew}>
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
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(item)}>
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
              <label className="text-sm font-medium">Tytuł</label>
              <Input value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Opis</label>
              <Textarea value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} rows={2} />
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
