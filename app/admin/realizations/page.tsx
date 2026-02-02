"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  updateSectionHeader,
  createRealization,
  updateRealization,
  deleteRealization,
  uploadImage,
} from "@/app/admin/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface RealizationData {
  id?: string;
  image: string;
  title: string;
  location: string;
  order: number;
}

export default function RealizationsEditor() {
  const [header, setHeader] = useState({ subtitle: "Nasze realizacje", title: "Wybrane projekty" });
  const [items, setItems] = useState<RealizationData[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<RealizationData | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/realizations")
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
      await updateSectionHeader("realizations", header);
      toast.success("Zapisano nagłówek");
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImage(fd);
      setEditingItem({ ...editingItem, image: url });
      toast.success("Przesłano obraz");
    } catch {
      toast.error("Błąd przesyłania");
    }
    setUploading(false);
  }

  async function handleSaveItem() {
    if (!editingItem) return;
    setSaving(true);
    try {
      if (isNew) {
        await createRealization({ image: editingItem.image, title: editingItem.title, location: editingItem.location, order: editingItem.order });
      } else if (editingItem.id) {
        await updateRealization(editingItem.id, { image: editingItem.image, title: editingItem.title, location: editingItem.location, order: editingItem.order });
      }
      toast.success("Zapisano");
      setEditingItem(null);
      const r = await fetch("/api/admin/realizations");
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
      await deleteRealization(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Realizacje</h1>
        <p className="text-muted-foreground">Zarządzaj realizacjami.</p>
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
          <h2 className="font-semibold">Realizacje ({items.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNew(true); setEditingItem({ image: "", title: "", location: "", order: items.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded border">
              {item.image && (
                <div className="relative w-20 h-14 rounded overflow-hidden border shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
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
          ))}
        </div>

        {editingItem && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNew ? "Nowa realizacja" : "Edytuj realizację"}</h3>
            <div>
              <label className="text-sm font-medium">Tytuł</label>
              <Input value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Lokalizacja</label>
              <Input value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Obraz</label>
              <div className="mt-2 flex items-center gap-4">
                {editingItem.image && (
                  <div className="relative w-24 h-16 rounded overflow-hidden border">
                    <Image src={editingItem.image} alt="" fill className="object-cover" />
                  </div>
                )}
                <div>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  {uploading && <p className="text-xs text-muted-foreground mt-1">Przesyłanie...</p>}
                </div>
              </div>
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
