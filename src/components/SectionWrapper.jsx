import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, className }) => {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
