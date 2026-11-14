// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import type { Metadata } from "next";
import { GameShell } from "@/components/game/game-shell";
import "./game.css";
export const metadata: Metadata = {
  title: "Flight Deck | MissionX",
  description: "Design, verify and fly your own educational space mission.",
};
export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameShell>{children}</GameShell>;
}
