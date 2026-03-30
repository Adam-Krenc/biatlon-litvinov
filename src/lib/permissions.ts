import { Session } from "next-auth";

export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === "ADMIN";
}

export function canEditPost(
  session: Session | null,
  authorId: string
): boolean {
  if (!session?.user) return false;
  if (isAdmin(session)) return true;
  return session.user.id === authorId;
}

export function canDeletePost(
  session: Session | null,
  authorId: string
): boolean {
  return canEditPost(session, authorId);
}

export function canManageGallery(session: Session | null): boolean {
  return isAdmin(session);
}

export function canManageUsers(session: Session | null): boolean {
  return isAdmin(session);
}

export function canEditStaticPages(session: Session | null): boolean {
  return isAdmin(session);
}
