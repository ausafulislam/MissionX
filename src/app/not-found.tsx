import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ padding: "100px 24px", maxWidth: 800, margin: "auto" }}>
      <span className="eyebrow">404 / UNCHARTED TERRITORY</span>
      <h1 style={{ fontSize: "clamp(60px,12vw,100px)", margin: "28px 0" }}>
        OFF THE
        <br />
        <em>FLIGHT PATH.</em>
      </h1>
      <p style={{ marginBottom: 30 }}>
        This destination does not exist. Your next mission is still waiting.
      </p>
      <Link className="button" href="/play">
        RETURN TO MISSION CONTROL ↗
      </Link>
    </main>
  );
}
