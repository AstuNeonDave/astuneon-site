import Logo from "../Logo";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V10 — "Il Tessitore" (the Dreamweaver): the parent is the loom that
   catches dreams. A woven radial web slowly turns; each venture is a bead
   caught in the weave. Beads are computed from the array — a new venture
   is a new bead in the web. */

const C = 500; // web center
const RINGS = [120, 190, 260, 330, 400];

function beadPos(i: number, n: number) {
  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const r = i % 2 === 0 ? 330 : 235;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

export default function Tessitore() {
  const n = BRANCHES.length;
  const spokes = Array.from({ length: 12 }, (_, k) => (k * 360) / 12);
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
          <a href="/v10" aria-current="page">
            X
          </a>
          <a href="/v11">XI</a>
          <a href="/v12">XII</a>
        </nav>
      </header>

      <section className={s.hero}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>
      </section>

      <section className={s.loom}>
        <svg
          className={s.web}
          viewBox="0 0 1000 1120"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* the turning weave */}
          <g className={s.weave}>
            {RINGS.map((r, k) => (
              <circle
                key={r}
                cx={C}
                cy={C}
                r={r}
                strokeWidth="0.8"
                opacity={0.32 - k * 0.04}
              />
            ))}
            {spokes.map((deg) => {
              const a = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={C + RINGS[0] * Math.cos(a) * 0.35}
                  y1={C + RINGS[0] * Math.sin(a) * 0.35}
                  x2={C + RINGS[4] * Math.cos(a)}
                  y2={C + RINGS[4] * Math.sin(a)}
                  strokeWidth="0.6"
                  opacity="0.22"
                />
              );
            })}
            {/* woven spiral thread */}
            <path
              d="M500,380 A120,120 0 1 1 499,380 M500,310 A190,190 0 1 1 499,310 M500,240 A260,260 0 1 1 499,240"
              strokeWidth="0.5"
              opacity="0.16"
            />
          </g>

          {/* hanging feathers — the dreamcatcher's fringe */}
          {[380, 500, 620].map((x, k) => {
            const y0 = k === 1 ? 918 : 886;
            const drop = k === 1 ? 44 : 34;
            const tipY = y0 + drop + 86;
            return (
              <g key={x} className={s.feather} opacity="0.55">
                <line x1={x} y1={y0} x2={x} y2={y0 + drop} strokeWidth="0.7" />
                <circle cx={x} cy={y0 + drop + 5} r="3" strokeWidth="0.8" />
                <path
                  d={`M${x},${y0 + drop + 8} C${x - 15},${y0 + drop + 34} ${
                    x - 15
                  },${tipY - 26} ${x},${tipY} C${x + 15},${tipY - 26} ${
                    x + 15
                  },${y0 + drop + 34} ${x},${y0 + drop + 8} Z`}
                  strokeWidth="0.9"
                />
                <line
                  x1={x}
                  y1={y0 + drop + 8}
                  x2={x}
                  y2={tipY}
                  strokeWidth="0.6"
                  opacity="0.7"
                />
              </g>
            );
          })}
        </svg>

        {/* beads — the dreams the web has caught (do not rotate) */}
        {BRANCHES.map((b, i) => {
          const p = beadPos(i, n);
          return (
            <a
              key={b.domain}
              className={s.bead}
              href={b.href}
              style={{
                left: `${(p.x / 1000) * 100}%`,
                top: `${(p.y / 1120) * 100}%`,
              }}
            >
              <span className={s.dot} aria-hidden="true" />
              <span className={s.beadLabel}>
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
