import { useId } from "react";
import { getMission, PARTS } from "@/game/data/catalog";
import type { Design } from "@/game/types";
export function Spacecraft({ design }: { design: Design }) {
  const metalId = useId(),
    cellsId = useId();
  const has = (category: string) =>
      design.partIds.some(
        (id) => PARTS.find((p) => p.id === id)?.category === category,
      ),
    m = getMission(design.missionId);
  return (
    <div className="craft-viewport">
      <div className="craft-grid" />
      <span className="technical craft-top-label">
        CONFIGURATION / {design.partIds.length} COMPONENTS
        {m.fleet === 4 ? " × 4 SATELLITES" : ""}
      </span>
      <svg
        viewBox="0 0 500 330"
        role="img"
        aria-label={`Spacecraft schematic with ${design.partIds.length} installed components per satellite`}
      >
        <defs>
          <linearGradient id={metalId} x2="1" y2="1">
            <stop stopColor="#c3b38c" />
            <stop offset=".4" stopColor="#726348" />
            <stop offset=".6" stopColor="#bba878" />
            <stop offset="1" stopColor="#423b30" />
          </linearGradient>
          <pattern
            id={cellsId}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <rect width="18" height="18" fill="#17304e" />
            <path
              d="M0 0H18V18H0Z"
              fill="none"
              stroke="#65849e"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <ellipse
          cx="250"
          cy="170"
          rx="205"
          ry="110"
          fill="none"
          stroke="#334258"
          strokeDasharray="3 8"
        />
        <path d="M250 35V300M30 170H470" stroke="#263245" strokeWidth=".5" />
        {has("power") && (
          <g className="craft-solar">
            <path
              d="M88 155H200M300 155H414"
              stroke="#929eb0"
              strokeWidth="5"
            />
            <path
              d="M40 110H190V225H40ZM310 110H460V225H310Z"
              fill={`url(#${cellsId})`}
              stroke="#99a5b6"
              strokeWidth="2"
            />
          </g>
        )}
        {has("structure") ? (
          <g>
            <path
              d="M203 123L248 99L294 122V221L248 245L203 219Z"
              fill={`url(#${metalId})`}
              stroke="#d9c28a"
            />
            <path
              d="M248 100V244M204 122L248 146L293 123M248 146V244"
              fill="none"
              stroke="#ead5a277"
            />
            <rect x="218" y="158" width="16" height="42" fill="#463d2f" />
          </g>
        ) : (
          <path
            d="M203 123L248 99L294 122V221L248 245L203 219Z"
            fill="#111b2a"
            stroke="#607089"
            strokeDasharray="4 5"
          />
        )}
        {has("communications") && (
          <g>
            <path d="M255 103L264 61" stroke="#aebed0" strokeWidth="4" />
            <path d="M229 61Q265 101 301 61Z" fill="#b9c3c9" stroke="#eff3f3" />
            <path d="M264 76V45" stroke="#e8e8dc" strokeWidth="2" />
          </g>
        )}
        {has("camera") && (
          <g>
            <path d="M267 190H304V218H267Z" fill="#65758b" stroke="#bbc8d8" />
            <ellipse
              cx="305"
              cy="204"
              rx="9"
              ry="14"
              fill="#0d2c42"
              stroke="#7aa3bf"
            />
          </g>
        )}
        {has("science") && (
          <g>
            <path
              d="M208 140L175 90M175 90L159 83"
              stroke="#c4ced7"
              strokeWidth="3"
            />
            <circle cx="159" cy="83" r="6" fill="#ff6a2b" />
          </g>
        )}
        {has("attitude") && (
          <g fill="#596777" stroke="#bcc5d0">
            <path d="M210 215L199 232H222Z" />
            <path d="M277 222L286 238H266Z" />
          </g>
        )}
        <text
          x="250"
          y="310"
          textAnchor="middle"
          fill="#738297"
          fontSize="8"
          letterSpacing="2"
        >
          {has("structure")
            ? "SPACECRAFT ASSEMBLY / SCHEMATIC"
            : "INSTALL A STRUCTURE TO BEGIN"}
        </text>
      </svg>
      <span className="viewport-corner top-left">+</span>
      <span className="viewport-corner bottom-right">+</span>
    </div>
  );
}
