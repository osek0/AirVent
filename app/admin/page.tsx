import { auth } from "@/auth"

export default async function AdminDashboard() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel Administracyjny</h1>
        <p className="text-muted-foreground">
          Witaj, {session?.user?.name}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Wiadomości</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">
            Nowe wiadomości z formularza kontaktowego
          </p>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Realizacje</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">
            Dodane realizacje
          </p>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <h2 className="font-semibold">Opinie</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">
            Opinie klientów
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="mb-4 font-semibold">Szybkie akcje</h2>
        <p className="text-sm text-muted-foreground">
          Panel jest gotowy do rozbudowy. Możesz dodać tutaj funkcje takie jak:
        </p>
        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
          <li>Przeglądanie wiadomości z formularza kontaktowego</li>
          <li>Zarządzanie realizacjami</li>
          <li>Zarządzanie opiniami klientów</li>
          <li>Edycja treści strony</li>
        </ul>
      </div>
    </div>
  )
}
