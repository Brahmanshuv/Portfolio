import React from 'react';

const Experience = () => {
    return (
        <section id="experience">
            <div className="container section-grid">
                <div className="section-title">
                    <h3>Experience</h3>
                </div>
                <div className="experience-list">

                    {/* Role 1 */}
                    <div className="experience-item hidden-animate">
                        <div className="experience-header">
                            <span className="exp-number">/01</span>
                            <h4 className="exp-title">UI/UX Designer — Freelance</h4>
                            <span className="exp-date">2024 — Present</span>
                        </div>
                        <div className="exp-body">
                            <p className="exp-desc">Designing product interfaces and UX solutions across domains like education, sustainability, and food delivery.</p>
                            <ul className="exp-bullets">
                                <li>Led wireframes to high-fidelity screens</li>
                                <li>User flows, prototypes, basic research synthesis</li>
                            </ul>
                        </div>
                    </div>

                    {/* Role 2 */}
                    <div className="experience-item hidden-animate">
                        <div className="experience-header">
                            <span className="exp-number">/02</span>
                            <h4 className="exp-title">3D Visualizer Intern — Inverted</h4>
                            <span className="exp-date">2024</span>
                        </div>
                        <div className="exp-body">
                            <p className="exp-desc">Created 20+ assets for a battery product launch, focusing on visual storytelling and brand alignment.</p>
                            <ul class="exp-bullets">
                                <li>Modeled and rendered product visuals</li>
                                <li>Collaborated with marketing for launch assets</li>
                            </ul>
                        </div>
                    </div>

                    {/* Role 3 */}
                    <div className="experience-item hidden-animate">
                        <div className="experience-header">
                            <span className="exp-number">/03</span>
                            <h4 className="exp-title">UI/UX Design Intern — Redtape</h4>
                            <span className="exp-date">2023</span>
                        </div>
                        <div className="exp-body">
                            <p className="exp-desc">Conducted research and usability testing to improve task completion.</p>
                            <ul className="exp-bullets">
                                <li>Created wireframes and prototypes</li>
                                <li>Reduced support queries through design improvements</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
