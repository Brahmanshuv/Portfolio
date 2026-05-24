import React from 'react';
import BentoTile from './BentoTile';
import { capabilitiesData } from '../data/capabilities';

const Capabilities = () => {
    return (
        <section id="skills">
            <div className="container">
                <div className="section-title">
                    <h3>Skills</h3>
                </div>

                <div className="bento-grid">
                    {capabilitiesData.map((tile) => (
                        <BentoTile
                            key={tile.id}
                            className={tile.className}
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
                        </BentoTile>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Capabilities);
