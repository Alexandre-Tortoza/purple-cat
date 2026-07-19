import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { PlayBar } from "@/widgets/PlayBar";
import { Menu } from "@/widgets/Menu";
import { Cursor } from "@/widgets/Cursor";
import { ScrollNavigator } from "@/shared/ui/ScrollNavigator";
import { SITE } from "@/shared/config/site";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Listening Bar e Loja de Discos em Curitiba`,
    template: `%s | ${SITE.name}`,
  },
  description: 'Conheça o Purple Cat, listening bar e loja de discos no Centro de Curitiba. Confira agenda, horários, cardápio, novidades em vinil e como chegar.',
  keywords: [
    'listening bar Curitiba',
    'loja de discos Curitiba',
    'discos de vinil Curitiba',
    'Purple Cat Curitiba',
    'eventos musicais Curitiba',
    'audição de vinil Curitiba',
    'agenda cultural Curitiba',
    'bar Centro Curitiba',
    'curadoria musical Curitiba',
  ],
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} | Listening Bar e Loja de Discos em Curitiba`,
    description: 'Conheça o Purple Cat, listening bar e loja de discos no Centro de Curitiba. Confira agenda, horários, cardápio, novidades em vinil e como chegar.',
    url: SITE.url,
    siteName: SITE.fullName,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Purple Cat — Listening Bar e Loja de Discos em Curitiba',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Listening Bar e Loja de Discos em Curitiba`,
    description: 'Conheça o Purple Cat, listening bar e loja de discos no Centro de Curitiba.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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
          <ScrollNavigator />
          <Menu />
          <main className="flex-1">{children}</main>
          <Footer />
          <PlayBar />
        </Providers>
      </body>
    </html>
  );
}
