// Game routes wait for validated browser-local progress before rendering.
export const instant = false;
import { GoalScreen } from "@/components/game/goal-screen";
export default function Goal() {
  return <GoalScreen />;
}
