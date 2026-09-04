import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcavallaro.site"),
  title: "Matt Cavallaro, built for Datadog's ANZ higher-ed book",
  description:
    "Enterprise AE who unlocked a $25M untouched market from zero, and spent his last two years at Salesforce moving that discipline into Tier-1 universities, TAFE, and public sector. Pitch site for Datadog's Strategic Account Executive, Higher Education role.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
