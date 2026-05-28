import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroTop from './components/HeroTop';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Capabilities from './components/Capabilities';
import MusicWidget from './components/MusicWidget';
import SectionWrapper from './components/SectionWrapper';
import ContactCardSection from './components/ContactCardSection';
import PoweringTheFuture from './components/PoweringTheFuture';
import LoadingScreen from './components/LoadingScreen';
import GlobalBackground from './components/GlobalBackground';

// Feature toggle to easily show/hide the scroll-driven typography section at the bottom
const SHOW_POWERING_THE_FUTURE = false;

function App() {
    const [isLoading, setIsLoading] = useState(true);

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

            <Navbar />
            <main>
                <HeroTop />

                <SectionWrapper id="about">
                    <About />
                </SectionWrapper>

                <SectionWrapper id="experience">
                    <Experience />
                </SectionWrapper>

                <SectionWrapper id="projects">
                    <Projects />
                </SectionWrapper>

                <SectionWrapper id="skills">
                    <Capabilities />
                </SectionWrapper>

                <SectionWrapper id="resume">
                    <div className="container">
                        <div className="resume-card">
                            <h3>Resume</h3>
                            <p className="resume-summary">Download a PDF version of my resume for a detailed overview of my
                                experience and skills.</p>
                            <a href="#" className="btn btn-primary" download>Download Resume (PDF)</a>
                        </div>
                    </div>
                </SectionWrapper>

                <ContactCardSection />

                {SHOW_POWERING_THE_FUTURE && <PoweringTheFuture />}
            </main>

            <MusicWidget />
        </>
    );
}

export default App;
