import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={jost.variable}>{children}</body>
    </html>
  );
}
