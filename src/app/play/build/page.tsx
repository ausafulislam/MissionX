// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { BuildScreen } from "@/components/game/build-screen";
export default function Build() {
  return <BuildScreen />;
}
