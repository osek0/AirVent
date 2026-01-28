import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AdminNav } from "./components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Allow login page to render without session
  return (
    <div className="min-h-screen bg-muted/30">
      {session?.user && <AdminNav user={session.user} />}
      <main className={session?.user ? "p-6" : ""}>{children}</main>
    </div>
  )
}
