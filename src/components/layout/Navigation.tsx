"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Aktuality" },
  { href: "/klub", label: "Klub" },
  { href: "/treninky", label: "Tréninky" },
  { href: "/pro-zajemce", label: "Pro zájemce" },
  { href: "/podporuji-nas", label: "Podporují nás" },
  { href: "/fotogalerie", label: "Fotogalerie" },
  { href: "/nase-uspechy", label: "Naše úspěchy" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav>
      {/* Desktop */}
      <ul className="hidden md:flex gap-1">
        {navLinks.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1a3a6b] shadow-lg md:hidden z-50">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
