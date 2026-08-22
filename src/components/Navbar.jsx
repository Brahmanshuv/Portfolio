import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import hamburgerAnimation from '../../assets/Hamburger Menu to X.json';

const MenuToggle = React.memo(({ isMenuOpen, toggleMenu }) => {
    return (
        <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
        >
            <div className="hamburger-icon">
                <span className="hamburger-line hamburger-line-1"></span>
                <span className="hamburger-line hamburger-line-2"></span>
            </div>
        </button>
    );
});

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Handle Scroll Effect for Header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Scroll Spy
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const handleScrollSpy = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    const id = section.getAttribute('id');
                    if (id && id !== 'home') {
                        current = '#' + id;
                    }
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        handleScrollSpy();
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    // Close mobile menu on resize (e.g., orientation change)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = ''; // Clean up on unmount
        };
    }, [isMenuOpen]);

    const toggleMenu = React.useCallback(() => {
        setIsMenuOpen(prev => {
            const newState = !prev;
            document.body.style.overflow = newState ? 'hidden' : '';
            return newState;
        });
    }, []);

    const closeMenu = React.useCallback(() => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    }, []);

    const handleNavClick = (e, href) => {
        closeMenu();
        if (href === '#home') {
            e.preventDefault();
            if (window.lenis) {
                window.lenis.scrollTo(0, { duration: 1.0 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setActiveSection('');
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    };

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
                <div className="container header-content">
                    {/* Desktop nav — visible on large screens, hidden on mobile */}
                    <nav className="nav-menu nav-desktop">
                        <ul>
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={activeSection === link.href ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <div
                className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={closeMenu}
                aria-hidden="true"
            ></div>

            {/* Mobile Sidebar & Toggle Wrapper */}
            <div className={`mobile-menu-wrapper ${isMenuOpen ? 'active' : ''}`}>
                <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

                <nav className="nav-menu nav-mobile">
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.name + '-mobile'}>
                                <a
                                    href={link.href}
                                    className={activeSection === link.href ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
