import React from 'react';
import Navbar from './components/Navbar';
import HeroTop from './components/HeroTop';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Capabilities from './components/Capabilities';
import MusicWidget from './components/MusicWidget';
import SectionWrapper from './components/SectionWrapper';
import ContactCardSection from "./components/ContactCardSection";
import PoweringTheFuture from "./components/PoweringTheFuture";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <HeroTop />
                <Hero />

                <SectionWrapper id="about">
                    <About />
                </SectionWrapper>

                <SectionWrapper id="experience">
                    <Experience />
                </SectionWrapper>

                <SectionWrapper id="capabilities">
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

                <SectionWrapper id="contact">
                    <div className="container">
                        <div className="contact-card">
                            <h3>Get in Touch</h3>
                            <p className="contact-subtext">Open to product design opportunities and thoughtful collaborations.</p>
                            <div className="contact-links">
                                <a href="mailto:brahmanshu.verma@example.com" className="contact-link">Email</a>
                                <span className="separator">•</span>
                                <a href="https://linkedin.com/in/brahmanshu-verma" target="_blank" rel="noopener noreferrer"
                                    className="contact-link">LinkedIn</a>
                                <span className="separator">•</span>
                                <a href="https://behance.net/brahmanshu-verma" target="_blank" rel="noopener noreferrer"
                                    className="contact-link">Behance</a>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                <PoweringTheFuture />
            </main>

            <MusicWidget />
        </>
    )
}

export default App;
