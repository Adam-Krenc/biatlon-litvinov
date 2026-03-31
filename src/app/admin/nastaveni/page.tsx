import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

async function changePassword(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user?.id) redirect("/prihlaseni");

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    redirect("/admin/nastaveni?error=mismatch");
  }
  if (newPassword.length < 8) {
    redirect("/admin/nastaveni?error=short");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/prihlaseni");

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    redirect("/admin/nastaveni?error=wrong");
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  redirect("/admin/nastaveni?success=1");
}

const errorMessages: Record<string, string> = {
  wrong: "Stávající heslo není správné.",
  mismatch: "Nová hesla se neshodují.",
  short: "Nové heslo musí mít alespoň 8 znaků.",
};

interface Props {
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function NastaveniPage({ searchParams }: Props) {
  const { error, success } = await searchParams;

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nastavení</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Změnit heslo</h2>

        {success && (
          <p className="text-green-700 bg-green-50 rounded p-3 mb-4 text-sm">
            Heslo bylo úspěšně změněno.
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-50 rounded p-3 mb-4 text-sm">
            {errorMessages[error] ?? "Nastala chyba."}
          </p>
        )}

        <form action={changePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stávající heslo
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nové heslo
            </label>
            <input
              type="password"
              name="newPassword"
              required
              minLength={8}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nové heslo znovu
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a3a6b] text-white py-2 rounded-md font-medium text-sm hover:bg-[#0f2448] transition-colors"
          >
            Změnit heslo
          </button>
        </form>
      </div>
    </div>
  );
}
