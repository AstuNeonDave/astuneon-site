import Logo from "./Logo";

export default function Home() {
  return (
    <main>
      {/* Graphical treatment — decorative only */}
      <div className="scene" aria-hidden="true">
        <div className="glow glow-warm" />
        <div className="glow glow-cool" />
        <Logo className="ghost-mark" />
        <div className="vignette" />
        <div className="grain" />
      </div>

      <div className="container">
        <header className="header">
          <a className="logo-link" href="/">
            <Logo className="logo" />
          </a>
        </header>

        <section className="hero">
          <span className="rule" aria-hidden="true" />
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

        <footer className="footer">
          <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
        </footer>
      </div>
    </main>
  );
}
