export default function Home() {
  return (
    <main>
      <div className="container">
        <header className="header">
          <a className="wordmark" href="/">
            Astu Neon
          </a>
        </header>

        <section className="hero">
          <h1>An ecosystem for resilience and innovation.</h1>
          <p>
            Prompting our clients to dream bigger. What if we, just you and I,
            built a whole economy? Here, there are no ceilings — only horizons.
          </p>
          <a className="cta" href="mailto:dave@astuneon.co">
            Step Through
          </a>
        </section>

        <section className="houses">
          <h2>The Houses of Astu Neon</h2>
          <div className="house-grid">
            <div className="house">
              <h3>Olive Oil</h3>
              <p>
                A sun-drenched paradise, bottled. The door to Puglia, its
                heritage, and elegance refined to its purest expression.
              </p>
              <a href="https://myastuneon.com">myastuneon.com</a>
            </div>
            <div className="house">
              <h3>Platform</h3>
              <p>
                Technology built with 80% Italian hands, codes, and minds —
                connecting travelers to the living culture of Puglia.
              </p>
              <a href="https://astuneon.ai">astuneon.ai</a>
            </div>
            <div className="house">
              <h3>Studio</h3>
              <p>
                Stories of the people and places challenging the impossible,
                told in documentary form.
              </p>
              <a href="https://astuneon.studio">astuneon.studio</a>
            </div>
            <div className="house">
              <h3>Consulting</h3>
              <p>
                A cure to the myopic life — helping builders ask the most
                impossible questions, then answer them.
              </p>
              <a href="https://astuneon.tech">astuneon.tech</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Astu Neon, Inc.</span>
          <span>Because dreaming belongs to everyone.</span>
        </footer>
      </div>
    </main>
  );
}
