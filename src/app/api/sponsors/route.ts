import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/permissions";

export async function GET() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sponsors);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });

  const { name, website, logoUrl, order } = await req.json();
  if (!name || !logoUrl) return NextResponse.json({ error: "Chybí povinná pole" }, { status: 400 });

  const sponsor = await prisma.sponsor.create({
    data: { name, website: website || null, logoUrl, order: order ?? 0 },
  });
  return NextResponse.json(sponsor, { status: 201 });
}
