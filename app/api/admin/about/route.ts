import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAboutData } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await getAboutData();
  return NextResponse.json(data);
}
