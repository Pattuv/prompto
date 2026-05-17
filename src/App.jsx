import Navbar from './components/Navbar';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <div className="app-shell">
      <CursorFollower />

      <div className="app-shell__content">
        <Navbar />

        <main className="app-main">
          <div className="app-main__content">
            <h1 className="hero-heading font-semibold">
              Enhance your prompts for
              <br />
              better AI output.
            </h1>

            <div className="prompt-block">
              <div className="prompt-glow" aria-hidden="true" />
              <div className="prompt-card">
                <textarea
                  className="prompt-input"
                  placeholder="Enter your prompt here..."
                  rows={6}
                />
                <div className="prompt-actions">
                  <div className="prompt-pills">
                    <button type="button" className="pill-btn">
                      Code
                    </button>
                    <button type="button" className="pill-btn">
                      Image
                    </button>
                    <button type="button" className="pill-btn">
                      Video
                    </button>
                  </div>
                  <button type="button" className="enhance-btn">
                    <i className="bi bi-stars" aria-hidden="true" />
                    Enhance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          Crafted with <span className="text-red-500">❤️</span> by Pratyush
        </footer>
      </div>
    </div>
  );
}

export default App;
