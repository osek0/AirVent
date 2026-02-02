import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTestimonialsData } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await getTestimonialsData();
  return NextResponse.json(data);
}
