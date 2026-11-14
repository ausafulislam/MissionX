import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MissionX | Design a space mission",
  description:
    "An interactive game where students design, launch and run a complete space mission, balancing budget, mass, power and data, then learn why it succeeded or failed.",
  applicationName: "MissionX",
  authors: [{ name: "Team NASA WARRIORS" }],
  keywords: [
    "space mission design",
    "space game",
    "education",
    "NASA Space Apps",
    "STEM",
  ],
  openGraph: {
    title: "MissionX | Design a space mission",
    description:
      "An interactive game where students design, launch and run a complete space mission, balancing budget, mass, power and data, then learn why it succeeded or failed.",
    siteName: "MissionX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MissionX | Design a space mission",
    description:
      "An interactive game where students design, launch and run a complete space mission, balancing budget, mass, power and data, then learn why it succeeded or failed.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0A0A0C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
