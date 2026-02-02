import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRealizationsData } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await getRealizationsData();
  return NextResponse.json(data);
}
