import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V22 — "Meccanica del Cielo": the full synthesis. v12's orrery turns in a
   real star field; sight lines draw themselves to each orbit on arrival;
   the venture-bodies ignite and then beckon in turn; meteors pass; and
   the mechanism's night gives way to dawn below. */

const C = 500;
const BEACON = 1.4;

function orbit(i: number) {
  return 150 + i * 52;
}

function planet(i: number, n: number) {
  const a = ((-125 + (i * 300) / Math.max(n - 1, 1)) * Math.PI) / 180;
  const r = orbit(i);
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
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

export default function MeccanicaDelCielo() {
  const n = BRANCHES.length;
  const rMax = orbit(n - 1);
  return (
    <main className={s.page}>
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(29, 110, 0.5) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(53, 45, 0.85) }}
        aria-hidden="true"
      />
      <div className={s.meteorA} aria-hidden="true" />
      <div className={s.meteorB} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={22} />
      </header>

      <section className={s.instrument}>
        <svg
          className={s.dial}
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* turning outer dial */}
          <g className={s.turning}>
            <circle cx={C} cy={C} r={rMax + 46} strokeWidth="0.9" opacity="0.4" />
            <circle cx={C} cy={C} r={rMax + 38} strokeWidth="0.5" opacity="0.3" />
            {Array.from({ length: 72 }, (_, k) => {
              const a = (k * 5 * Math.PI) / 180;
              const long = k % 6 === 0;
              const r1 = rMax + (long ? 30 : 34);
              return (
                <line
                  key={k}
                  x1={C + r1 * Math.cos(a)}
                  y1={C + r1 * Math.sin(a)}
                  x2={C + (rMax + 38) * Math.cos(a)}
                  y2={C + (rMax + 38) * Math.sin(a)}
                  strokeWidth={long ? 1 : 0.5}
                  opacity="0.45"
                />
              );
            })}
          </g>

          {/* orbits */}
          {BRANCHES.map((b, i) => (
            <circle
              key={b.domain}
              cx={C}
              cy={C}
              r={orbit(i)}
              strokeWidth="0.7"
              strokeDasharray="1.5 5"
              opacity="0.4"
            />
          ))}

          {/* sight lines — drawing themselves outward on arrival */}
          {BRANCHES.map((b, i) => {
            const p = planet(i, n);
            return (
              <line
                key={b.domain}
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                pathLength={1}
                className={s.sight}
                style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                strokeWidth="0.5"
              />
            );
          })}
        </svg>

        {BRANCHES.map((b, i) => {
          const p = planet(i, n);
          return (
            <a
              key={b.domain}
              className={s.body}
              href={b.href}
              style={{
                left: `${(p.x / 1000) * 100}%`,
                top: `${(p.y / 1000) * 100}%`,
              }}
            >
              <span
                className={s.planet}
                style={
                  {
                    animationDelay: `${0.7 + i * 0.35}s, ${3 + i * BEACON}s`,
                    "--cycle": `${n * BEACON}s`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
              <span className={s.bodyLabel}>
                <strong>{b.domain}</strong>
                <em>
                  {b.label}
                  {b.note ? ` · ${b.note}` : ""}
                </em>
              </span>
            </a>
          );
        })}

        <div className={s.center} aria-hidden="true">
          <Logo className={s.centerMark} />
        </div>
      </section>

      <section className={s.dawn}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>
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
