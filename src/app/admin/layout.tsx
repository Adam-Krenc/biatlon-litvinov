import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/prihlaseni");

  const admin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isAdmin={admin} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
