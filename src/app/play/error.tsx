"use client";
import Link from "next/link";
export default function PlayError({ reset }: { reset: () => void }) {
  return (
    <section className="game-screen game-empty">
      <span className="eyebrow">FLIGHT DECK INTERRUPTED</span>
      <h2>
        LET’S GET YOU
        <br />
        <em>BACK ON COURSE.</em>
      </h2>
      <p>
        The workspace could not load. Try again or return to mission selection.
        Your browser’s saved progress is kept.
      </p>
      <div className="game-button-group">
        <button className="button" onClick={reset}>
          TRY AGAIN ↗
        </button>
        <Link className="game-secondary" href="/play/goal">
          MISSION SELECT
        </Link>
      </div>
    </section>
  );
}
