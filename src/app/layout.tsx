import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Klub biatlonu Litvínov",
    template: "%s | Klub biatlonu Litvínov",
  },
  description:
    "Oficiální web Klubu biatlonu Litvínov z.s. – aktuality, tréninky, výsledky.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Klub biatlonu Litvínov",
    title: "Klub biatlonu Litvínov",
    description:
      "Oficiální web Klubu biatlonu Litvínov z.s. – aktuality, tréninky, výsledky.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
