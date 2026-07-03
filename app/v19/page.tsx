import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V19 — "Zodiaco": v7's radial idea, formalized. The sky is divided into
   houses — one celestial sector per venture, each with its star. The
   wheel divides itself evenly however many houses there are. */

const C = 500;
const R0 = 178;
const R1 = 424;
const R_STAR = 306;

function pt(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

function wedgePath(i: number, n: number) {
  const a0 = -90 + (i * 360) / n;
  const a1 = a0 + 360 / n;
  const p1 = pt(R0, a0);
  const p2 = pt(R1, a0);
  const p3 = pt(R1, a1);
  const p4 = pt(R0, a1);
  return `M${p1.x},${p1.y} L${p2.x},${p2.y} A${R1},${R1} 0 0 1 ${p3.x},${p3.y} L${p4.x},${p4.y} A${R0},${R0} 0 0 0 ${p1.x},${p1.y} Z`;
}

function starAt(i: number, n: number) {
  const mid = -90 + ((i + 0.5) * 360) / n;
  return pt(R_STAR, mid);
}

export default function Zodiaco() {
  const n = BRANCHES.length;
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={19} />
      </header>

      <section className={s.wheelWrap}>
        <svg
          className={s.wheel}
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          <circle cx={C} cy={C} r={R1} strokeWidth="1.4" opacity="0.5" />
          <circle
            cx={C}
            cy={C}
            r={R1 - 26}
            strokeWidth="0.6"
            strokeDasharray="2 6"
            opacity="0.3"
          />
          <circle cx={C} cy={C} r={R0} strokeWidth="1" opacity="0.45" />

          {BRANCHES.map((b, i) => {
            const st = starAt(i, n);
            return (
              <a key={b.domain} href={b.href} className={s.house}>
                <path d={wedgePath(i, n)} strokeWidth="0.8" opacity="0.45" />
                <circle cx={st.x} cy={st.y} r={6} className={s.houseStar} />
                <text
                  x={st.x}
                  y={st.y - 26}
                  textAnchor="middle"
                  className={s.houseDomain}
                >
                  {b.domain}
                </text>
                <text
                  x={st.x}
                  y={st.y + 34}
                  textAnchor="middle"
                  className={s.houseLabel}
                >
                  {b.label}
                  {b.note ? ` · ${b.note}` : ""}
                </text>
              </a>
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
