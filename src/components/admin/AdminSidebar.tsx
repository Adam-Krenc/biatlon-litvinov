"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
  isAdmin: boolean;
}

const links = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/prispevky", label: "Příspěvky", icon: "✍" },
  { href: "/admin/stranky", label: "Stránky", icon: "📄", adminOnly: true },
  { href: "/admin/galerie", label: "Galerie", icon: "🖼", adminOnly: true },
  { href: "/admin/uzivatele", label: "Uživatelé", icon: "👥", adminOnly: true },
  { href: "/admin/nastaveni", label: "Nastavení", icon: "⚙" },
];

export default function AdminSidebar({ isAdmin }: Props) {
  const pathname = usePathname();

  const visibleLinks = links.filter((l) => !l.adminOnly || isAdmin);

  return (
    <aside className="w-56 bg-[#1a3a6b] min-h-screen flex flex-col">
      <div className="p-4 border-b border-white/20">
        <Link href="/" className="text-[#e8c547] font-bold text-sm">
          ← Na web
        </Link>
        <div className="text-white font-bold mt-2">Admin panel</div>
      </div>
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {visibleLinks.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                    active
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-3 border-t border-white/20">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-white/70 text-sm hover:text-white py-2 text-left px-3"
        >
          Odhlásit se
        </button>
      </div>
    </aside>
  );
}
