/**
 * SectionWrapper — Animated section container with sensible scroll-reveal defaults.
 *
 * Props:
 *   children     {ReactNode}  - Section content.
 *   id           {string}     - HTML id attribute for anchor linking.
 *   className    {string}     - Additional CSS classes.
 *   animate      {boolean}    - Set false to skip Framer Motion and render a plain <section>. Default: true.
 *   variants     {object}     - Custom Framer Motion variants. Falls back to built-in cinematic unfold curve.
 *   transition   {object}     - Custom Framer Motion transition override.
 *   viewport     {object}     - Framer Motion viewport config. Default: { once: true, amount: 0.25 }.
 */
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
