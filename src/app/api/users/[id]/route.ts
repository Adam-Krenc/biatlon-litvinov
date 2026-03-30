import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageUsers } from "@/lib/permissions";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();

  if (!canManageUsers(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  if (session?.user?.id === id) {
    return NextResponse.json({ error: "Nemůžeš smazat sám sebe" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
