import React from 'react';
import { motion } from 'framer-motion';

const BentoTile = ({ className, children, ...props }) => {
    return (
        <motion.div
            className={`bento-tile ${className || ''}`}
            layout
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default BentoTile;
