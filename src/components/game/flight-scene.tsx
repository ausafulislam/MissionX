"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Design, Simulation } from "@/game/types";
import { telemetry } from "@/game/engine/telemetry";
import { getRocket } from "@/game/data/catalog";
import { FlightStatus } from "./flight-status";
import { Destination } from "./destination";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function FlightScene({
  design,
  result,
  time,
}: {
  design: Design;
  result: Simulation;
  time: number;
}) {
  const scope = useRef<HTMLDivElement>(null),
    t = telemetry(design, result, time),
    failed = result.events.some((e) => e.kind === "failure" && e.at <= time),
    deployed = time >= 13 && !failed;
  const move = useRef<
    | ((
        y: number,
        stageY: number,
        stageRotation: number,
        stageOpacity: number,
      ) => void)
    | null
  >(null);
  useGSAP(
    () => {
      if (deployed) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const rocketY = gsap.quickTo(".launch-rocket", "y", {
            duration: 0.16,
            ease: "none",
          }),
          stageY = gsap.quickTo(".separating-stage", "y", {
            duration: 0.2,
            ease: "none",
          }),
          stageR = gsap.quickTo(".separating-stage", "rotation", {
            duration: 0.2,
            ease: "none",
          }),
          stageO = gsap.quickTo(".separating-stage", "opacity", {
            duration: 0.2,
            ease: "none",
          });
        move.current = (y, sy, sr, so) => {
          rocketY(y);
          stageY(sy);
          stageR(sr);
          stageO(so);
        };
        return () => {
          move.current = null;
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [deployed], revertOnUpdate: true },
  );
  useEffect(() => {
    move.current?.(
      time < 3 ? 0 : -Math.min(230, (time - 3) * 24),
      time >= 8 ? 90 : 0,
      time >= 8 ? 20 : 0,
      time >= 11 ? 0 : 1,
    );
  }, [time]);
  const reduced = useReducedMotion();
  const angle = reduced ? 0 : time * 0.16;
  return (
    <div
      className={`flight-scene ${deployed ? "in-orbit" : ""} ${failed ? "flight-failed" : ""}`}
      ref={scope}
    >
      <div className="flight-stars" />
      <FlightStatus result={result} time={time} />
      {deployed ? (
        <>
          <Destination id={design.missionId} className="flight-planet" />
          <svg
            className="orbit-diagram"
            viewBox="0 0 700 430"
            role="img"
            aria-label={`${t.fleet} spacecraft in ${t.orbit}`}
          >
            <ellipse
              cx="350"
              cy="220"
              rx="255"
              ry="100"
              fill="none"
              stroke="#c7d3e366"
              strokeDasharray="5 7"
              transform="rotate(-17 350 220)"
            />
            {Array.from({ length: t.fleet }, (_, i) => {
              const a = angle + (i * Math.PI) / 2,
                x = 350 + Math.cos(a) * 255,
                y = 220 + Math.sin(a) * 100;
              return (
                <g key={i} transform={`translate(${x} ${y}) rotate(-17)`}>
                  <rect
                    x="-20"
                    y="-5"
                    width="14"
                    height="10"
                    fill="#477ca6"
                    stroke="#a4bccd"
                  />
                  <rect
                    x="6"
                    y="-5"
                    width="14"
                    height="10"
                    fill="#477ca6"
                    stroke="#a4bccd"
                  />
                  <rect x="-5" y="-8" width="10" height="16" fill="#e7b26c" />
                  <circle r="25" fill="none" stroke="#ff6a2b66" />
                </g>
              );
            })}
          </svg>
        </>
      ) : (
        <>
          <div className="earth-atmosphere" />
          <svg
            className="rocket-diagram"
            viewBox="0 0 700 500"
            role="img"
            aria-label={
              failed
                ? "Launch vehicle lost"
                : `${getRocket(design.rocketId).name} ${time < 3 ? "on launch pad" : "ascending"}`
            }
          >
            <g
              className="launch-tower"
              stroke="#45566d"
              strokeWidth="3"
              fill="none"
            >
              <path d="M225 445V245H249V445M225 275L249 300L225 325L249 350L225 375L249 400M200 445H500" />
              <path d="M249 275H325" />
            </g>
            <g className="launch-rocket" opacity={failed ? 0.15 : 1}>
              <g className="separating-stage">
                <path d="M329 350H371V427H329Z" fill="#c2c7cb" />
                <path
                  d="M329 398L314 425V439L337 427M371 398L386 425V439L363 427"
                  fill="#5f7188"
                />
                {time >= 2 && time < 8 && !failed && (
                  <path d="M336 427Q350 480 364 427" fill="#ff6a2b" />
                )}
              </g>
              <path
                d="M329 350V277Q330 250 350 231Q370 250 371 277V350Z"
                fill="#d8dce0"
                stroke="#8191a6"
              />
              <path d="M330 290H370V305H330Z" fill="#ff6a2b" />
              <path d="M345 260H355V280H345Z" fill="#364c68" />
            </g>
          </svg>
        </>
      )}
      <div className="flight-view-top">
        <span className="eyebrow">
          {deployed ? time<=18 ? "JOURNEY / COMMISSIONING" : "ORBITAL OPERATIONS" : "LAUNCH CAMERA"} /{" "}
          {design.missionId.toUpperCase()}
        </span>
        <span className="technical">
          T{" "}
          {time < 3
            ? `−${Math.ceil(10*(1-time/3))
                .toString()
                .padStart(2, "0")}`
            : `+${Math.floor(time - 3)
                .toString()
                .padStart(2, "0")}`}
          s
        </span>
      </div>
      <div className="flight-view-bottom">
        <span className="technical">
          {deployed
            ? t.orbit.toUpperCase()
            : getRocket(design.rocketId).name.toUpperCase()}
        </span>
        <span className={`flight-phase ${failed ? "status-fail" : ""}`}>
          {t.phase?.label.toUpperCase()}
        </span>
      </div>
      {time < 3 && (
        <div className="countdown-number">{Math.ceil(10*(1-time/3))}</div>
      )}
      {failed && (
        <div className="failure-overlay">
          <span>×</span>
          <h2>SIGNAL LOST.</h2>
          <p>The mission report explains what happened.</p>
        </div>
      )}
    </div>
  );
}
