import type { Metadata } from "next";
import SiteHeader from "@/components/site/header";
import Footer from "@/components/site/footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "ChangeSpan",
  description:
    "ChangeSpan is an offline-first desktop project controls platform with a connected review portal.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}
