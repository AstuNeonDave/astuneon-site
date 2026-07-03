import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V18 — "Emisfero": v7's constellation, given a place to hang. The stars
   crown the night sky above a hand-drawn silhouette of the white city —
   Ostuni on its hill — with the manifesto standing at the horizon. */

function domePos(i: number, n: number) {
  const deg = 180 - (i * 180) / Math.max(n - 1, 1);
  const a = (deg * Math.PI) / 180;
  const rx = i % 2 === 0 ? 40 : 30;
  const ry = i % 2 === 0 ? 52 : 38;
  return { x: 50 + rx * Math.cos(a), y: 78 - ry * Math.sin(a) };
}

export default function Emisfero() {
  const n = BRANCHES.length;
  const arc = BRANCHES.map((_, i) => {
    const p = domePos(i, n);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <main className={s.page}>
      <div className={s.milkyWay} aria-hidden="true" />
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={18} />
      </header>

      <section className={s.dome}>
        <svg
          className={s.figure}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            points={arc}
            stroke="currentColor"
            strokeWidth="0.08"
            fill="none"
          />
        </svg>

        {BRANCHES.map((b, i) => {
          const p = domePos(i, n);
          return (
            <a
              key={b.domain}
              className={s.star}
              href={b.href}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className={s.dot} aria-hidden="true" />
              <span className={s.starLabel}>
                <strong>{b.domain}</strong>
                <em>
                  {b.label}
                  {b.note ? ` · ${b.note}` : ""}
                </em>
              </span>
            </a>
          );
        })}

        <div className={s.horizonText}>
          <h1 className={s.question}>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
        </div>

        {/* Ostuni on its hill — hand-drawn line silhouette */}
        <svg
          className={s.city}
          viewBox="0 0 1000 110"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M0,108 L120,108 L138,84 L152,84 L152,66 L166,66 L166,84 L204,84 L204,58 L232,58 L232,84 L262,84 L262,44 L276,36 L290,44 L290,84 L330,84 L330,62 L360,62 L360,84 L400,84 L400,50 L414,50 L414,30 L420,22 L426,30 L426,50 L448,50 L448,84 L488,84 L488,40 A22,22 0 0 1 532,40 L532,84 L570,84 L570,56 L600,56 L600,84 L640,84 L640,64 L672,64 L672,84 L712,84 L712,46 L726,38 L740,46 L740,84 L790,84 L790,66 L820,66 L820,84 L858,84 L858,70 L884,70 L884,108 L1000,108"
            strokeWidth="1.6"
            opacity="0.75"
          />
          <path
            d="M120,108 Q500,96 884,108"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </section>

      <section className={s.below}>
        <p>
          At Astu Neon, we don’t shy away from these challenges, we answer
          them. Opening doors, stepping into a boundless universe. An
          invitation to connection, the exchange of ideas, and a dynamic life.
          Because dreaming belongs to everyone. It is a catalyst for belonging,
          giving us a seat at our table where we remember our most naive,
          uninhibited dreams: to reach the moon, to create new things, to heal.
        </p>
        <p className={s.coda}>
          Challenging the impossible. Building it with our own hands.
        </p>
      </section>

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
      </footer>
    </main>
  );
}
