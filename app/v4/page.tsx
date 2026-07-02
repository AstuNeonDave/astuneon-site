import Logo from "../Logo";
import s from "./page.module.css";

/* Adobe Stock comps (watermarked previews — license before launch):
   #199729251 Ostuni hilltop · #278410490 olive grove aerial ·
   #426846464 ancient olive tree · #486041020 Monopoli at dusk */
const IMG = {
  ostuni:
    "https://t3.ftcdn.net/jpg/01/99/72/92/240_F_199729251_uq77cGEiDbMSeFBwi1rQpV5D5lpuaBAK.jpg",
  grove:
    "https://t3.ftcdn.net/jpg/02/78/41/04/240_F_278410490_q79JYLRtYUvWcynOTXGzgIMM5y9zsMrY.jpg",
  tree: "https://t3.ftcdn.net/jpg/04/26/84/64/240_F_426846464_gecd4zQ2HargcM3rHqL0202wVbfabSR8.jpg",
  dusk: "https://t3.ftcdn.net/jpg/04/86/04/10/240_F_486041020_t6WRwb2QyMwWn6Eoy4LIJMz1Am1eRuqI.jpg",
};

export default function Viaggio() {
  return (
    <main className={s.page}>
      <nav className={s.nav} aria-label="Versions">
        <a href="/v4" aria-current="page">
          IV
        </a>
        <a href="/v5">V</a>
        <a href="/v6">VI</a>
        <a href="/v7">VII</a>
        <a href="/v8">VIII</a>
        <a href="/v9">IX</a>
      </nav>

      <section
        className={s.chapter}
        style={{ backgroundImage: `url(${IMG.ostuni})` }}
      >
        <div className={s.shade} aria-hidden="true" />
        <div className={s.chapterInner}>
          <Logo className={s.heroLogo} />
        </div>
      </section>

      <section
        className={s.chapter}
        style={{ backgroundImage: `url(${IMG.grove})` }}
      >
        <div className={s.shade} aria-hidden="true" />
        <div className={s.chapterInner}>
          <h1 className={s.question}>
            What if we, just you and I, built a whole economy? Bottled a
            sun-drenched paradise to share around a table? What if we asked the
            most impossible questions, stowed away a myopic life?
          </h1>
        </div>
      </section>

      <section
        className={s.chapter}
        style={{ backgroundImage: `url(${IMG.tree})` }}
      >
        <div className={s.shade} aria-hidden="true" />
        <div className={s.chapterInner}>
          <p className={s.answer}>
            At Astu Neon, we don’t shy away from these challenges, we answer
            them. Opening doors, stepping into a boundless universe. An
            invitation to connection, the exchange of ideas, and a dynamic
            life.
          </p>
        </div>
      </section>

      <section
        className={s.chapter}
        style={{ backgroundImage: `url(${IMG.dusk})` }}
      >
        <div className={s.shade} aria-hidden="true" />
        <div className={s.chapterInner}>
          <p className={s.answer}>
            Because dreaming belongs to everyone. It is a catalyst for
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
