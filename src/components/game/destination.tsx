import Image from "next/image";
import type { MissionId } from "@/game/types";
export function Destination({
  id,
  className = "",
}: {
  id: MissionId;
  className?: string;
}) {
  return (
    <div className={`game-destination destination-${id} ${className}`}>
      {id === "moon" ? (
        <Image
          src="/images/lunar-mission.png"
          alt="Lunar terrain seen from orbit"
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
          priority
        />
      ) : id === "mars" ? (
        <div
          className="planet-scene mars-scene"
          role="img"
          aria-label="Mars in deep space"
        >
          <div className="planet" />
          <div className="planet-orbit" />
        </div>
      ) : (
        <div
          className="planet-scene sun-scene"
          role="img"
          aria-label="The Sun and its corona"
        >
          <div className="planet" />
          <div className="planet-orbit" />
        </div>
      )}
      <div className="destination-vignette" />
      <span className="viewport-corner top-left">+</span>
      <span className="viewport-corner bottom-right">+</span>
    </div>
  );
}
