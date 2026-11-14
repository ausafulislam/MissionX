"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAudioSystems } from "@/components/hq/use-hq-systems";
import { useCommander } from "@/game/store/commander-store";
import { missionAudio } from "@/game/audio/audio-manager";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function Motion({ children }: { children: ReactNode }) {
  useAudioSystems();
  useEffect(() => {
    useCommander.getState().hydrate();
    missionAudio.scene("landing");
  }, []);
  const preferences = useCommander((s) => s.preferences);
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const lenis = new Lenis({ duration: 1.1, anchors: true });
        const update = () => ScrollTrigger.update();
        lenis.on("scroll", update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".site-header", { y: -12, autoAlpha: 0, duration: 0.8 })
          .from(".hero-eyebrow", { y: 14, autoAlpha: 0, duration: 0.7 }, "-=.4")
          .from(
            ".hero-line > span",
            { yPercent: 110, duration: 1, stagger: 0.12 },
            "-=.5",
          )
          .from(
            ".hero-description, .hero-actions",
            { y: 18, autoAlpha: 0, stagger: 0.12, duration: 0.8 },
            "-=.6",
          )
          .from(".hero-image", { scale: 1.07, x: 35, duration: 1.8 }, 0);
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".meter-fill").forEach((el) =>
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
        const desktop = gsap.matchMedia();
        desktop.add("(min-width: 900px)", () => {
          gsap.to(".hero-image", {
            y: 90,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.to(".final-image", {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-cta",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
        return () => {
          desktop.revert();
          gsap.ticker.remove(tick);
          lenis.off("scroll", update);
          lenis.destroy();
        };
      });
      return () => media.revert();
    },
    { scope },
  );
  return (
    <div
      ref={scope}
      onPointerOver={(e) => {
        if ((e.target as HTMLElement).closest("button:not(:disabled),a"))
          missionAudio.play("hover");
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button:not(:disabled),a"))
          missionAudio.play("click");
      }}
    >
      {children}
      <button
        className="landing-audio-toggle"
        aria-label={preferences.muted ? "Unmute audio" : "Mute audio"}
        onClick={() => {
          void missionAudio.unlock();
          useCommander.getState().update({ muted: !preferences.muted });
        }}
      >
        {preferences.muted ? "♪ SOUND OFF" : "♪ SOUND ON"}
      </button>
    </div>
  );
}
