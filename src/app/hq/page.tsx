export const instant = false;
import type { Metadata } from "next";
import { HQExperience } from "@/components/hq/hq-experience";
import "./hq.css";
export const metadata: Metadata = {
  title: "Headquarters | MissionX",
  description:
    "Enter an interactive orbital headquarters. Design, verify and fly a space mission.",
};
export default function HeadquartersPage() {
  return <HQExperience />;
}
