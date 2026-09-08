import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yannick@valencia:~",
  description:
    "Yannick Aaron Lehr. Cofounder of EMPA Spain, building KIVO. Data scientist turned full stack builder, Valencia.",
  metadataBase: new URL("https://yannickaaron.com"),
  openGraph: {
    title: "Yannick Aaron Lehr",
    description: "Cofounder EMPA Spain · building KIVO · Valencia",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
