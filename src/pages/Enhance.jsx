import Navbar2 from "../components/Navbar2";
import loadingImg from "../assets/loading.png";

function Enhance() {
  return (
    <div className="app-shell text-center">
      <div className="app-shell__content page-fade-in">
        <Navbar2 />

        <main className="app-main">
          <div
            className="flex flex-col items-center"
            role="status"
            aria-live="polite"
            aria-label="Enhancing prompt"
          >
            <img
              src={loadingImg}
              alt=""
              className="w-20 h-auto"
              aria-hidden="true"
            />
            <p className="text-xl font-semibold">Enhancing prompt...</p>
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
