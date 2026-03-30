"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Navigation from "./Navigation";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-[#1a3a6b] shadow-md relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#e8c547] rounded-full flex items-center justify-center font-bold text-[#1a3a6b] text-sm">
              KBL
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">
                Klub biatlonu
              </div>
              <div className="text-[#e8c547] font-bold text-sm leading-tight">
                Litvínov
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="text-[#e8c547] text-sm font-medium hover:text-white transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  Odhlásit
                </button>
              </div>
            ) : (
              <Link
                href="/prihlaseni"
                className="bg-[#e8c547] text-[#1a3a6b] px-4 py-1.5 rounded text-sm font-semibold hover:bg-yellow-400 transition-colors"
              >
                Přihlásit
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
