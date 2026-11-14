"use client";
import Image from "next/image";
import { useState } from "react";
export function Logo() {
  return (
    <Image
      className="brand-logo"
      src="/images/logo.png"
      alt="MissionX"
      width={1568}
      height={512}
      priority
    />
  );
}
const links = [
  ["EXPLORE", "#explore"],
  ["MISSIONS", "#missions"],
  ["HOW IT WORKS", "#how-it-works"],
  ["ABOUT", "#about"],
];
export function SiteHeader({ onStart }: { onStart: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#top" aria-label="MissionX home">
        <Logo />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <button className="nav-start" onClick={onStart}>
        START MISSION <span>↗</span>
      </button>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? "CLOSE −" : "MENU +"}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <span>↗</span>
            </a>
          ))}
          <button
            className="button"
            onClick={() => {
              setOpen(false);
              onStart();
            }}
          >
            START MISSION ↗
          </button>
        </nav>
      )}
    </header>
  );
}
