import React, { useState, useRef } from 'react';
import BentoTile from './BentoTile';
import { capabilitiesData } from '../data/capabilities';

const Capabilities = () => {
    const [tiles, setTiles] = useState(capabilitiesData);
    const draggingId = useRef(null);

    const handleDragStart = (id) => {
        draggingId.current = id;
    };

    // Swap tiles on hover (collision detection)
    const handleDrag = (info) => {
        const dragId = draggingId.current;
        if (!dragId) return;

        // Find element under cursor
        const elementUnderCursor = document.elementFromPoint(info.point.x, info.point.y);
        const tileElement = elementUnderCursor?.closest('.bento-tile');

        if (tileElement) {
            const targetId = tileElement.dataset.id;

            // If valid target and different from dragging item
            if (targetId && targetId !== dragId) {
                const dragIndex = tiles.findIndex(t => t.id === dragId);
                const targetIndex = tiles.findIndex(t => t.id === targetId);

                if (dragIndex !== -1 && targetIndex !== -1) {
                    // Create new array with swapped items
                    const newTiles = [...tiles];
                    const [draggedItem] = newTiles.splice(dragIndex, 1);
                    newTiles.splice(targetIndex, 0, draggedItem);

                    setTiles(newTiles);
                }
            }
        }
    };

    const handleDragEnd = () => {
        draggingId.current = null;
    };

    return (
        <section id="skills">
            <div className="container">
                <div className="section-title">
                    <h3>Capabilities</h3>
                </div>

                <div className="bento-grid">
                    {tiles.map((tile) => (
                        <BentoTile
                            key={tile.id}
                            className={tile.className}
                            data-id={tile.id}
                            drag
                            dragSnapToOrigin
                            dragElastic={0.1}
                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            whileDrag={{ scale: 1.05, zIndex: 100, cursor: 'grabbing' }}
                            onDragStart={() => handleDragStart(tile.id)}
                            onDrag={(_, info) => handleDrag(info)}
                            onDragEnd={handleDragEnd}
                        >
                            {/* Render different content based on type */}

                            {/** 1. CONTENT TILE (System Thinking) **/}
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

                            {/** 2. VISUAL TILE (Interaction / 3D) **/}
                            {tile.type === 'visual' && (
                                <>
                                    <div className="visual-overlay">
                                        <h4>{tile.content.title}</h4>
                                        <p className="caption">{tile.content.caption}</p>
                                    </div>
                                    <div className="micro-description">{tile.content.micro}</div>
                                </>
                            )}

                            {/** 3. LIST TILE (Experience / Research) **/}
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

                            {/** 4. SIMPLE LIST (Micro) **/}
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

                            {/** 5. TEXT TILE (Tech Stack) **/}
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

export default Capabilities;
