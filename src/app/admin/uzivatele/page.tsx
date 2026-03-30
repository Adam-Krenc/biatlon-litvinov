import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";

export default async function UzivatelePage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a3a6b]">Uživatelé</h1>
        <Link
          href="/admin/uzivatele/novy"
          className="bg-[#1a3a6b] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0f2448]"
        >
          + Přidat studenta
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Jméno</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Přidán</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === "ADMIN" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                    {user.role === "ADMIN" ? "Admin" : "Student"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  {user.role !== "ADMIN" && (
                    <DeleteUserButton userId={user.id} userName={user.name} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
