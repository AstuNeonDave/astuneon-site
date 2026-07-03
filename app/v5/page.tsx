import Logo from "../Logo";
import OliveBranch from "./OliveBranch";
import VersionNav from "../VersionNav";
import s from "./page.module.css";

/* Adobe Stock comps (watermarked previews — license before launch):
   #199729251 Ostuni hilltop · #266610235 olive branch detail ·
   #315333160 olive plantation panorama */
const IMG = {
  ostuni:
    "https://t3.ftcdn.net/jpg/01/99/72/92/240_F_199729251_uq77cGEiDbMSeFBwi1rQpV5D5lpuaBAK.jpg",
  branch:
    "https://t3.ftcdn.net/jpg/02/66/61/02/240_F_266610235_RNlZob679xOyOO5ehWow0bIxCDzoguYy.jpg",
  pano: "https://t4.ftcdn.net/jpg/03/15/33/31/240_F_315333160_lIgdi1voq2fkUWLeOLbRcj3fb52lGzCs.jpg",
};

export default function Rivista() {
  return (
    <main className={s.page}>
      <header className={s.masthead}>
        <VersionNav className={s.nav} current={5} />
        <a className={s.logoLink} href="/">
          <Logo className={s.logo} />
        </a>
        <div className={s.mastRule} aria-hidden="true" />
      </header>

      <section className={s.spread}>
        <h1 className={s.question}>
          What if we, just you and I, built a whole economy? Bottled a
          sun-drenched paradise to share around a table? What if we asked the
          most impossible questions, stowed away a myopic life?
        </h1>
        <figure className={s.plate}>
          <img src={IMG.ostuni} alt="" />
        </figure>
      </section>

      <section className={s.columns}>
        <div className={s.margina} aria-hidden="true">
          <OliveBranch className={s.branchArt} />
        </div>
        <p className={s.bodyText}>
          At Astu Neon, we don’t shy away from these challenges, we answer
          them. Opening doors, stepping into a boundless universe. An
          invitation to connection, the exchange of ideas, and a dynamic life.
          Because dreaming belongs to everyone. It is a catalyst for belonging,
          giving us a seat at our table where we remember our most naive,
          uninhibited dreams: to reach the moon, to create new things, to heal.
        </p>
        <figure className={s.sidePlate}>
          <img src={IMG.branch} alt="" />
        </figure>
      </section>

      <section className={s.panoWrap}>
        <figure className={s.pano}>
          <img src={IMG.pano} alt="" />
        </figure>
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
