"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCommander } from "@/game/store/commander-store";
export function AnimatedScore({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null),
    os = useReducedMotion(),
    reduced = useCommander((s) => s.preferences.reducedMotion);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const model = { value: 0 };
    if (os || reduced) {
      el.textContent = String(value);
      return;
    }
    const animation = gsap.to(model, {
      value,
      duration: 1.5,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = String(Math.round(model.value));
      },
    });
    return () => {
      animation.kill();
    };
  }, [value, os, reduced]);
  return (
    <span className="animated-score" aria-label={`${value} points`} ref={ref}>
      {value}
    </span>
  );
}
