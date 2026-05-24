import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

/**
 * LoadingScreen
 *
 * Timing:
 *   0ms        → mount, lock scroll, begin lazy-loading Lottie JSON
 *   ~50ms      → JSON loaded, Lottie begins playback
 *   2500ms     → trigger exit (opacity + blur fade out)
 *   2500+600ms → AnimatePresence removes from DOM, scroll restored
 *
 * The Abstraction.json is dynamically imported so it splits into its own
 * chunk and doesn't inflate the main JS bundle.
 */
const DISPLAY_DURATION = 2500; // ms before exit begins
const EXIT_DURATION    = 0.6;  // seconds for fade-out

const LoadingScreen = ({ onComplete }) => {
    const lottieRef = useRef(null);
    const [animData, setAnimData] = useState(null);

    // Dynamically import the JSON to keep it out of the initial bundle
    useEffect(() => {
        import('../../assets/Abstraction.json').then((mod) => {
            setAnimData(mod.default ?? mod);
        });
    }, []);

    useEffect(() => {
        // Lock scroll for the full loading duration
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            onComplete();
            // Restore scroll after exit animation finishes
            setTimeout(() => {
                document.body.style.overflow = prevOverflow || '';
            }, EXIT_DURATION * 1000 + 100);
        }, DISPLAY_DURATION);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = prevOverflow || '';
        };
    }, [onComplete]);

    return (
        <motion.div
            className="loader-root"
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{
                opacity: 0,
                filter: 'blur(14px)',
                transition: { duration: EXIT_DURATION, ease: [0.4, 0, 1, 1] },
            }}
        >
            {/* Ambient glow orb — matches HeroTop cinematic depth */}
            <div className="loader-orb" aria-hidden="true" />

            {/* Lottie animation — only renders once JSON is loaded */}
            <div className="loader-animation">
                {animData && (
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animData}
                        loop={false}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
