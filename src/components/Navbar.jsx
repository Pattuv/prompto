import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="navbar bg-base-100 px-0 min-h-14 py-4">
            <div className="flex-1">
                <a className="btn btn-ghost text-base md:text-lg font-medium px-4">
                    promptFixer
                </a>
            </div>

            <div className="hidden md:flex flex-none items-center gap-2">
                <a
                    className="github-btn text-2xl"
                    href="https://github.com/Pattuv/promptFixer"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i className="bi bi-github"></i>
                </a>
                <a
                    href="https://pratyushv.vercel.app/"
                    className="custom-btn text-sm font-medium -mr-0.5"
                    target="_blank"
                    rel="noreferrer"
                >
                    More by me
                </a>
            </div>

            <div className="md:hidden flex-none relative">
                <button
                    type="button"
                    className="hamburger-btn text-2xl p-2"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
                </button>

                <div
                    className={`mobile-menu absolute right-0 top-full mt-2 min-w-50 z-50 ${
                        isMenuOpen ? 'mobile-menu--open' : 'mobile-menu--closed'
                    }`}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="flex flex-col gap-3">
                        <a
                            className="github-btn text-xl flex items-center gap-2 hover:text-gray-600 transition-colors"
                            href="https://github.com/Pattuv/promptFixer"
                            target="_blank"
                            rel="noreferrer"
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            <i className="bi bi-github"></i>
                            <span className="text-sm">GitHub</span>
                        </a>
                        <a
                            href="https://pratyushv.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="custom-btn text-sm font-medium text-center"
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            More by me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
