import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V20 — "Alba delle Stelle": the synthesis of v11 and v17. A full
   twinkling star field; the constellation draws itself when you arrive;
   the stars then beckon — glowing brighter one at a time, inviting the
   hand; meteors cross; and the whole night resolves into dawn. */

const CX = 50;
const CY = 47;
const BEACON = 1.4; /* seconds between each star's beckoning pulse */

function starPos(i: number, n: number) {
  const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const rx = i % 2 === 0 ? 36 : 27;
  const ry = i % 2 === 0 ? 38 : 29;
  return { x: CX + rx * Math.cos(angle), y: CY + ry * Math.sin(angle) };
}

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function starField(seed: number, count: number, alpha: number) {
  const rnd = seeded(seed);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(
      `${(rnd() * 100).toFixed(2)}vw ${(rnd() * 100).toFixed(
        2
      )}vh 0 rgba(244,234,208,${alpha})`
    );
  }
  return out.join(",");
}

export default function AlbaDelleStelle() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(7, 110, 0.5) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(23, 45, 0.85) }}
        aria-hidden="true"
      />
      <div className={s.meteorA} aria-hidden="true" />
      <div className={s.meteorB} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={20} />
      </header>

      <section className={s.sky}>
        <svg
          className={s.lines}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {BRANCHES.map((b, i) => {
            const p = starPos(i, n);
            return (
              <line
                key={b.domain}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                pathLength={1}
                className={s.thread}
                style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                stroke="currentColor"
                strokeWidth="0.08"
              />
            );
          })}
        </svg>

        <div className={s.core}>
          <h1 className={s.question}>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
        </div>

        {BRANCHES.map((b, i) => {
          const p = starPos(i, n);
          return (
            <a
              key={b.domain}
              className={s.star}
              href={b.href}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={s.dot}
                style={
                  {
                    animationDelay: `${0.7 + i * 0.35}s, ${3 + i * BEACON}s`,
                    "--cycle": `${n * BEACON}s`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
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
      </section>

      <section className={s.dawn}>
        <p className={s.answer}>
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
        <footer className={s.footer}>
          <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
        </footer>
      </section>
    </main>
  );
}
