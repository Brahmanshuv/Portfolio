/**
 * variants.js — Shared Framer Motion animation variants
 *
 * These are the common, reusable animation definitions used across
 * multiple section-level components (SelectedWork, CaseStudies, etc.).
 *
 * Components with unique timing requirements (CaseStudyTemplate, ProjectDetail)
 * define their own local variants to avoid accidental regressions.
 */

// Parent container that staggers its children's entry animations
export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.05
        }
    }
};

// Section heading reveal — soft upward fade
export const sectionTitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 1, 0.5, 1]
        }
    }
};

// Card / content block reveal — scale-in with upward translate
export const cardFadeVariants = {
    hidden: {
        opacity: 0,
        scale: 0.98,
        y: 35
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// General element reveal — lighter version of cardFadeVariants
export const elementFadeVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};
