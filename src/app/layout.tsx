import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { PlayBar } from "@/widgets/PlayBar";
import { Menu } from "@/widgets/Menu";
import { Cursor } from "@/widgets/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purple Cat | Listening Bar & Records em Curitiba",
  description: "Música, drinks, cozinha e discos de vinil em Curitiba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body className="flex min-h-dvh flex-col bg-[#090710] font-sans text-zinc-100 antialiased">
        <Providers>
          <Cursor />
          <Header />
          <Menu />
          <main className="flex-1">{children}</main>
          <Footer />
          <PlayBar />
        </Providers>
      </body>
    </html>
  );
}
