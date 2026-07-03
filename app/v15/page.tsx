import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V15 — "Astrolabio d'Oro": after the gold astrolabes of the Islamic
   golden age — kursi (throne) and suspension ring, a rete whose flame
   pointers mark the ventures, a turning degree ring, and an alidade
   sweeping the dial. Pointers are computed from the array. */

const C = 500;
const CY = 590;

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

function labelPos(i: number, n: number) {
  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
  const r1 = (i % 2 === 0 ? 348 : 278) + 36;
  return { x: C + r1 * Math.cos(a), y: CY + r1 * Math.sin(a) };
}

export default function AstrolabioDOro() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={15} />
      </header>

      <section className={s.instrument}>
        <svg
          className={s.dial}
          viewBox="0 0 1000 1080"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* kursi — the throne and its suspension ring */}
          <circle cx={C} cy={116} r={26} strokeWidth="2.4" opacity="0.85" />
          <circle cx={C} cy={116} r={17} strokeWidth="1" opacity="0.5" />
          <path
            d="M448,206 C452,168 470,152 486,146 C480,132 496,124 500,138 C504,124 520,132 514,146 C530,152 548,168 552,206"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            d="M448,206 Q500,190 552,206"
            strokeWidth="2"
            opacity="0.85"
          />

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

          {/* ecliptic — the offset ring of the heavens */}
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

          {/* alidade — the sighting rule, sweeping */}
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

          {/* rete pointers — one flame per venture */}
          {BRANCHES.map((b, i) => (
            <a key={b.domain} href={b.href} className={s.pointer}>
              <path d={pointerPath(i, n)} strokeWidth="1.6" />
              <circle
                cx={labelPos(i, n).x - 36 * Math.cos(((-90 + (i * 360) / n) * Math.PI) / 180)}
                cy={labelPos(i, n).y - 36 * Math.sin(((-90 + (i * 360) / n) * Math.PI) / 180)}
                r="4"
                strokeWidth="1.2"
              />
              <text
                x={labelPos(i, n).x}
                y={labelPos(i, n).y}
                textAnchor="middle"
                className={s.pointerDomain}
              >
                {b.domain}
              </text>
              <text
                x={labelPos(i, n).x}
                y={labelPos(i, n).y + 15}
                textAnchor="middle"
                className={s.pointerLabel}
              >
                {b.label}
                {b.note ? ` · ${b.note}` : ""}
              </text>
            </a>
          ))}
        </svg>

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
