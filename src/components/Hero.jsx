import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="container hero-content">
                <h2 className="hero-headline">Designing clear, scalable digital products through systems thinking and visual precision.</h2>
                <p className="hero-subtext">Research-driven product design with a strong focus on clarity, interaction systems, and purposeful visuals.</p>
                <div className="hero-identity">
                    <h1 className="hero-name">Brahmanshu Verma</h1>
                    <p className="hero-role">Product Designer · UI/UX · Product Systems · 3D Visualization</p>
                </div>
                <div className="cta-group">
                    <a href="#contact" className="outline-box">
                        <div className="outline-content">Contact</div>
                    </a>
                    <a href="#experience" className="btn btn-secondary">Projects</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
