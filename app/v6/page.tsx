import Logo from "../Logo";
import ArchRings from "./ArchRings";
import s from "./page.module.css";

/* Adobe Stock comps (watermarked previews — license before launch):
   #199729251 Ostuni hilltop · #486041020 Monopoli at dusk */
const IMG = {
  ostuni:
    "https://t3.ftcdn.net/jpg/01/99/72/92/240_F_199729251_uq77cGEiDbMSeFBwi1rQpV5D5lpuaBAK.jpg",
  dusk: "https://t3.ftcdn.net/jpg/04/86/04/10/240_F_486041020_t6WRwb2QyMwWn6Eoy4LIJMz1Am1eRuqI.jpg",
};

export default function Soglia() {
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <nav className={s.nav} aria-label="Versions">
          <a href="/v1">I</a>
          <a href="/v2">II</a>
          <a href="/v3">III</a>
          <a href="/v4">IV</a>
          <a href="/v5">V</a>
          <a href="/v6" aria-current="page">
            VI
          </a>
        </nav>
      </header>

      <section className={s.threshold}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>

        <div className={s.portaWrap} aria-hidden="true">
          <ArchRings className={s.rings} />
          <div className={s.porta}>
            <img src={IMG.ostuni} alt="" />
          </div>
        </div>
      </section>

      <section
        className={s.beyond}
        style={{ backgroundImage: `url(${IMG.dusk})` }}
      >
        <div className={s.shade} aria-hidden="true" />
        <div className={s.beyondInner}>
          <p className={s.answer}>
            At Astu Neon, we don’t shy away from these challenges, we answer
            them. Opening doors, stepping into a boundless universe. An
            invitation to connection, the exchange of ideas, and a dynamic
            life. Because dreaming belongs to everyone. It is a catalyst for
            belonging, giving us a seat at our table where we remember our most
            naive, uninhibited dreams: to reach the moon, to create new things,
            to heal.
          </p>
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
