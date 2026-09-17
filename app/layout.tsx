import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { brand } from "@/content/brand";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — Event Planning Studio`,
    template: `%s — ${brand.name}`,
  },
  description: brand.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
