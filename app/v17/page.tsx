import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V17 — "Costellazione Viva": v7's sky, but alive. The constellation draws
   itself when you arrive — threads reach out from the center, stars ignite
   one by one, and now and then a meteor crosses the night. */

const CX = 50;
const CY = 47;

function starPos(i: number, n: number) {
  const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const rx = i % 2 === 0 ? 36 : 27;
  const ry = i % 2 === 0 ? 38 : 29;
  return { x: CX + rx * Math.cos(angle), y: CY + ry * Math.sin(angle) };
}

export default function CostellazioneViva() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.meteorA} aria-hidden="true" />
      <div className={s.meteorB} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={17} />
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
                style={{ animationDelay: `${0.7 + i * 0.35}s` }}
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
