"use client";
import { useEffect } from "react";
export function FocusGuard({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const modals = document.querySelectorAll<HTMLElement>(
        ".hq-modal,.identity-card",
      );
      const modal = modals[modals.length - 1];
      if (!modal) return;
      const items = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not(:disabled),a[href],input,select,[tabindex="0"]',
        ),
      ).filter((el) => el.getClientRects().length);
      const first = items[0],
        last = items.at(-1);
      if (!first) return;
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !modal.contains(document.activeElement))
      ) {
        e.preventDefault();
        last?.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !modal.contains(document.activeElement))
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      if (previous?.isConnected) previous.focus();
    };
  }, [active]);
  return null;
}
