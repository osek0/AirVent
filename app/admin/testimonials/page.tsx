"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateSectionHeader,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/admin/actions";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, Star } from "lucide-react";

interface TestimonialData {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  order: number;
}

export default function TestimonialsEditor() {
  const [header, setHeader] = useState({ subtitle: "Opinie klientów", title: "Co mówią o nas klienci" });
  const [items, setItems] = useState<TestimonialData[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialData | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/testimonials")
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
      await updateSectionHeader("testimonials", header);
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
        await createTestimonial({ name: editingItem.name, role: editingItem.role, content: editingItem.content, rating: editingItem.rating, order: editingItem.order });
      } else if (editingItem.id) {
        await updateTestimonial(editingItem.id, { name: editingItem.name, role: editingItem.role, content: editingItem.content, rating: editingItem.rating, order: editingItem.order });
      }
      toast.success("Zapisano");
      setEditingItem(null);
      const r = await fetch("/api/admin/testimonials");
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
      await deleteTestimonial(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Opinie</h1>
        <p className="text-muted-foreground">Zarządzaj opiniami klientów.</p>
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
          <h2 className="font-semibold">Opinie ({items.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNew(true); setEditingItem({ name: "", role: "", content: "", rating: 5, order: items.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        {items.map((item) => (
          <div key={item.id} className="p-3 rounded border space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5 mr-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-foreground text-foreground" />
                  ))}
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setIsNew(false); setEditingItem({ ...item }); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => item.id && handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
          </div>
        ))}

        {editingItem && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNew ? "Nowa opinia" : "Edytuj opinię"}</h3>
            <div>
              <label className="text-sm font-medium">Imię i nazwisko</label>
              <Input value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Rola</label>
              <Input value={editingItem.role} onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })} placeholder="np. Właściciel mieszkania" />
            </div>
            <div>
              <label className="text-sm font-medium">Treść opinii</label>
              <Textarea value={editingItem.content} onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Ocena (1-5)</label>
              <Input type="number" min={1} max={5} value={editingItem.rating} onChange={(e) => setEditingItem({ ...editingItem, rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 1)) })} />
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
