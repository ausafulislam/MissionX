// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { VerifyScreen } from "@/components/game/verify-screen";
export default function Verify() {
  return <VerifyScreen />;
}
