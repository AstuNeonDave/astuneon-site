import Logo from "../Logo";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V12 — "Osservatorio": the thinkers' instrument. An engraved astrolabe
   holds each venture as a body on its own orbit around the mark.
   Orbits are computed from the array — a new venture is a new orbit. */

const C = 500;

function orbit(i: number) {
  return 150 + i * 52;
}

function planet(i: number, n: number) {
  const a = ((-125 + (i * 300) / Math.max(n - 1, 1)) * Math.PI) / 180;
  const r = orbit(i);
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

export default function Osservatorio() {
  const n = BRANCHES.length;
  const rMax = orbit(n - 1);
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <nav className={s.nav} aria-label="Versions">
          <a href="/v4">IV</a>
          <a href="/v5">V</a>
          <a href="/v6">VI</a>
          <a href="/v7">VII</a>
          <a href="/v8">VIII</a>
          <a href="/v9">IX</a>
          <a href="/v10">X</a>
          <a href="/v11">XI</a>
          <a href="/v12" aria-current="page">
            XII
          </a>
          <a href="/v13">XIII</a>
          <a href="/v14">XIV</a>
          <a href="/v15">XV</a>
          <a href="/v16">XVI</a>
        </nav>
      </header>

      <section className={s.instrument}>
        <svg
          className={s.dial}
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* outer dial with tick marks — slowly turning */}
          <g className={s.turning}>
            <circle cx={C} cy={C} r={rMax + 46} strokeWidth="0.9" opacity="0.4" />
            <circle cx={C} cy={C} r={rMax + 38} strokeWidth="0.5" opacity="0.3" />
            {Array.from({ length: 72 }, (_, k) => {
              const a = ((k * 5 * Math.PI) / 180) as number;
              const long = k % 6 === 0;
              const r1 = rMax + (long ? 30 : 34);
              const r2 = rMax + 38;
              return (
                <line
                  key={k}
                  x1={C + r1 * Math.cos(a)}
                  y1={C + r1 * Math.sin(a)}
                  x2={C + r2 * Math.cos(a)}
                  y2={C + r2 * Math.sin(a)}
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

          {/* sight lines */}
          {BRANCHES.map((b, i) => {
            const p = planet(i, n);
            return (
              <line
                key={b.domain}
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                strokeWidth="0.4"
                opacity="0.2"
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
              <span className={s.planet} aria-hidden="true" />
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

      <section className={s.below}>
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
      </section>

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
      </footer>
    </main>
  );
}
