import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V9 — hand-styled engraved olive tree, grown from data.
   One limb per venture; a new venture grows a new limb. */

const BASE = { x: 500, y: 618 };
const CROWN = { x: 500, y: 428 };

function limb(i: number, n: number) {
  const a = ((-155 + (i * 130) / Math.max(n - 1, 1)) * Math.PI) / 180;
  const len = i % 2 === 0 ? 244 : 186;
  const tip = {
    x: CROWN.x + len * Math.cos(a),
    y: CROWN.y + len * Math.sin(a),
  };
  const ctrl = {
    x: CROWN.x + 0.35 * (tip.x - CROWN.x),
    y: CROWN.y + 0.62 * (tip.y - CROWN.y),
  };
  return { tip, ctrl };
}

export default function Albero() {
  const n = BRANCHES.length;
  return (
    <svg
      className={s.tree}
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="The branches of Astu Neon"
    >
      {/* ground */}
      <path
        d="M340,620 Q500,606 660,620"
        strokeWidth="1.4"
        opacity="0.55"
      />
      {/* roots */}
      <path d="M488,618 Q470,650 434,662" strokeWidth="1.1" opacity="0.4" />
      <path d="M512,618 Q530,652 568,660" strokeWidth="1.1" opacity="0.4" />
      <path d="M500,620 Q502,654 496,678" strokeWidth="1.1" opacity="0.4" />
      {/* trunk — twisted, old */}
      <path
        d="M486,618 C492,560 478,516 496,470 C502,452 498,440 500,428"
        strokeWidth="2.4"
      />
      <path
        d="M514,618 C508,566 524,518 506,472 C500,454 504,440 500,428"
        strokeWidth="2.4"
      />
      <path d="M494,560 C500,548 502,548 508,538" strokeWidth="1" opacity="0.5" />
      <path d="M492,500 C498,492 504,494 510,486" strokeWidth="1" opacity="0.5" />

      {BRANCHES.map((b, i) => {
        const { tip, ctrl } = limb(i, n);
        return (
          <a key={b.domain} href={b.href} className={s.limb}>
            <path
              d={`M${CROWN.x},${CROWN.y} Q${ctrl.x},${ctrl.y} ${tip.x},${tip.y}`}
              strokeWidth="1.6"
            />
            {/* leaf cluster */}
            <path
              d={`M${tip.x},${tip.y} q-14,-8 -26,-2 q12,8 26,2 Z`}
              strokeWidth="1"
            />
            <path
              d={`M${tip.x},${tip.y} q14,-8 26,-2 q-12,8 -26,2 Z`}
              strokeWidth="1"
            />
            <circle cx={tip.x + 4} cy={tip.y - 10} r="3.4" strokeWidth="1" />
            <text
              x={tip.x}
              y={tip.y - 34}
              textAnchor="middle"
              className={s.limbDomain}
            >
              {b.domain}
            </text>
            <text
              x={tip.x}
              y={tip.y - 20}
              textAnchor="middle"
              className={s.limbLabel}
            >
              {b.label}
              {b.note ? ` · ${b.note}` : ""}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
