import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/permissions";

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });

  const { id } = await params;
  const data = await req.json();
  const sponsor = await prisma.sponsor.update({ where: { id }, data });
  return NextResponse.json(sponsor);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });

  const { id } = await params;
  await prisma.sponsor.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
