import { useState } from 'react';
import emblem from '../assets/emblem.png';

function Navbar2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="navbar bg-base-100 px-0 min-h-14 py-6 bg-transparent">
            <div className="flex-1 flex items-center justify-start min-w-0">
                <a href="/" className="navbar-brand">
                    <img src={emblem} alt="" className="navbar-brand__emblem" />
                    <span className="navbar-brand__title">prompto</span>
                </a>
            </div>

            <div className="hidden md:flex flex-none items-center gap-2">
                <button type="button" className="btn rounded-full border-gray-300" aria-label="Regenerate">
                    <i className="bi bi-arrow-repeat mr-1" aria-hidden="true" /> Revise
                </button>
                <a href="/" type="button" className="btn rounded-full border border-gray-300" aria-label="Edit">
                    <i className="bi bi-pencil-square mr-1" aria-hidden="true" /> New Prompt
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
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="custom-btn custom-btn--icon text-sm font-medium"
                            aria-label="Regenerate"
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            <i className="bi bi-arrow-repeat" aria-hidden="true" /> Revise
                        </button>
                        <button
                            type="button"
                            className="custom-btn custom-btn--icon text-sm font-medium text-center"
                            aria-label="Edit"
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            <i className="bi bi-pencil-square" aria-hidden="true" /> New Prompt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar2;
