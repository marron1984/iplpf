import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "国際P-LP財団 | 平和を愛する人を増やす",
  description:
    "国際P-LP財団（IPLPF）は、国連活動支援、平和推進、調査研究、支援活動を通じて世界の平和構築に貢献しています。",
  openGraph: {
    title: "国際P-LP財団 | 平和を愛する人を増やす",
    description:
      "国連活動支援、平和推進、調査研究、支援活動を通じて世界の平和構築に貢献しています。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
