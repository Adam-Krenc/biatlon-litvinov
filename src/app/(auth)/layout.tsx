import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <div className="p-4">
        <Link href="/" className="text-[#1a3a6b] text-sm hover:underline">
          ← Zpět na web
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
