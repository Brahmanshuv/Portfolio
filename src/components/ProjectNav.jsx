import React from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', targetId: 'overview-section' },
    { id: 'flow', label: 'Journey', targetId: 'flow-section' },
    { id: 'approach', label: 'Approach', targetId: 'approach-section' },
    { id: 'prototype', label: 'Solution', targetId: 'prototype-section' },
    { id: 'result', label: 'Outcome', targetId: 'result-section' }
];

export default function ProjectNav({ activeSection, onSectionClick, navItems = NAV_ITEMS }) {
    return (
        <nav
            className="project-nav-container"
            style={{
                backgroundColor: 'rgba(12, 16, 24, 0.38)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px 8px',
                width: '100%',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                position: 'relative',
                zIndex: 50
            }}
        >
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onSectionClick(item.targetId)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            padding: '10px 16px',
                            width: '100%',
                            textAlign: 'left',
                            fontSize: '13px',
                            fontWeight: 500,
                            letterSpacing: '0.03em',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            color: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.45)',
                        }}
                        className={`project-nav-item ${isActive ? 'active' : ''}`}
                    >
                        {/* Smooth active glass highlight sliding background */}
                        {isActive && (
                            <motion.div
                                layoutId="vertical-nav-active-pill"
                                style={{
                                    position: 'absolute',
                                    inset: '2px 4px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '16px',
                                    zIndex: 0
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
