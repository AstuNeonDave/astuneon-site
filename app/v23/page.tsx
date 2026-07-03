"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V23 — "L'Alba" · first draft of the final site.
   One long scroll from night to dawn:
   1. Arrival — only stars and the mark, centered in the night.
   2. Scroll — the mark rises away, the questions fade in, and the mark
      settles quietly into the corner a beat later.
   3. The sky begins to lighten; the golden astrolabe unfolds, its
      tip-stars beckoning in turn; names appear on hover, outside the dial.
   4. Lighter still — the answer.
   5. At the brightest edge of dawn, sunrise clouds part to reveal the
      final words and the imprint. */

const C = 500;
const CY = 590;
const BEACON = 1.3;

/* pointers offset half a step so none aims due north */
function angleOf(i: number, n: number) {
  return ((-90 + ((i + 0.5) * 360) / n) * Math.PI) / 180;
}

function pointerPath(i: number, n: number) {
  const a = angleOf(i, n);
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
  const a = angleOf(i, n);
  const r1 = i % 2 === 0 ? 348 : 278;
  return { x: C + r1 * Math.cos(a), y: CY + r1 * Math.sin(a), a };
}

/* label sits outside the dial, beside the tip-star */
function labelLayout(i: number, n: number) {
  const t = tipPos(i, n);
  const rl = (i % 2 === 0 ? 348 : 278) + 24;
  const x = C + rl * Math.cos(t.a);
  const y = CY + rl * Math.sin(t.a);
  const cos = Math.cos(t.a);
  const sin = Math.sin(t.a);
  if (cos > 0.25) return { x: x + 8, y: y + 4, anchor: "start" as const };
  if (cos < -0.25) return { x: x - 8, y: y + 4, anchor: "end" as const };
  return {
    x,
    y: y + (sin > 0 ? 30 : -22),
    anchor: "middle" as const,
  };
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

export default function Alba() {
  const n = BRANCHES.length;
  const mainRef = useRef<HTMLElement | null>(null);
  const astroRef = useRef<HTMLElement | null>(null);
  const [wordsIn, setWordsIn] = useState(false);
  const [live, setLive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = mainRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const p1 = Math.min(1, Math.max(0, y / (1.3 * vh)));
      el.style.setProperty("--p1", p1.toFixed(3));
      const total = document.documentElement.scrollHeight - vh;
      const p = total > 0 ? y / total : 0;
      const fade = Math.min(1, Math.max(0, (p - 0.5) / 0.32));
      el.style.setProperty("--starfade", (1 - fade).toFixed(3));
      setWordsIn(p1 > 0.55);
      setOpen(total - y < 1.15 * vh);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = astroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main ref={mainRef} className={s.page}>
      {/* the sky — fixed, fading as dawn approaches */}
      <div
        className={s.starsFar}
        style={{ boxShadow: starField(7, 130, 0.5) }}
        aria-hidden="true"
      />
      <div
        className={s.starsNear}
        style={{ boxShadow: starField(23, 55, 0.85) }}
        aria-hidden="true"
      />
      <div className={s.meteorA} aria-hidden="true" />
      <div className={s.meteorB} aria-hidden="true" />

      {/* 1 & 2 — the pinned arrival */}
      <section className={s.pin}>
        <div className={s.stage}>
          <div className={`${s.corner} ${wordsIn ? s.cornerOn : ""}`}>
            <a className={s.logoLink} href="/">
              <Logo className={s.cornerLogo} />
            </a>
            <VersionNav className={s.nav} current={23} />
          </div>

          <div className={s.introLogoWrap} aria-hidden={wordsIn}>
            <Logo className={s.introLogo} />
          </div>

          <div className={s.introQuestion}>
            <h1 className={s.question}>
              What if we, just you and I, built a whole economy? Bottled a
              sun-drenched paradise to share around a table? What if we asked
              the most impossible questions, stowed away a myopic life?
            </h1>
          </div>
        </div>
      </section>

      {/* 3 — the astrolabe in the lightening sky */}
      <section
        ref={astroRef}
        className={`${s.instrument} ${live ? s.live : ""}`}
      >
        <svg
          className={s.dial}
          viewBox="0 0 1000 1080"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          {/* kursi */}
          <circle cx={C} cy={116} r={26} strokeWidth="2.4" opacity="0.85" />
          <circle cx={C} cy={116} r={17} strokeWidth="1" opacity="0.5" />
          <path
            d="M448,206 C452,168 470,152 486,146 C480,132 496,124 500,138 C504,124 520,132 514,146 C530,152 548,168 552,206"
            strokeWidth="2"
            opacity="0.85"
          />
          <path d="M448,206 Q500,190 552,206" strokeWidth="2" opacity="0.85" />

          {/* mater */}
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

          <circle
            cx={C}
            cy={CY - 72}
            r={212}
            strokeWidth="1.2"
            strokeDasharray="5 6"
            opacity="0.4"
          />
          <circle cx={C} cy={CY} r={140} strokeWidth="1" opacity="0.5" />
          <circle
            cx={C}
            cy={CY}
            r={92}
            strokeWidth="0.8"
            strokeDasharray="1.5 6"
            opacity="0.4"
          />

          {/* alidade */}
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

          {/* rete pointers — unfold when seen; tips beckon; names on hover,
              outside the dial */}
          {BRANCHES.map((b, i) => {
            const t = tipPos(i, n);
            const lab = labelLayout(i, n);
            return (
              <a key={b.domain} href={b.href} className={s.pointer}>
                <path
                  d={pointerPath(i, n)}
                  strokeWidth="1.6"
                  className={s.blade}
                  style={{ animationDelay: `${0.3 + i * 0.32}s` }}
                />
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="5"
                  className={s.tipStar}
                  style={
                    {
                      animationDelay: `${0.6 + i * 0.32}s, ${
                        2.8 + i * BEACON
                      }s`,
                      "--cycle": `${n * BEACON}s`,
                    } as React.CSSProperties
                  }
                />
                <g className={s.lab}>
                  <text
                    x={lab.x}
                    y={lab.y}
                    textAnchor={lab.anchor}
                    className={s.labDomain}
                  >
                    {b.domain}
                  </text>
                  <text
                    x={lab.x}
                    y={lab.y + 15}
                    textAnchor={lab.anchor}
                    className={s.labNote}
                  >
                    {b.label}
                    {b.note ? ` · ${b.note}` : ""}
                  </text>
                </g>
              </a>
            );
          })}
        </svg>

        <div className={s.center} aria-hidden="true">
          <Logo className={s.centerMark} />
        </div>
      </section>

      {/* 4 — the answer, in lighter sky */}
      <section className={s.answerBlock}>
        <p className={s.answer}>
          At Astu Neon, we don’t shy away from these challenges, we answer
          them. Opening doors, stepping into a boundless universe. An
          invitation to connection, the exchange of ideas, and a dynamic life.
          Because dreaming belongs to everyone. It is a catalyst for belonging,
          giving us a seat at our table where we remember our most naive,
          uninhibited dreams: to reach the moon, to create new things, to heal.
        </p>
      </section>

      {/* 5 — the clouds part at dawn */}
      <section className={`${s.finale} ${open ? s.open : ""}`}>
        <div className={s.sun} aria-hidden="true" />

        <div className={`${s.bank} ${s.bankL}`} aria-hidden="true">
          <span className={s.puffA} />
          <span className={s.puffB} />
          <span className={s.puffC} />
          <span className={s.puffD} />
        </div>
        <div className={`${s.bank} ${s.bankR}`} aria-hidden="true">
          <span className={s.puffA} />
          <span className={s.puffB} />
          <span className={s.puffC} />
          <span className={s.puffD} />
        </div>

        <div className={s.finaleInner}>
          <p className={s.coda}>
            Challenging the impossible. Building it with our own hands.
          </p>
          <footer className={s.footer}>
            <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
