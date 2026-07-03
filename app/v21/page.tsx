import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V21 — "Astrolabio Celeste": v15's golden instrument, no longer on a
   bland field but hung in a real night — full twinkling star field,
   meteors, the rete pointers unfolding one by one, their tip-stars
   beckoning in turn, and the page resolving into dawn. The degree ring
   and alidade keep their slow rotation. */

const C = 500;
const CY = 590;
const BEACON = 1.4;

function pointerPath(i: number, n: number) {
  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const perp = a + Math.PI / 2;
  const r0 = 140;
  const r1 = i % 2 === 0 ? 348 : 278;
  const w = 13;
  const wm = 4;
  const rm = r0 + (r1 - r0) * 0.5;
  const px = (r: number, off: number, dir: number) =>
    (C + r * Math.cos(a) + dir * off * Math.cos(perp)).toFixed(1);
  const py = (r: number, off: number, dir: number) =>
    (CY + r * Math.sin(a) + dir * off * Math.sin(perp)).toFixed(1);
  return `M${px(r0, w, 1)},${py(r0, w, 1)} Q${px(rm, wm, 1)},${py(
    rm,
    wm,
    1
  )} ${px(r1, 0, 0)},${py(r1, 0, 0)} Q${px(rm, wm, -1)},${py(rm, wm, -1)} ${px(
    r0,
    w,
    -1
  )},${py(r0, w, -1)} Z`;
}

function tipPos(i: number, n: number) {
  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const r1 = i % 2 === 0 ? 348 : 278;
  return { x: C + r1 * Math.cos(a), y: CY + r1 * Math.sin(a), a };
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

export default function AstrolabioCeleste() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(17, 110, 0.5) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(43, 45, 0.85) }}
        aria-hidden="true"
      />
      <div className={s.meteorA} aria-hidden="true" />
      <div className={s.meteorB} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={21} />
      </header>

      <section className={s.instrument}>
        <svg
          className={s.dial}
          viewBox="0 0 1000 1080"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* kursi — throne and suspension ring */}
          <circle cx={C} cy={116} r={26} strokeWidth="2.4" opacity="0.85" />
          <circle cx={C} cy={116} r={17} strokeWidth="1" opacity="0.5" />
          <path
            d="M448,206 C452,168 470,152 486,146 C480,132 496,124 500,138 C504,124 520,132 514,146 C530,152 548,168 552,206"
            strokeWidth="2"
            opacity="0.85"
          />
          <path d="M448,206 Q500,190 552,206" strokeWidth="2" opacity="0.85" />

          {/* mater — outer rings and turning degree scale */}
          <circle cx={C} cy={CY} r={382} strokeWidth="2.4" opacity="0.85" />
          <circle cx={C} cy={CY} r={368} strokeWidth="0.8" opacity="0.5" />
          <g className={s.turning}>
            {Array.from({ length: 96 }, (_, k) => {
              const a = (k * 3.75 * Math.PI) / 180;
              const long = k % 8 === 0;
              const r1 = long ? 348 : 356;
              return (
                <line
                  key={k}
                  x1={C + r1 * Math.cos(a)}
                  y1={CY + r1 * Math.sin(a)}
                  x2={C + 366 * Math.cos(a)}
                  y2={CY + 366 * Math.sin(a)}
                  strokeWidth={long ? 1.4 : 0.6}
                  opacity="0.55"
                />
              );
            })}
            <circle
              cx={C}
              cy={CY}
              r={340}
              strokeWidth="0.7"
              strokeDasharray="2 7 14 7"
              opacity="0.35"
            />
          </g>

          {/* ecliptic */}
          <circle
            cx={C}
            cy={CY - 72}
            r={212}
            strokeWidth="1.2"
            strokeDasharray="5 6"
            opacity="0.4"
          />

          {/* rete center */}
          <circle cx={C} cy={CY} r={140} strokeWidth="1" opacity="0.5" />
          <circle
            cx={C}
            cy={CY}
            r={92}
            strokeWidth="0.8"
            strokeDasharray="1.5 6"
            opacity="0.4"
          />

          {/* alidade — sweeping the dial */}
          <g className={s.alidade}>
            <line
              x1={C - 330}
              y1={CY}
              x2={C + 330}
              y2={CY}
              strokeWidth="2"
              opacity="0.5"
            />
            <path
              d={`M${C - 330},${CY} l26,-9 l0,18 Z`}
              strokeWidth="1.2"
              opacity="0.5"
            />
            <path
              d={`M${C + 330},${CY} l-26,-9 l0,18 Z`}
              strokeWidth="1.2"
              opacity="0.5"
            />
            <circle cx={C} cy={CY} r={12} strokeWidth="1.4" opacity="0.6" />
          </g>

          {/* rete pointers — unfolding one by one, tips beckoning in turn */}
          {BRANCHES.map((b, i) => {
            const t = tipPos(i, n);
            const lx = C + ((i % 2 === 0 ? 348 : 278) + 36) * Math.cos(t.a);
            const ly = CY + ((i % 2 === 0 ? 348 : 278) + 36) * Math.sin(t.a);
            return (
              <a key={b.domain} href={b.href} className={s.pointer}>
                <path
                  d={pointerPath(i, n)}
                  strokeWidth="1.6"
                  className={s.blade}
                  style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                />
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="5"
                  className={s.tipStar}
                  style={
                    {
                      animationDelay: `${0.7 + i * 0.35}s, ${
                        3 + i * BEACON
                      }s`,
                      "--cycle": `${n * BEACON}s`,
                    } as React.CSSProperties
                  }
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  className={s.pointerDomain}
                >
                  {b.domain}
                </text>
                <text
                  x={lx}
                  y={ly + 15}
                  textAnchor="middle"
                  className={s.pointerLabel}
                >
                  {b.label}
                  {b.note ? ` · ${b.note}` : ""}
                </text>
              </a>
            );
          })}
        </svg>

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
