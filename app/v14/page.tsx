import Logo from "../Logo";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V14 — "Porta di Stelle": the constellation takes the shape of the porta —
   an arch of stars standing in the night, the manifesto framed inside the
   doorway. Branch stars sit on the arch; small stars trace its stonework. */

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

const ARCH = { cx: 50, baseY: 64, rx: 33, ry: 42 };

function archPoint(deg: number) {
  const a = (deg * Math.PI) / 180;
  return {
    x: ARCH.cx + ARCH.rx * Math.cos(a),
    y: ARCH.baseY - ARCH.ry * Math.sin(a),
  };
}

export default function PortaDiStelle() {
  const n = BRANCHES.length;
  /* decorative tracery: arch every 7.5°, plus the two columns */
  const tracery: { x: number; y: number }[] = [];
  for (let d = 0; d <= 180; d += 7.5) tracery.push(archPoint(d));
  for (const x of [ARCH.cx - ARCH.rx, ARCH.cx + ARCH.rx]) {
    for (let y = ARCH.baseY + 5; y <= 92; y += 5.5) tracery.push({ x, y });
  }

  return (
    <main className={s.page}>
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(13, 100, 0.45) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(41, 40, 0.8) }}
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
          <a href="/v13">XIII</a>
          <a href="/v14" aria-current="page">
            XIV
          </a>
          <a href="/v15">XV</a>
          <a href="/v16">XVI</a>
        </nav>
      </header>

      <section className={s.gate}>
        {tracery.map((p, k) => (
          <span
            key={k}
            className={s.trace}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-hidden="true"
          />
        ))}

        {BRANCHES.map((b, i) => {
          const p = archPoint(180 - (i * 180) / Math.max(n - 1, 1));
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

        <div className={s.inside}>
          <h1 className={s.question}>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
        </div>
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
