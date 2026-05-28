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
        const sections = document.querySelectorAll('section');
        const handleScrollSpy = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = '#' + section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScrollSpy);
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

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Case Studies', href: '#casestudies' },
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
                                        onClick={closeMenu}
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
                                    onClick={closeMenu}
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
