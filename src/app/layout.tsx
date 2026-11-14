import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../../public/fonts/barlow-600.ttf", weight: "600" },
    { path: "../../public/fonts/barlow-700.ttf", weight: "700" },
    { path: "../../public/fonts/barlow.ttf", weight: "800" },
    { path: "../../public/fonts/barlow-900.ttf", weight: "900" },
  ],
  variable: "--font-display",
  display: "swap",
});
const space = localFont({
  src: "../../public/fonts/space.ttf",
  variable: "--font-heading",
  weight: "400 700",
  display: "swap",
});
const inter = localFont({
  src: "../../public/fonts/inter.ttf",
  variable: "--font-body",
  weight: "400 600",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../../public/fonts/mono.ttf", weight: "400" },
    { path: "../../public/fonts/mono-500.ttf", weight: "500" },
  ],
  variable: "--font-mono",
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
  themeColor: "#080A0F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${space.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
