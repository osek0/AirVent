"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSiteSettings } from "@/app/admin/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsEditor() {
  const [companyName, setCompanyName] = useState("BS BestService");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => { if (d?.companyName) setCompanyName(d.companyName); })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await updateSiteSettings({ companyName });
      toast.success("Zapisano ustawienia");
    } catch {
      toast.error("Błąd zapisu");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ustawienia</h1>
        <p className="text-muted-foreground">Ogólne ustawienia strony.</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-6">
        <div>
          <label className="text-sm font-medium">Nazwa firmy</label>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Wyświetlana w nagłówku i stopce strony.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Zapisz
        </Button>
      </div>
    </div>
  );
}
