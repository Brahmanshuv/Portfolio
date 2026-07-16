import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectArchive from './ProjectArchive';
import { containerVariants, sectionTitleVariants } from '../animations/variants';

const SelectedWork = () => {
    return (
        <motion.div
            className="container selected-work-container alternative-active"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <div className="work-header-container">
                <motion.div className="section-title" variants={sectionTitleVariants} style={{ margin: 0 }}>
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
