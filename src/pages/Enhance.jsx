import Navbar2 from "../components/Navbar2";

function Enhance() {
  return (
    <div className="app-shell">
      <div className="app-shell__content">
        <Navbar2 />

        <main className="app-main app-main--enhance">
          <div className="app-main__content app-main__content--left">
            <p className="text-sm font-medium px-1">
              <i className="bi bi-stars mr-2 text-[#5a91ff]" aria-hidden="true" />
              Enhanced Prompt
            </p>
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
