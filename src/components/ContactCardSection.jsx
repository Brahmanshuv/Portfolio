import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactCardSection() {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Coordinate refs to keep tracking smooth, dampened, and zero-rerender
    const targetTilt = useRef({ x: 0, y: 0 });
    const currentTilt = useRef({ x: 0, y: 0 });
    const targetGlow = useRef({ x: 50, y: 50 });
    const currentGlow = useRef({ x: 50, y: 50 });
    const animationFrameId = useRef(null);

    const updateCardPosition = () => {
        if (!cardRef.current) {
            animationFrameId.current = null;
            return;
        }

        // Luxurious dampening speed (0.06 is extremely smooth, calm, and cinematic)
        const lerpFactor = 0.06;

        currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * lerpFactor;
        currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * lerpFactor;
        currentGlow.current.x += (targetGlow.current.x - currentGlow.current.x) * lerpFactor;
        currentGlow.current.y += (targetGlow.current.y - currentGlow.current.y) * lerpFactor;

        // Directly modify style transforms and CSS variables for maximum performance & fluid tracking
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg) translateY(-4px)`;
        cardRef.current.style.setProperty('--mouse-x', `${currentGlow.current.x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${currentGlow.current.y}%`);

        // Loop while there is noticeable coordinate difference
        const diffTiltX = Math.abs(targetTilt.current.x - currentTilt.current.x);
        const diffTiltY = Math.abs(targetTilt.current.y - currentTilt.current.y);
        const diffGlowX = Math.abs(targetGlow.current.x - currentGlow.current.x);
        const diffGlowY = Math.abs(targetGlow.current.y - currentGlow.current.y);

        if (diffTiltX > 0.005 || diffTiltY > 0.005 || diffGlowX > 0.02 || diffGlowY > 0.02) {
            animationFrameId.current = requestAnimationFrame(updateCardPosition);
        } else {
            animationFrameId.current = null;
        }
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // Target angles (max 6.5 degrees tilt for calmer, more elegant cinematic tracking)
        targetTilt.current.x = -((y - yc) / yc) * 6.5; 
        targetTilt.current.y = ((x - xc) / xc) * 6.5; 
        
        targetGlow.current.x = (x / rect.width) * 100;
        targetGlow.current.y = (y / rect.height) * 100;
        
        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(updateCardPosition);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(updateCardPosition);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        
        // Cancel outstanding animation loops
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }

        // Reset variables
        targetTilt.current = { x: 0, y: 0 };
        currentTilt.current = { x: 0, y: 0 };
        targetGlow.current = { x: 50, y: 50 };
        currentGlow.current = { x: 50, y: 50 };

        // Remove inline styles to allow CSS transition rules to restore centered state smoothly
        if (cardRef.current) {
            cardRef.current.style.transform = '';
            cardRef.current.style.setProperty('--mouse-x', '50%');
            cardRef.current.style.setProperty('--mouse-y', '50%');
        }
    };

    // Clean up animation frames on unmount
    useEffect(() => {
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Luxurious Apple ease-out curve
            }
        }
    };

    return (
        <section className="contact-card-section" id="contact">
            <div className="container">
                <motion.div 
                    className="contact-social-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                >
                    
                    {/* LEFT MAIN CARD */}
                    <motion.div 
                        ref={cardRef}
                        className={`socials-left-card ${isHovered ? 'hovered' : ''}`}
                        variants={itemVariants}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transition: isHovered 
                                ? 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease' 
                                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
                        }}
                    >
                        <span className="left-card-tag">Socials</span>
                        <div className="left-card-center">
                            <h2 className="left-card-name">Brahmanshu Verma</h2>
                            <p className="left-card-role">Product Designer</p>
                        </div>
                        <span className="left-card-location">
                            <span className="location-dot-container">
                                <span className="location-dot"></span>
                                <span className="location-dot-pulse"></span>
                            </span>
                            Gurugram
                        </span>
                    </motion.div>

                    {/* RIGHT STACKED SOCIAL BLOCKS */}
                    <motion.div className="socials-right-column" variants={containerVariants}>
                        
                        {/* Behance Row */}
                        <motion.a 
                            variants={itemVariants}
                            href="https://behance.net/brahmanshu-verma" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="contact-social-row"
                        >
                            <div className="social-icon-box bento-behance">
                                <span className="behance-logo-text">Bē</span>
                            </div>
                            <div className="social-content-box">
                                <div className="social-text-content">
                                    <h4 className="social-platform-title">Behance</h4>
                                    <span className="social-platform-sub">behance.net/brahmanshu-verma</span>
                                </div>
                                <span className="social-row-arrow">→</span>
                            </div>
                        </motion.a>

                        {/* Gmail Row */}
                        <motion.a 
                            variants={itemVariants}
                            href="mailto:brahmanshu.verma@example.com" 
                            className="contact-social-row"
                        >
                            <div className="social-icon-box bento-gmail">
                                <svg className="gmail-logo-svg" viewBox="0 0 24 24">
                                    {/* M shape with standard colorful segments */}
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="none" />
                                    <path d="M22 6c0-1.1-.9-2-2-2h-3v7.5L12 12.5l-5-1V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h3v-9.5l5 3.5 5-3.5V20h3c1.1 0 2-.9 2-2V6z" fill="none" />
                                    {/* Google colors segmentation */}
                                    <path d="M4 20h3v-9.5L12 14l5-3.5V20h3V6c0-1.1-.9-2-2-2h-3v7.5L12 12 7 9.5V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" fill="currentColor" className="gmail-fallback-path" />
                                    {/* Distinct segments for Google branding */}
                                    <path d="M3 20V6c0-.55.45-1 1-1h3v9.5L3 20z" fill="#4285F4" />
                                    <path d="M21 20V6c0-.55-.45-1-1-1h-3v9.5L21 20z" fill="#34A853" />
                                    <path d="M7 14.5l5-3.5 5 3.5V20h-3v-5.5l-2-1.5-2 1.5V20H7v-5.5z" fill="#EA4335" />
                                    <path d="M7 4h10v2.5H7z" fill="#FBBC05" />
                                </svg>
                            </div>
                            <div className="social-content-box">
                                <div className="social-text-content">
                                    <h4 className="social-platform-title">Email</h4>
                                    <span className="social-platform-sub">brahmanshu.verma@example.com</span>
                                </div>
                                <span className="social-row-arrow">→</span>
                            </div>
                        </motion.a>

                        {/* LinkedIn Row */}
                        <motion.a 
                            variants={itemVariants}
                            href="https://linkedin.com/in/brahmanshu-verma" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="contact-social-row"
                        >
                            <div className="social-icon-box bento-linkedin">
                                <svg className="linkedin-logo-svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <div className="social-content-box">
                                <div className="social-text-content">
                                    <h4 className="social-platform-title">LinkedIn</h4>
                                    <span className="social-platform-sub">linkedin.com/in/brahmanshu-verma</span>
                                </div>
                                <span className="social-row-arrow">→</span>
                            </div>
                        </motion.a>

                    </motion.div>
                </motion.div>

                <div className="socials-mini-footer">
                    © Brahmanshu Verma — Hobbies left the game.
                </div>
            </div>
        </section>
    );
}
