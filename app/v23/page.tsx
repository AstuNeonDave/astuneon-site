"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V23 — "L'Alba" · fourth draft.
   - One scroll action completes the overture (auto-tween).
   - One scroll action at the dial summons all pointers in sequence,
     then each star takes a spotlight turn — glowing bright while its
     name fades in and out — before the sky settles into the beckon
     cycle with hover-to-name.
   - No clouds: the coda stands golden in the dawn. */

const C = 500;
const CY = 590;
const R1 = 348;
const R_LABEL = 448;
const BEACON = 1.3;
const REVEAL_MS = 430; /* between pointer arrivals */
const SPOT_MS = 1600; /* each star's spotlight turn */

function angleOf(i: number, n: number) {
  return ((-90 + ((i + 0.5) * 360) / n) * Math.PI) / 180;
}

function pointerPath(i: number, n: number) {
  const a = angleOf(i, n);
  const perp = a + Math.PI / 2;
  const r0 = 140;
  const w = 13;
  const wm = 4;
  const rm = r0 + (R1 - r0) * 0.5;
  const px = (r: number, off: number, dir: number) =>
    (C + r * Math.cos(a) + dir * off * Math.cos(perp)).toFixed(1);
  const py = (r: number, off: number, dir: number) =>
    (CY + r * Math.sin(a) + dir * off * Math.sin(perp)).toFixed(1);
  return `M${px(r0, w, 1)},${py(r0, w, 1)} Q${px(rm, wm, 1)},${py(
    rm,
    wm,
    1
  )} ${px(R1, 0, 0)},${py(R1, 0, 0)} Q${px(rm, wm, -1)},${py(rm, wm, -1)} ${px(
    r0,
    w,
    -1
  )},${py(r0, w, -1)} Z`;
}

function tipPos(i: number, n: number) {
  const a = angleOf(i, n);
  return { x: C + R1 * Math.cos(a), y: CY + R1 * Math.sin(a), a };
}

