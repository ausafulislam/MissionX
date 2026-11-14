"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main style={{ padding: "100px 24px", maxWidth: 800, margin: "auto" }}>
      <span className="eyebrow">MISSION CONTROL / CONNECTION INTERRUPTED</span>
      <h1 style={{ fontSize: 72, margin: "28px 0" }}>
        BACK ON
        <br />
        <em>COURSE.</em>
      </h1>
      <p style={{ marginBottom: 30 }}>
        Something prevented this view from loading. Your local mission progress
        is kept.
      </p>
      <button className="button" onClick={reset}>
        TRY AGAIN ↗
      </button>
      <Link className="text-link" href="/">
        RETURN TO EARTH
      </Link>
    </main>
  );
}
