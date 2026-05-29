import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ 
    children, 
    id, 
    className, 
    animate = true, 
    variants, 
    transition, 
    viewport 
}) => {
    // Premium ease-in-out cinematic unfold curve (20-40px range + subtle scale-in)
    const defaultVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1] // Cinematic soft ease-in-out
            }
        }
    };

    if (!animate) {
        return (
            <section id={id} className={className}>
                {children}
            </section>
        );
    }

    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="visible"
            variants={variants || defaultVariants}
            transition={transition}
            viewport={viewport || { once: true, amount: 0.25 }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
