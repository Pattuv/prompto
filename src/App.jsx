import { useState } from "react";
import Navbar from "./components/Navbar";
import CursorFollower from "./components/CursorFollower";
import StripedPattern from "./components/StripedPattern";

const PROMPT_PILLS = [
  { id: "code", label: "Code", icon: "bi-braces", iconClass: "mr-1" },
  { id: "image", label: "Image", icon: "bi-image", iconClass: "mr-2" },
  { id: "video", label: "Video", icon: "bi-camera-reels", iconClass: "mr-2" },
];

function App() {
  const [activePill, setActivePill] = useState(null);

  const togglePill = (id) => {
    setActivePill((current) => (current === id ? null : id));
  };
  return (
    <div className="app-shell">
      <div className="app-shell__stripes" aria-hidden="true">
        <StripedPattern
          className="text-neutral-400/25"
          width={10}
          height={10}
        />
      </div>

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
                    {PROMPT_PILLS.map(({ id, label, icon, iconClass }) => (
                      <button
                        key={id}
                        type="button"
                        className={`pill-btn${activePill === id ? " pill-btn--active" : ""}`}
                        aria-pressed={activePill === id}
                        onClick={() => togglePill(id)}
                      >
                        <i className={`bi ${icon} ${iconClass}`} aria-hidden="true" />
                        {label}
                      </button>
                    ))}
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
          Crafted with <span className=" mx-1">❤︎⁠</span> by Pratyush
        </footer>
      </div>
    </div>
  );
}

export default App;
