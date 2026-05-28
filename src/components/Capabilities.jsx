import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoTile from './BentoTile';
import { capabilitiesData, hobbiesData } from '../data/capabilities';

const Capabilities = () => {
    const [activeTab, setActiveTab] = useState('skills');
    const currentData = activeTab === 'skills' ? capabilitiesData : hobbiesData;

    return (
        <section>
            <div className="container">
                <div className="section-title-container">
                    <div className="section-title" style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={activeTab}
                                initial={{ opacity: 0, filter: 'blur(3px)', x: -4 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                                exit={{ opacity: 0, filter: 'blur(3px)', x: 4 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                style={{ margin: 0, display: 'inline-block' }}
                            >
                                {activeTab === 'skills' ? 'Skills' : 'Hobbies'}
                            </motion.h3>
                        </AnimatePresence>
                    </div>

                    {/* Minimal premium Apple-style switch */}
                    <button
                        className={`premium-switch ${activeTab === 'hobbies' ? 'active' : ''}`}
                        onClick={() => setActiveTab(activeTab === 'skills' ? 'hobbies' : 'skills')}
                        aria-label="Toggle Skills and Hobbies view"
                    >
                        <motion.div
                            className="premium-switch-handle"
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>

                <div className="bento-grid">
                    {currentData.map((tile) => (
                        <BentoTile
                            key={tile.id}
                            className={tile.className}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.98 }}
                                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                    exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.98 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="tile-inner-wrap"
                                >
                                    {/** 1. CONTENT TILE **/}
                                    {tile.type === 'content' && (
                                        <div className="tile-content">
                                            <h4>{tile.content.title}</h4>
                                            <p className="tile-desc">{tile.content.desc}</p>
                                            <div className="tile-tags">
                                                {tile.content.tags.map((tag, i) => (
                                                    <span key={i}>{tag}</span>
                                                ))}
                                            </div>
                                            <div className="micro-description">{tile.content.micro}</div>
                                        </div>
                                    )}

                                    {/** 2. VISUAL TILE **/}
                                    {tile.type === 'visual' && (
                                        <>
                                            <div className="visual-overlay">
                                                <h4>{tile.content.title}</h4>
                                                <p className="caption">{tile.content.caption}</p>
                                            </div>
                                            <div className="micro-description">{tile.content.micro}</div>
                                        </>
                                    )}

                                    {/** 3. LIST TILE **/}
                                    {tile.type === 'list' && (
                                        <div className="tile-content">
                                            <h4>{tile.content.title}</h4>
                                            <ul className="tile-list">
                                                {tile.content.list.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                            <div className="micro-description">{tile.content.micro}</div>
                                        </div>
                                    )}

                                    {/** 4. SIMPLE LIST **/}
                                    {tile.type === 'simple-list' && (
                                        <div className="tile-content center-content">
                                            <ul className="micro-list">
                                                {tile.content.list.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                            <div className="micro-description">{tile.content.micro}</div>
                                        </div>
                                    )}

                                    {/** 5. TEXT TILE **/}
                                    {tile.type === 'text' && (
                                        <div className="tile-content">
                                            <h4>{tile.content.title}</h4>
                                            <p className="tile-text">{tile.content.text}</p>
                                            <div className="micro-description">{tile.content.micro}</div>
                                        </div>
                                    )}

                                    {/** 6. STATEMENT TILE **/}
                                    {tile.type === 'statement' && (
                                        <div className="tile-content center-content">
                                            <h4 className="statement-text">{tile.content.text}</h4>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </BentoTile>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Capabilities);
