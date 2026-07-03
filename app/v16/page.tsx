import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V16 — "Notturnale": an engraved gold plate in a dark room. The ventures
   are inscribed along the crown of the dial, each with its medallion; a
   sighting needle sweeps the engraving. Inscriptions are computed from
   the array. */

const C = 500;
const R_TEXT = 352;
const R_MED = 306;

function crownT(i: number, n: number) {
  return 0.06 + (0.88 * i) / Math.max(n - 1, 1);
}

function medPos(i: number, n: number) {
  const t = crownT(i, n);
  const th = Math.PI - t * Math.PI; /* 180° → 0° across the top */
  return { x: C + R_MED * Math.cos(th), y: C - R_MED * Math.sin(th) };
}

export default function Notturnale() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={16} />
      </header>

      <section className={s.instrument}>
        <svg
          className={s.plate}
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            <path
              id="crown"
              d={`M${C - R_TEXT},${C} A${R_TEXT},${R_TEXT} 0 0 1 ${
                C + R_TEXT
              },${C}`}
            />
          </defs>

          {/* engraved bands */}
          <circle cx={C} cy={C} r={464} strokeWidth="2.6" opacity="0.8" />
          <circle
            cx={C}
            cy={C}
            r={440}
            strokeWidth="9"
            strokeDasharray="38 17"
            opacity="0.14"
          />
          <circle cx={C} cy={C} r={412} strokeWidth="1" opacity="0.55" />
          <circle cx={C} cy={C} r={396} strokeWidth="0.6" opacity="0.35" />
          <circle
            cx={C}
            cy={C}
            r={262}
            strokeWidth="0.9"
            strokeDasharray="2 6"
            opacity="0.4"
          />
          <circle cx={C} cy={C} r={214} strokeWidth="1.1" opacity="0.5" />
          <circle cx={C} cy={C} r={128} strokeWidth="0.8" opacity="0.45" />

          {/* fine degree ticks */}
          {Array.from({ length: 120 }, (_, k) => {
            const a = (k * 3 * Math.PI) / 180;
            const long = k % 10 === 0;
            return (
              <line
                key={k}
                x1={C + (long ? 398 : 404) * Math.cos(a)}
                y1={C + (long ? 398 : 404) * Math.sin(a)}
                x2={C + 411 * Math.cos(a)}
                y2={C + 411 * Math.sin(a)}
                strokeWidth={long ? 1.2 : 0.5}
                opacity="0.5"
              />
            );
          })}

          {/* the needle, sweeping the engraving */}
          <g className={s.needle}>
            <line
              x1={C}
              y1={C - 390}
              x2={C}
              y2={C + 180}
              strokeWidth="1.6"
              opacity="0.45"
            />
            <path
              d={`M${C},${C - 390} l-9,26 l18,0 Z`}
              strokeWidth="1.1"
              opacity="0.5"
            />
            <circle cx={C} cy={C} r={10} strokeWidth="1.3" opacity="0.55" />
          </g>

          {/* inscriptions along the crown, one per venture */}
          {BRANCHES.map((b, i) => {
            const m = medPos(i, n);
            return (
              <a key={b.domain} href={b.href} className={s.inscription}>
                <circle cx={m.x} cy={m.y} r={9} strokeWidth="1.3" />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={3.2}
                  className={s.medCore}
                  strokeWidth="1"
                />
                <text className={s.crownText}>
                  <textPath
                    href="#crown"
                    startOffset={`${crownT(i, n) * 100}%`}
                    textAnchor="middle"
                  >
                    {b.domain}
                  </textPath>
                </text>
                <title>
                  {b.label}
                  {b.note ? ` · ${b.note}` : ""}
                </title>
              </a>
            );
          })}
        </svg>

        <div className={s.center} aria-hidden="true">
          <Logo className={s.centerMark} />
        </div>
      </section>

      <section className={s.legend}>
        {BRANCHES.map((b) => (
          <a key={b.domain} className={s.legendItem} href={b.href}>
            <strong>{b.domain}</strong>
            <em>
              {b.label}
              {b.note ? ` · ${b.note}` : ""}
            </em>
          </a>
        ))}
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
