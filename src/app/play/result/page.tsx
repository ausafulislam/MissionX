// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { ResultScreen } from "@/components/game/result-screen";
export default function Result() {
  return <ResultScreen />;
}
