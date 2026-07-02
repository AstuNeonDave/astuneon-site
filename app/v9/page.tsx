import Logo from "../Logo";
import Albero from "./Albero";
import s from "./page.module.css";

export default function LAlbero() {
  return (
    <main className={s.page}>
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
          <a href="/v9" aria-current="page">
            IX
          </a>
        </nav>
      </header>

      <section className={s.hero}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>
      </section>

      <section className={s.grove}>
        <Albero />
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
