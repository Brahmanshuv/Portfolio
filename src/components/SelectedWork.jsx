import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectArchive from './ProjectArchive';

const SelectedWork = () => {
    // Parent container coordinates staggers
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.09,
                delayChildren: 0.05
            }
        }
    };

    // Smooth section title reveal
    const titleVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1] // Premium deceleration
            }
        }
    };

    return (
        <motion.div
            className="container selected-work-container alternative-active"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <div className="work-header-container">
                <motion.div className="section-title" variants={titleVariants} style={{ margin: 0 }}>
                    <h3>Work</h3>
                </motion.div>
            </div>

            <div style={{ width: '100%' }}>
                <ProjectArchive projects={projectsData} isForcedExpanded={false} />
            </div>
        </motion.div>
    );
};

export default React.memo(SelectedWork);
