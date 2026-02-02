"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAboutContent,
  uploadImage,
  createAboutStat,
  updateAboutStat,
  deleteAboutStat,
} from "@/app/admin/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface AboutData {
  subtitle: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
}

interface StatData {
  id?: string;
  value: string;
  label: string;
  order: number;
}

const defaultContent: AboutData = {
  subtitle: "O nas",
  heading: "Eksperci w dziedzinie wentylacji okiennej",
  paragraph1: "Od ponad 10 lat zajmujemy się profesjonalnym montażem nawiewników okiennych. Nasza firma powstała z pasji do tworzenia zdrowych i komfortowych przestrzeni życiowych.",
  paragraph2: "Współpracujemy z wiodącymi producentami nawiewników, co pozwala nam oferować produkty najwyższej jakości w konkurencyjnych cenach. Każdy montaż wykonujemy z najwyższą starannością, dbając o estetykę i funkcjonalność.",
  image: "/images/realization-3.jpg",
};

export default function AboutEditor() {
  const [content, setContent] = useState<AboutData>(defaultContent);
  const [stats, setStats] = useState<StatData[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingStat, setEditingStat] = useState<StatData | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => {
        if (d?.content) setContent(d.content);
        if (d?.stats) setStats(d.stats);
      })
      .catch(() => {});
  }, []);

  async function handleSaveContent() {
    setSaving(true);
    try {
      await updateAboutContent(content);
      toast.success("Zapisano");
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImage(fd);
      setContent({ ...content, image: url });
      toast.success("Przesłano obraz");
    } catch {
      toast.error("Błąd przesyłania");
    }
    setUploading(false);
  }

  async function handleSaveStat() {
    if (!editingStat) return;
    setSaving(true);
    try {
      if (isNew) {
        await createAboutStat({ value: editingStat.value, label: editingStat.label, order: editingStat.order });
      } else if (editingStat.id) {
        await updateAboutStat(editingStat.id, { value: editingStat.value, label: editingStat.label, order: editingStat.order });
      }
      toast.success("Zapisano");
      setEditingStat(null);
      const r = await fetch("/api/admin/about");
      const d = await r.json();
      if (d?.stats) setStats(d.stats);
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  async function handleDeleteStat(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć?")) return;
    try {
      await deleteAboutStat(id);
      setStats(stats.filter((s) => s.id !== id));
      toast.success("Usunięto");
    } catch {
      toast.error("Błąd usuwania");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja O nas</h1>
        <p className="text-muted-foreground">Edytuj informacje o firmie.</p>
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
          <label className="text-sm font-medium">Akapit 1</label>
          <Textarea value={content.paragraph1} onChange={(e) => setContent({ ...content, paragraph1: e.target.value })} rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium">Akapit 2</label>
          <Textarea value={content.paragraph2} onChange={(e) => setContent({ ...content, paragraph2: e.target.value })} rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium">Obraz</label>
          <div className="mt-2 flex items-center gap-4">
            {content.image && (
              <div className="relative w-32 h-20 rounded overflow-hidden border">
                <Image src={content.image} alt="About" fill className="object-cover" />
              </div>
            )}
            <div>
              <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Przesyłanie...</p>}
            </div>
          </div>
        </div>
        <Button onClick={handleSaveContent} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz treść
        </Button>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Statystyki ({stats.length})</h2>
          <Button variant="outline" size="sm" onClick={() => { setIsNew(true); setEditingStat({ value: "", label: "", order: stats.length }); }}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj
          </Button>
        </div>

        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-3 p-3 rounded border">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => { setIsNew(false); setEditingStat({ ...stat }); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => stat.id && handleDeleteStat(stat.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {editingStat && (
          <div className="space-y-3 p-4 rounded border-2 border-primary/20 bg-muted/30">
            <h3 className="text-sm font-semibold">{isNew ? "Nowa statystyka" : "Edytuj statystykę"}</h3>
            <div>
              <label className="text-sm font-medium">Wartość</label>
              <Input value={editingStat.value} onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })} placeholder="np. 10+" />
            </div>
            <div>
              <label className="text-sm font-medium">Etykieta</label>
              <Input value={editingStat.label} onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })} placeholder="np. Lat doświadczenia" />
            </div>
            <div>
              <label className="text-sm font-medium">Kolejność</label>
              <Input type="number" value={editingStat.order} onChange={(e) => setEditingStat({ ...editingStat, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveStat} disabled={saving} size="sm">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditingStat(null)}>Anuluj</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
