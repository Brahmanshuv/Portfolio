import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroTop from './components/HeroTop';
import Experience from './components/Experience';
import SelectedWork from './components/SelectedWork';
import Capabilities from './components/Capabilities';
import MusicWidget from './components/MusicWidget';
import SectionWrapper from './components/SectionWrapper';
import ContactCardSection from './components/ContactCardSection';
import PoweringTheFuture from './components/PoweringTheFuture';
import LoadingScreen from './components/LoadingScreen';
import GlobalBackground from './components/GlobalBackground';
import Lenis from '@studio-freight/lenis';
import HomeGridOverlay from './components/HomeGridOverlay';
import ProjectDetail from './components/ProjectDetail';
import { projectsData } from './data/projects';
import { projectsRegistry } from './projects/registry';

// Feature toggle to easily show/hide the scroll-driven typography section at the bottom
const SHOW_POWERING_THE_FUTURE = false;

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // Sync client-side SPA routing pathname
    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handleLocationChange);
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.55,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential deceleration curve
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.15,
            smoothTouch: false,
            touchMultiplier: 2.2,
            infinite: false,
        });

        // Globally expose for custom router navigation
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    // Route matching selectors
    const isProjectPage = currentPath.startsWith('/projects/');
    const projectSlug = isProjectPage ? currentPath.split('/projects/')[1] : null;
    const currentProject = projectsData.find(p => p.slug === projectSlug);
    const RegisteredProjectComponent = isProjectPage ? projectsRegistry[projectSlug] : null;

    return (
        <>
            <GlobalBackground />

            {/* Loading screen — AnimatePresence handles the smooth exit unmount */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen
                        key="loader"
                        onComplete={() => setIsLoading(false)}
                    />
                )}
            </AnimatePresence>

            {isProjectPage ? (
                RegisteredProjectComponent ? (
                    <RegisteredProjectComponent />
                ) : (
                    <ProjectDetail project={currentProject} />
                )
            ) : (
                <div className="home-page">
                    <HomeGridOverlay />
                    <Navbar />
                    <main>
                        <HeroTop />

                        <SectionWrapper id="experience" animate={false}>
                            <Experience />
                        </SectionWrapper>

                        <SectionWrapper id="work" animate={false}>
                            <SelectedWork />
                        </SectionWrapper>

                        <SectionWrapper id="skills" animate={false}>
                            <Capabilities />
                        </SectionWrapper>

                        <ContactCardSection />

                        {SHOW_POWERING_THE_FUTURE && <PoweringTheFuture />}
                    </main>
                </div>
            )}

            <MusicWidget />
        </>
    );
}

export default App;
