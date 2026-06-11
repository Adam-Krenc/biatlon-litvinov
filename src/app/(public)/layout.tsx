import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SponsorsBand from "@/components/layout/SponsorsBand";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <SponsorsBand />
      <Footer />
    </>
  );
}
