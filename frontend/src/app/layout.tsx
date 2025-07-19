import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Design & Branding Assistant - Create Logos, Slogans & Brand Identity",
  description: "Generate professional logos, slogans, color palettes, and complete brand identities with AI. Perfect for startups, businesses, and entrepreneurs.",
  keywords: "AI logo generator, brand identity, slogan generator, color palette, business branding, design tools",
  authors: [{ name: "AI Design Assistant" }],
  openGraph: {
    title: "AI Design & Branding Assistant",
    description: "Create professional logos, slogans, and brand identities with AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Design & Branding Assistant",
    description: "Create professional logos, slogans, and brand identities with AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
