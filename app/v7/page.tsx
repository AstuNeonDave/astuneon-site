import Logo from "../Logo";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V7 — "Costellazione": the parent is the sky; each venture is a star it
   holds in orbit. Star positions are computed from the array, so a new
   branch simply appears in the constellation. */

const CX = 50;
const CY = 47;

function starPos(i: number, n: number) {
  const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const rx = i % 2 === 0 ? 36 : 27;
  const ry = i % 2 === 0 ? 38 : 29;
  return { x: CX + rx * Math.cos(angle), y: CY + ry * Math.sin(angle) };
}

export default function Costellazione() {
  const n = BRANCHES.length;
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
          <a href="/v7" aria-current="page">
            VII
          </a>
          <a href="/v8">VIII</a>
          <a href="/v9">IX</a>
        </nav>
      </header>

      <section className={s.sky}>
        <svg className={s.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {BRANCHES.map((b, i) => {
            const p = starPos(i, n);
            return (
              <line
                key={b.domain}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
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
