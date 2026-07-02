import type { Metadata } from "next";
import { Aboreto, Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";

const aboreto = Aboreto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const notoSerif = Noto_Serif_Georgian({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Astu Neon — An Ecosystem for Resilience and Innovation",
  description:
    "Astu Neon is an ecosystem for resilience and innovation, prompting our clients to dream bigger.",
  metadataBase: new URL("https://astuneon.co"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${aboreto.variable} ${notoSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