function labelLayout(i: number, n: number) {
  const a = angleOf(i, n);
  const x = C + R_LABEL * Math.cos(a);
  const y = CY + R_LABEL * Math.sin(a);
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  if (cos > 0.25) return { x: x + 6, y: y + 4, anchor: "start" as const };
  if (cos < -0.25) return { x: x - 6, y: y + 4, anchor: "end" as const };
  return { x, y: y + (sin > 0 ? 26 : -18), anchor: "middle" as const };
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

type Phase = "intro" | "free" | "dial";

export default function Alba() {
  const n = BRANCHES.length;
  const mainRef = useRef<HTMLElement | null>(null);
  const astroRef = useRef<HTMLElement | null>(null);

  const phaseRef = useRef<Phase>("intro");
  const introStarted = useRef(false);
  const dialTriggered = useRef(false);
  const dialDoneRef = useRef(false);
  const revealedRef = useRef(0);
  const lastY = useRef(0);
  const touchY = useRef(0);
  const timers = useRef<number[]>([]);

  const [phase, setPhase] = useState<Phase>("intro");
  const [revealed, setRevealed] = useState(0);
  const [spot, setSpot] = useState(-1);
  const [cycling, setCycling] = useState(false);
  const [whisper, setWhisper] = useState(false);

  const goPhase = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  /* the overture plays once per load — always start at the top */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    /* for the ones who look where no one looks */
    console.log(
      "%c“Always do the right thing when no one is looking.”",
      "font-style: italic; font-size: 14px; color: #c9a35c;"
    );
    const t = timers.current;
    return () => t.forEach((id) => window.clearInterval(id));
  }, []);

  /* the third belief appears only when no one is looking */
  useEffect(() => {
    let t = 0;
    const arm = () => {
      setWhisper(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setWhisper(true), 60000);
    };
    arm();
    const evs = ["scroll", "mousemove", "keydown", "touchstart"];
    evs.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    return () => {
      window.clearTimeout(t);
      evs.forEach((e) => window.removeEventListener(e, arm));
    };
  }, []);

  /* lock the page while a gate is active */
  useEffect(() => {
    document.body.style.overflow = phase === "free" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    /* one scroll: the mark dissolves on its own */
    const startIntro = () => {
      if (introStarted.current) return;
      introStarted.current = true;
      const m = mainRef.current;
      const t0 = performance.now();
      const dur = 1300;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        m?.style.setProperty("--intro", e.toFixed(3));
        if (p < 1) requestAnimationFrame(tick);
        else goPhase("free");
      };
      requestAnimationFrame(tick);
    };

    /* one scroll: the pointers arrive in sequence, then the spotlight
       pass, then the beckon cycle */
    const startDial = () => {
      if (dialTriggered.current) return;
      dialTriggered.current = true;
      const step = () => {
        if (revealedRef.current >= n) return;
        revealedRef.current += 1;
        setRevealed(revealedRef.current);
        if (revealedRef.current >= n) {
          timers.current.forEach((id) => window.clearInterval(id));
          timers.current = [];
          dialDoneRef.current = true;
          goPhase("free");
          let k = 0;
          setSpot(0);
          const show = window.setInterval(() => {
            k += 1;
            if (k >= n) {
              window.clearInterval(show);
              setSpot(-1);
              setCycling(true);
            } else {
              setSpot(k);
            }
          }, SPOT_MS);
          timers.current.push(show);
        }
      };
      step();
      const id = window.setInterval(step, REVEAL_MS);
      timers.current.push(id);
    };

    const consume = (delta: number) => {
      if (phaseRef.current === "intro") {
        if (delta > 10) startIntro();
      } else if (phaseRef.current === "dial") {
        if (delta > 10) startDial();
        else if (delta < -10 && !dialTriggered.current) {
          goPhase("free"); /* let the visitor climb back up */
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== "free") {
        e.preventDefault();
        consume(e.deltaY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== "free") {
        e.preventDefault();
        const cur = e.touches[0]?.clientY ?? 0;
        consume(touchY.current - cur);
        touchY.current = cur;
      }
    };

    const onScroll = () => {
      const m = mainRef.current;
      if (!m) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      lastY.current = y;

      /* a scrollbar drag ends the overture instantly */
      if (phaseRef.current === "intro" && y > 10 && !introStarted.current) {
        introStarted.current = true;
        m.style.setProperty("--intro", "1");
        goPhase("free");
      }

      /* stars give way to dawn */
      const total = document.documentElement.scrollHeight - vh;
      const p = total > 0 ? y / total : 0;
      const fade = Math.min(1, Math.max(0, (p - 0.45) / 0.32));
      m.style.setProperty("--starfade", (1 - fade).toFixed(3));

      /* the dial gate: lock when the astrolabe reaches center, going down */
      if (
        phaseRef.current === "free" &&
        !dialDoneRef.current &&
        goingDown &&
        astroRef.current
      ) {
        const r = astroRef.current.getBoundingClientRect();
        const off = r.top + r.height / 2 - vh / 2;
        if (off < 40 && off > -r.height / 2) {
          goPhase("dial");
          window.scrollTo({ top: y + off, behavior: "auto" });
        }
      }
    };

    mainRef.current?.style.setProperty("--intro", "0");
    onScroll();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      ref={mainRef}
      className={`${s.page} ${phase !== "intro" ? s.introDone : ""}`}
    >
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

      {/* the overture — fixed overlay; only the mark, only on arrival */}
      {phase === "intro" && (
        <div className={s.overture} aria-hidden="true">
          <Logo className={s.overtureLogo} />
        </div>
      )}

      {/* the true top of the site */}
      <section className={s.top}>
        <div className={s.corner}>
          <a className={s.logoLink} href="/">
            <Logo className={s.cornerLogo} />
          </a>
          <VersionNav className={s.nav} current={23} />
        </div>

        <div className={s.topQuestion}>
          <h1 className={s.question}>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
        </div>

        {/* one unmarked star keeps the third belief */}
        <div className={s.secret}>
          <span className={s.secretStar} aria-hidden="true" />
          <span className={s.secretText}>
            “Always do the right thing when no one is looking.”
          </span>
        </div>
      </section>

      {/* the dial — locks centered; one scroll summons the pointers */}
      <section
        ref={astroRef}
        className={`${s.instrument} ${cycling ? s.cycling : ""}`}
      >
        <svg
          className={s.dial}
          viewBox="0 0 1000 1080"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
        >
          <circle cx={C} cy={116} r={26} strokeWidth="2.4" opacity="0.85" />
          <circle cx={C} cy={116} r={17} strokeWidth="1" opacity="0.5" />
          <path
            d="M448,206 C452,168 470,152 486,146 C480,132 496,124 500,138 C504,124 520,132 514,146 C530,152 548,168 552,206"
            strokeWidth="2"
            opacity="0.85"
          />
          <path d="M448,206 Q500,190 552,206" strokeWidth="2" opacity="0.85" />

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

          {BRANCHES.map((b, i) => {
            const t = tipPos(i, n);
            const lab = labelLayout(i, n);
            const shown = i < revealed;
            const lit = spot === i;
            return (
              <a
                key={b.domain}
                href={b.href}
                className={`${s.pointer} ${shown ? s.shown : ""} ${
                  lit ? s.spotlight : ""
                }`}
              >
                <path
                  d={pointerPath(i, n)}
                  strokeWidth="1.6"
                  className={s.blade}
                />
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="5"
                  className={s.tipStar}
                  style={
                    {
                      "--beckonDelay": `${i * BEACON}s`,
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

        {/* arrives only after the spotlight pass has said it visually */}
        <p className={s.dialCaption}>Ideas power everything</p>
      </section>

      {/* the answer, and the coda golden in the dawn */}
      <section className={s.closing}>
        <div className={s.sun} aria-hidden="true" />

        <p className={s.answer}>
          At Astu Neon, we don’t shy away from these challenges, we answer
          them. Opening doors, stepping into a boundless universe. An
          invitation to connection, the exchange of ideas, and a dynamic life.
          Because dreaming belongs to everyone. It is a catalyst for belonging,
          giving us a seat at our table where we remember our most naive,
          uninhibited dreams: to reach the moon, to create new things, to heal.
        </p>

        <p className={s.epigraph}>
          “It always seems impossible until it is done.”
          <span className={s.epigraphAttr}>— Nelson Mandela</span>
        </p>

        <p className={s.coda}>
          Challenging the impossible. Building it with our own hands.
        </p>

        <footer className={s.footer}>
          <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
        </footer>
      </section>

      {/* surfaces only after a minute of stillness */}
      <div
        className={`${s.whisper} ${whisper ? s.whisperOn : ""}`}
        aria-hidden="true"
      >
        “Always do the right thing when no one is looking.”
      </div>
    </main>
  );
}
