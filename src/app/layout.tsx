import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChangeSpan",
  description:
    "ChangeSpan is an offline-first desktop project controls platform with a connected review portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
