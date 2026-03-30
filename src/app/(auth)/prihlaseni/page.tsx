import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/prihlaseni?error=1");
    }
    throw error; // Next.js redirect se musí re-throw
  }
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1a3a6b] rounded-full flex items-center justify-center text-[#e8c547] font-bold text-xl mx-auto mb-3">
            KBL
          </div>
          <h1 className="text-xl font-bold text-[#1a3a6b]">Přihlásit se</h1>
          <p className="text-gray-500 text-sm">Klub biatlonu Litvínov</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
              placeholder="vas@email.cz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heslo
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded p-2">
              Nesprávný email nebo heslo.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1a3a6b] text-white py-2 rounded-md font-medium text-sm hover:bg-[#0f2448] transition-colors"
          >
            Přihlásit se
          </button>
        </form>
      </div>
    </div>
  );
}
