// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { LaunchScreen } from "@/components/game/launch-screen";
export default function Launch() {
  return <LaunchScreen />;
}
