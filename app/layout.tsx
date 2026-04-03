import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Max Cavalera® | Luxury Men's Fashion",
  description:
    "Lüks erkek takım elbiseleri, smokinler ve aksesuarlar. Kemalpaşa Mahallesi, Fatih / İstanbul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>
        <Preloader />
        <Nav />
        {children}
      </body>
    </html>
  );
}
