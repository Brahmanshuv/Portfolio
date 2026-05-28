import React from 'react';
import { motion } from 'framer-motion';

/**
 * BentoTile — static GPU-composited hover card.
 * No drag. Framer Motion used only for whileHover micro-interactions.
 */
const BentoTile = React.memo(({ className, children, ...props }) => {
    return (
        <motion.div
            layout
            className={`bento-tile ${className || ''}`}
            whileHover={{
                y: -5,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 38,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
});

BentoTile.displayName = 'BentoTile';
export default BentoTile;
