import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "寄付する | PLP財団",
  description:
    "PLP財団への寄付ページです。国連活動支援、平和推進、調査研究、支援活動を継続するためのご支援をお願いいたします。",
  openGraph: {
    title: "寄付する | PLP財団",
    description:
      "PLP財団への寄付ページです。国連活動支援、平和推進、調査研究、支援活動を継続するためのご支援をお願いいたします。",
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
