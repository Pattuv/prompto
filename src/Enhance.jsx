import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import { fetchResponse } from "./LLM.jsx";

const LOADING_FADE_MS = 500;

function Enhance() {
  const { prompt, pill } = useLocation().state ?? {};
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviseCount, setReviseCount] = useState(0);
  const copyTimeoutRef = useRef(null);

  const handleRevise = () => {
    if (!prompt) return;
    setReviseCount((count) => count + 1);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch (copyError) {
      console.error(copyError);
    }
  };

  useEffect(() => {
    if (!prompt) return;

    setResult(null);
    setError(null);
    setLoadingHidden(false);
    setShowResult(false);
    setResultVisible(false);

    const controller = new AbortController();
    let revealTimer;
    let fadeTimer;

    const revealResult = () => {
      revealTimer = window.setTimeout(() => {
        setShowResult(true);
        fadeTimer = window.setTimeout(() => setResultVisible(true), 50);
      }, LOADING_FADE_MS);
    };

    fetchResponse(prompt, pill, { signal: controller.signal })
      .then((data) => {
        setResult(data);
        setLoadingHidden(true);
        revealResult();
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(err instanceof Error ? err.message : "Request failed");
        setLoadingHidden(true);
        revealTimer = window.setTimeout(() => setShowResult(true), LOADING_FADE_MS);
        fadeTimer = window.setTimeout(() => setResultVisible(true), LOADING_FADE_MS + 50);
      });

    return () => {
      controller.abort();
      clearTimeout(revealTimer);
      clearTimeout(fadeTimer);
    };
  }, [prompt, pill, reviseCount]);

  return (
    <div className="app-shell text-center">
      <div className="app-shell__content page-fade-in">
        <Navbar2 onRevise={handleRevise} />

        <main className="app-main">
          <div
            className="flex flex-col items-center w-full"
            role="status"
            aria-live="polite"
            aria-label={result ? "Prompt enhanced" : error ? "Error" : "Enhancing prompt"}
          >
            <div className="enhance-stage">
              <div
                className={`enhance-loading${loadingHidden ? " enhance-loading--hidden" : ""}`}
                aria-hidden={loadingHidden}
              >
                <div className="enhance-loading__spinner" aria-hidden="true" />
                <p className="enhance-loading__text">Enhancing prompt...</p>
              </div>

              {showResult && error && (
                <div
                  className={`enhance-result-panel enhance-result-panel--error${
                    resultVisible ? " enhance-result-panel--visible" : ""
                  }`}
                >
                  <p className="enhance-result-panel__error">{error}</p>
                </div>
              )}

              {showResult && result && !error && (
                <div
                  className={`enhance-result-panel${
                    resultVisible ? " enhance-result-panel--visible" : ""
                  }`}
                >
                  <p className="text-md font-semibold whitespace-pre-wrap px-4 mb-5">
                    <i className="bi bi-stars mr-2" aria-hidden="true" />
                    Enhanced Prompt:
                  </p>
                  <div className="enhance-result-wrap">
                    <div className="enhance-result-card">
                      <button
                        type="button"
                        className={`enhance-result-copy${copied ? " enhance-result-copy--copied" : ""}`}
                        onClick={handleCopy}
                        aria-label={copied ? "Copied" : "Copy enhanced prompt"}
                      >
                        <i
                          className={`bi ${copied ? "bi-check" : "bi-copy"}`}
                          aria-hidden="true"
                        />
                      </button>
                      <p className="enhance-result-card__text">{result}</p>
                    </div>
                  </div>
                </div>
              )}
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

export default Enhance;
