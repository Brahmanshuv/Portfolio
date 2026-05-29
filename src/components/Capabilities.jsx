import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { tilesData } from '../data/capabilities';

/**
 * ═══════════════════════════════════════════════════════════════
 * ANIMATION ARCHITECTURE — Premium Underdamped Spatial Solver
 * ═══════════════════════════════════════════════════════════════
 *
 * Re-architected as a high-fidelity physical system representing
 * a living structural grid that redistributes pressure and space.
 *
 * CORE PHYSICAL MECHANICS:
 *   1. Continuous Momentum: Removed sequential React state timeouts.
 *      The grid layout swaps (Skills ↔ Hobbies) in a single DOM update.
 *      Framer Motion performs a continuous FLIP layout transition,
 *      allowing springs to wobble, overshoot, and preserve momentum.
 *   2. Underdamped Size-Specific Springs (Mass-Aware Kinetics):
 *      Individual mass, stiffness, and damping are calibrated for each
 *      tile. Springs have a damping ratio < 1.0 (between 0.45 and 0.56)
 *      to overshoot, bounce, and transfer kinetic energy through columns.
 *   3. Spatial Euclidean Sweep: Top-right to bottom-left waves are
 *      orchestrated using coordinate distance stagger delays.
 *   4. Depth Elevation & Parallax: Tiles contract to 0.975 scale and drop
 *      highly diffused deep shadows during morphing, creating elevation.
 *   5. Light Reflections: Dynamic diagonal sweeps catch the glass surface.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Grid span configs: [colSpan, rowSpan] per tile index ────────────
const GRID_CONFIGS = {
    skills: [
        [2, 2], [1, 2], [1, 1], [1, 1],   // Row 1-2: T1(2×2) T2(tall) T3 T4
        [1, 1], [3, 1],                     // Row 3:   T5     T6(wide)
        [3, 1], [1, 1],                     // Row 4:   T7(wide)  T8
    ],
    hobbies: [ // Settled asymmetric hobbies state (pure skeleton)
        [1, 2], [2, 2], [1, 1], [1, 1],   // Top: T1(tall) T2(2×2) — swapped dominance
        [2, 1], [2, 1],                     // Bottom: equalized 2+2
        [3, 1], [1, 1],                     // Row 4: settled
    ],
};

// ─── Spatial grid coordinate centers for Euclidean calculations ────────
const TILE_CENTERS = [
    { x: 1.0, y: 1.0 }, // T1 (2x2 Core Anchor)
    { x: 2.5, y: 1.0 }, // T2 (1x2 Column)
    { x: 3.5, y: 0.5 }, // T3 (1x1 Node)
    { x: 3.5, y: 1.5 }, // T4 (1x1 Node)
    { x: 0.5, y: 2.5 }, // T5 (1x1 Node)
    { x: 2.5, y: 2.5 }, // T6 (3x1 Horizontal Beam)
    { x: 1.5, y: 3.5 }, // T7 (3x1 Horizontal Beam)
    { x: 3.5, y: 3.5 }, // T8 (1x1 Node)
];

// Toggle visual coordinate anchor (top-right of grid header)
const TOGGLE_POS = { x: 3.8, y: -0.5 };

// Compute static Euclidean spatial stagger delays (ms)
const SPATIAL_DELAYS = TILE_CENTERS.map(center => {
    const dx = center.x - TOGGLE_POS.x;
    const dy = center.y - TOGGLE_POS.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.round(dist * 75); // spatial speed factor
});

// Tuned mass-aware underdamped spring config map per tile index
const TILE_SPRINGS = [
    { mass: 3.2, stiffness: 45, damping: 13 },  // T1: Heavy Core (damping ratio = 0.54)
    { mass: 1.8, stiffness: 85, damping: 14 },  // T2: Vertical Column (damping ratio = 0.56)
    { mass: 0.45, stiffness: 210, damping: 9 },  // T3: Ultra-Light Node (damping ratio = 0.46)
    { mass: 0.45, stiffness: 210, damping: 9 },  // T4: Ultra-Light Node (damping ratio = 0.46)
    { mass: 0.8, stiffness: 140, damping: 11 }, // T5: Light Rebound Node (damping ratio = 0.52)
    { mass: 2.2, stiffness: 65, damping: 13 },  // T6: Horizontal Beam (damping ratio = 0.54)
    { mass: 2.2, stiffness: 65, damping: 13 },  // T7: Horizontal Beam (damping ratio = 0.54)
    { mass: 0.8, stiffness: 140, damping: 11 }, // T8: Light Rebound Node (damping ratio = 0.52)
];

// Static element CSS configuration classes
const TILE_CLASSES = [
    'tile-2x2',
    'tile-tall tile-visual-interact',
    'tile-manual',
    'tile-manual',
    'tile-micro',
    'tile-3d',
    'tile-wide-3',
    'tile-small-statement',
];

// Entrance Animation Variants for Skills (Capabilities) Section
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const headerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] // Soft ease-in-out curve
        }
    }
};

const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08, // Premium bento stagger reveal
            delayChildren: 0.15 // Let header start fading first
        }
    }
};

const tileVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] // Cinematic soft ease-in-out curve
        }
    }
};

const Capabilities = () => {
    const [activeTab, setActiveTab] = useState('skills');
    const [gridPhase, setGridPhase] = useState('skills');
    const [contentVisible, setContentVisible] = useState(true);
    const [morphActive, setMorphActive] = useState(false);
    const [toggleClicked, setToggleClicked] = useState(false);
    const animating = useRef(false);
    const timers = useRef([]);

    const clearTimers = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    useEffect(() => () => clearTimers(), []);

    const handleToggle = useCallback(() => {
        if (animating.current) return;
        animating.current = true;

        const goingToHobbies = activeTab === 'skills';

        clearTimers();

        // ── Phase 1: Toggle clicked tactile stretch ──
        setToggleClicked(true);
        timers.current.push(setTimeout(() => setToggleClicked(false), 150));

        // ── Phase 2: Content dissolve (Blur, scale-down, fade-out) ──
        setContentVisible(false);
        setMorphActive(true);
        setActiveTab(goingToHobbies ? 'hobbies' : 'skills');

        // ── Phase 3: Spatial Solver Reconfiguration (Continuous momentum FLIP) ──
        timers.current.push(setTimeout(() => {
            setGridPhase(goingToHobbies ? 'hobbies' : 'skills');
        }, 300));

        // ── Phase 4 & 5: Energy dissipation & stabilization settle ──
        timers.current.push(setTimeout(() => {
            setMorphActive(false);
            if (!goingToHobbies) {
                setContentVisible(true);
            }
            animating.current = false;
        }, 300 + 2200)); // 2.2s allows heavy springs to naturally calm down

    }, [activeTab, clearTimers]);

    const getGridStyle = useCallback((index) => {
        const config = GRID_CONFIGS[gridPhase];
        if (!config || !config[index]) return {};
        const [col, row] = config[index];
        return {
            gridColumn: `span ${col}`,
            gridRow: `span ${row}`,
        };
    }, [gridPhase]);

    const renderTileContent = (tile, index) => {
        // Hobbies state has zero content, labels, or typography
        if (gridPhase !== 'skills' && !contentVisible) return null;
        if (!tile.skills) return null;

        const data = tile.skills;

        return (
            <div
                className={`tile-content-wrapper ${contentVisible ? '' : 'hidden'}`}
                style={{ transitionDelay: contentVisible ? `${index * 45}ms` : '0ms' }}
            >
                {data.type === 'content' && (
                    <div className="tile-content">
                        <h4>{data.content.title}</h4>
                        <p className="tile-desc">{data.content.desc}</p>
                        <div className="tile-tags">
                            {data.content.tags.map((tag, i) => (
                                <span key={i}>{tag}</span>
                            ))}
                        </div>
                        <div className="micro-description">{data.content.micro}</div>
                    </div>
                )}

                {data.type === 'visual' && (
                    <>
                        <div className="visual-overlay">
                            <h4>{data.content.title}</h4>
                            <p className="caption">{data.content.caption}</p>
                        </div>
                        <div className="micro-description">{data.content.micro}</div>
                    </>
                )}

                {data.type === 'list' && (
                    <div className="tile-content">
                        <h4>{data.content.title}</h4>
                        <ul className="tile-list">
                            {data.content.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <div className="micro-description">{data.content.micro}</div>
                    </div>
                )}

                {data.type === 'simple-list' && (
                    <div className="tile-content center-content">
                        <ul className="micro-list">
                            {data.content.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <div className="micro-description">{data.content.micro}</div>
                    </div>
                )}

                {data.type === 'text' && (
                    <div className="tile-content">
                        <h4>{data.content.title}</h4>
                        <p className="tile-text">{data.content.text}</p>
                        <div className="micro-description">{data.content.micro}</div>
                    </div>
                )}

                {data.type === 'statement' && (
                    <div className="tile-content center-content">
                        <h4 className="statement-text">{data.content.text}</h4>
                    </div>
                )}
            </div>
        );
    };

    return (
        <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
                <motion.div className="section-title-container" variants={headerVariants}>
                    <div className="section-title" style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={activeTab}
                                initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                exit={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ margin: 0, display: 'inline-block' }}
                            >
                                {activeTab === 'skills' ? 'Skills' : 'Hobbies'}
                            </motion.h3>
                        </AnimatePresence>
                    </div>

                    {/* ── Premium Apple-style tactile toggle switch ── */}
                    <button
                        className={`premium-switch ${activeTab === 'hobbies' ? 'active' : ''}`}
                        onClick={handleToggle}
                        aria-label="Toggle Skills and Hobbies view"
                        style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none' }}
                        disabled={animating.current}
                    >
                        <motion.div
                            className="premium-switch-bg"
                            animate={{
                                backgroundColor: activeTab === 'skills' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 122, 255, 0.08)',
                                borderColor: activeTab === 'skills' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 122, 255, 0.16)',
                                boxShadow: activeTab === 'skills'
                                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 10px rgba(0, 0, 0, 0.1)'
                                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 14px rgba(0, 122, 255, 0.12), 0 0 12px rgba(0, 122, 255, 0.04)'
                            }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '52px',
                                height: '28px',
                                border: '1px solid',
                                borderRadius: '100px',
                                padding: '3px',
                                cursor: animating.current ? 'not-allowed' : 'pointer',
                                position: 'relative',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                outline: 'none',
                                justifyContent: activeTab === 'skills' ? 'flex-start' : 'flex-end'
                            }}
                        >
                            <motion.div
                                className="premium-switch-handle"
                                layout
                                transition={{ type: "spring", stiffness: 450, damping: 26 }}
                                animate={{ scaleX: [1, 1.22, 1], scaleY: [1, 0.88, 1] }}
                                key={activeTab}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                }}
                            />
                        </motion.div>
                    </button>
                </motion.div>

                {/* ═══ BENTO GRID — PREMIUM ADAPTIVE SPATIAL SOLVER ═══ */}
                <LayoutGroup>
                    <motion.div 
                        className={`bento-grid ${morphActive ? 'morph-active' : ''}`}
                        variants={gridVariants}
                    >
                        {tilesData.map((tile, index) => {
                            const spring = TILE_SPRINGS[index];

                            return (
                                <motion.div
                                    key={tile.id}
                                    variants={tileVariants}
                                    layout
                                    layoutId={tile.id}
                                    transition={{
                                        layout: {
                                            type: 'spring',
                                            ...spring,
                                            delay: morphActive ? SPATIAL_DELAYS[index] / 1000 : 0,
                                        },
                                    }}
                                    animate={{
                                        scale: morphActive 
                                            ? 0.975 
                                            : toggleClicked 
                                                ? (index === 2 || index === 3 || index === 1) ? 0.965 : 0.985 
                                                : 1.0,
                                        boxShadow: morphActive 
                                            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 30px 65px rgba(0, 0, 0, 0.55), 0 0 35px rgba(0, 122, 255, 0.10)'
                                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.25)',
                                        borderColor: morphActive 
                                            ? 'rgba(0, 122, 255, 0.20)' 
                                            : 'rgba(255, 255, 255, 0.06)',
                                    }}
                                    className={`bento-tile ${TILE_CLASSES[index]} ${morphActive ? 'morph-glow' : ''}`}
                                    style={{
                                        ...getGridStyle(index),
                                        animationDelay: morphActive ? `${SPATIAL_DELAYS[index]}ms` : undefined,
                                    }}
                                >
                                    {/* Sweeping premium diagonal glass reflection highlight */}
                                    <motion.div
                                        className="bento-tile-reflection"
                                        initial={{ transform: 'translateX(-100%) translateY(-100%)' }}
                                        animate={{
                                            transform: morphActive 
                                                ? 'translateX(100%) translateY(100%)' 
                                                : 'translateX(-100%) translateY(-100%)'
                                        }}
                                        transition={{
                                            duration: 1.8,
                                            ease: [0.25, 1, 0.5, 1],
                                            delay: morphActive ? SPATIAL_DELAYS[index] / 1000 + 0.1 : 0
                                        }}
                                    />

                                    <AnimatePresence>
                                        {gridPhase !== 'skills' && (
                                            <motion.div
                                                className="hobbies-radial-glow"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.0 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                    {renderTileContent(tile, index)}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </LayoutGroup>
            </motion.div>
    );
};

export default React.memo(Capabilities);
