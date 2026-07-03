import Logo from "../Logo";
import VersionNav from "../VersionNav";
import { BRANCHES } from "../branches";
import s from "./page.module.css";

/* V8 — "Le Porte": the parent is the house; every venture is a door in its
   colonnade. Doors render from the array — a new venture is a new door. */

export default function LePorte() {
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <VersionNav className={s.nav} current={8} />
      </header>

      <section className={s.hero}>
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
      </section>

      <section className={s.colonnade}>
        {BRANCHES.map((b, i) => (
          <a key={b.domain} className={s.door} href={b.href}>
            <span
              className={s.arch}
              style={{ animationDelay: `${i * 0.7}s` }}
              aria-hidden="true"
            />
            <span className={s.doorDomain}>{b.domain}</span>
            <span className={s.doorLabel}>
              {b.label}
              {b.note ? ` · ${b.note}` : ""}
            </span>
          </a>
        ))}
      </section>

      <p className={s.coda}>
        Challenging the impossible. Building it with our own hands.
      </p>

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
      </footer>
    </main>
  );
}
