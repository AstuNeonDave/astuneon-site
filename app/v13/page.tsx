import Logo from "../Logo";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V13 — "Segno": the constellation IS the mark. The wordmark is written
   across the night in hundreds of tiny stars (a star-dot field masked by
   the logo itself); the six ventures burn brightest within it. */

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

/* six anchor stars placed on the letterforms (percent of the mark's box) */
const ANCHORS = [
  { x: 11, y: 20 },
  { x: 50, y: 16 },
  { x: 88, y: 22 },
  { x: 16, y: 78 },
  { x: 57, y: 82 },
  { x: 91, y: 74 },
];

export default function Segno() {
  return (
    <main className={s.page}>
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(11, 100, 0.45) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(31, 40, 0.8) }}
        aria-hidden="true"
      />

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
          <a href="/v12">XII</a>
          <a href="/v13" aria-current="page">
            XIII
          </a>
          <a href="/v14">XIV</a>
          <a href="/v15">XV</a>
          <a href="/v16">XVI</a>
        </nav>
      </header>

      <section className={s.skyMark}>
        <div className={s.markGlow} aria-hidden="true" />
        <div className={s.markStars} aria-hidden="true">
          <div className={s.dotsA} />
          <div className={s.dotsB} />
        </div>
        {BRANCHES.map((b, i) => {
          const p = ANCHORS[i % ANCHORS.length];
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
