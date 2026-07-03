import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V11 — "Cielo Aperto": a night walk through the open sky that ends at
   dawn. The ventures assemble into a new constellation mid-journey;
   its points are computed from the array. */

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function starField(seed: number, count: number, alpha: number) {
  const rnd = seeded(seed);
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    shadows.push(
      `${(rnd() * 100).toFixed(2)}vw ${(rnd() * 100).toFixed(
        2
      )}vh 0 rgba(244,234,208,${alpha})`
    );
  }
  return shadows.join(",");
}

const YS = [34, 58, 26, 62, 38, 54];

function point(i: number, n: number) {
  const x = 10 + (i * 80) / Math.max(n - 1, 1);
  const y = YS[i % YS.length];
  return { x, y };
}

export default function CieloAperto() {
  const n = BRANCHES.length;
  const poly = BRANCHES.map((_, i) => {
    const p = point(i, n);
    return `${p.x},${p.y}`;
  }).join(" ");

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

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={11} />
      </header>

      <section className={s.opening}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>
      </section>

      <section className={s.constellation}>
        <svg
          className={s.figure}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            points={poly}
            stroke="currentColor"
            strokeWidth="0.08"
            fill="none"
          />
        </svg>
        {BRANCHES.map((b, i) => {
          const p = point(i, n);
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
