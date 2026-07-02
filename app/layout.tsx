import type { Metadata } from "next";
import { Jost, Cormorant_Garamond, Italiana } from "next/font/google";
import "./globals.css";

const jost = Jost({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
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
      <body
        className={`${jost.variable} ${cormorant.variable} ${italiana.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
