// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { DebriefScreen } from "@/components/game/debrief-screen";
export default function Debrief() {
  return <DebriefScreen />;
}
