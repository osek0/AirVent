"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateHeroContent, uploadImage } from "@/app/admin/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface HeroData {
  tagline: string;
  heading: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  backgroundImage: string;
}

const defaults: HeroData = {
  tagline: "Profesjonalny montaż wywietrzników",
  heading: "Świeże powietrze w Twoim domu przez cały rok",
  description: "Specjalizujemy się w montażu nawiewników okiennych, zapewniając optymalną wentylację i komfort w każdym pomieszczeniu.",
  primaryBtnText: "Bezpłatna wycena",
  secondaryBtnText: "Poznaj naszą ofertę",
  backgroundImage: "/images/hero-window.jpg",
};

export default function HeroEditor() {
  const [data, setData] = useState<HeroData>(defaults);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((d) => { if (d && d.tagline) setData(d); })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await updateHeroContent(data);
      toast.success("Zapisano zmiany");
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
      setData({ ...data, backgroundImage: url });
      toast.success("Przesłano obraz");
    } catch {
      toast.error("Błąd przesyłania");
    }
    setUploading(false);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sekcja Hero</h1>
        <p className="text-muted-foreground">Edytuj główną sekcję strony.</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div>
          <label className="text-sm font-medium">Tagline</label>
          <Input value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Nagłówek</label>
          <Input value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Opis</label>
          <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Przycisk główny</label>
            <Input value={data.primaryBtnText} onChange={(e) => setData({ ...data, primaryBtnText: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Przycisk drugi</label>
            <Input value={data.secondaryBtnText} onChange={(e) => setData({ ...data, secondaryBtnText: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Obraz tła</label>
          <div className="mt-2 flex items-center gap-4">
            {data.backgroundImage && (
              <div className="relative w-32 h-20 rounded overflow-hidden border">
                <Image src={data.backgroundImage} alt="Hero background" fill className="object-cover" />
              </div>
            )}
            <div>
              <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Przesyłanie...</p>}
            </div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz
        </Button>
      </div>
    </div>
  );
}
