import { Logo } from "./site-header";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#top" aria-label="MissionX home">
            <Logo />
          </a>
          <p>
            A universe of possibilities.
            <br />
            An engineer in everyone.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">EXPLORE</span>
          <a href="#explore">The universe</a>
          <a href="#missions">Our missions</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div className="footer-links">
          <span className="eyebrow">THE PROJECT</span>
          <a href="#about">About MissionX</a>
          <a
            href="https://github.com/ausafulislam/MissionX"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <span className="footer-event">Space Apps Challenge 2026</span>
        </div>
        <a href="#top" className="back-top" aria-label="Back to top">
          ↑
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          BUILT BY <strong>TEAM NASA WARRIORS</strong>
        </span>
        <span>Not affiliated with or endorsed by NASA.</span>
        <span>© 2026 MISSIONX</span>
      </div>
    </footer>
  );
}
