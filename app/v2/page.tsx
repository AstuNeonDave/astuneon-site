import Logo from "../Logo";
import s from "./page.module.css";

export default function Porta() {
  return (
    <main className={s.page}>
      <div className={s.scene} aria-hidden="true">
        <div className={s.doorHalo} />
        <div className={s.door} />
        <div className={s.grain} />
      </div>

      <div className={s.container}>
        <header className={s.header}>
          <a className={s.logoLink} href="/">
            <Logo className={s.logo} />
          </a>
          <nav className={s.nav} aria-label="Versions">
            <a href="/v1">I</a>
            <a href="/v2" aria-current="page">
              II
            </a>
            <a href="/v3">III</a>
          </nav>
        </header>

        <section className={s.hero}>
          <h1>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
          <p>
            At Astu Neon, we don’t shy away from these challenges, we answer
            them. Opening doors, stepping into a boundless universe. An
            invitation to connection, the exchange of ideas, and a dynamic
            life. Because dreaming belongs to everyone. It is a catalyst for
            belonging, giving us a seat at our table where we remember our most
            naive, uninhibited dreams: to reach the moon, to create new things,
            to heal. Challenging the impossible. Building it with our own
            hands.
          </p>
        </section>

        <footer className={s.footer}>
          <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
        </footer>
      </div>
    </main>
  );
}
