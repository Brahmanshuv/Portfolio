import React, { useEffect, useRef } from 'react';

const GridSignalCanvas = () => {
    const canvasRef = useRef(null);

    // Persistent state ref to avoid React rerender pollution
    const stateRef = useRef({
        state: 'idle', // 'idle', 'origin-twinkle', 'routing', 'target-twinkle', 'cooldown'
        origin: null,   // { x, y, alpha, scale, phase, age }
        target: null,   // { x, y, alpha, scale, phase, age, isInteractive }
        signal: null,   // { path, index, progress, speed, alpha }
        cooldown: 0,
        gridSpacing: 60,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        const gridSpacing = stateRef.current.gridSpacing;

        // Sync canvas drawing resolution to its actual display container width/height
        const handleResize = () => {
            const parent = canvas.parentElement;
            const w = parent ? parent.clientWidth : 0;
            const h = parent ? parent.clientHeight : 0;

            if (w > 0 && h > 0) {
                canvas.width = w;
                canvas.height = h;
            } else {
                // Fallback to full viewport dimensions plus bleed to avoid mounting layout delay races
                canvas.width = window.innerWidth + 120;
                canvas.height = window.innerHeight + 120;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Deterministic shortest path generator along the grid
        const getShortestPath = (startX, startY, endX, endY) => {
            const path = [{ x: startX, y: startY }];
            let cx = startX;
            let cy = startY;

            while (cx !== endX || cy !== endY) {
                if (cx !== endX && cy !== endY) {
                    // Alternate randomly to create an intelligent routing feel
                    if (Math.random() < 0.5) {
                        cx += Math.sign(endX - cx) * gridSpacing;
                    } else {
                        cy += Math.sign(endY - cy) * gridSpacing;
                    }
                } else if (cx !== endX) {
                    cx += Math.sign(endX - cx) * gridSpacing;
                } else {
                    cy += Math.sign(endY - cy) * gridSpacing;
                }
                path.push({ x: cx, y: cy });
            }
            return path;
        };

        // Click Handler for Interactive Rerouting
        const handleGlobalClick = (e) => {
            // Bypass standard navigation links and interactive UI widgets
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Align to nearest grid intersection coordinates
            const col = Math.round(clickX / gridSpacing);
            const row = Math.round(clickY / gridSpacing);
            const destX = Math.max(0, Math.min(col * gridSpacing, canvas.width));
            const destY = Math.max(0, Math.min(row * gridSpacing, canvas.height));

            const state = stateRef.current;

            if (state.state === 'routing' && state.signal) {
                // If already routing, dynamically change the destination & recalculate remaining path
                state.target = {
                    x: destX,
                    y: destY,
                    alpha: 0.9,
                    scale: 1.0,
                    phase: 'pulse',
                    age: 0,
                    isInteractive: true,
                };

                // Route from the next intersection target point onwards to keep strict grid alignment
                const nextNode = state.signal.path[state.signal.index + 1] || state.signal.path[state.signal.index];
                const remainingPath = getShortestPath(nextNode.x, nextNode.y, destX, destY);

                const newPath = state.signal.path.slice(0, state.signal.index + 2);
                for (let i = 1; i < remainingPath.length; i++) {
                    newPath.push(remainingPath[i]);
                }

                state.signal.path = newPath;
            } else {
                // If idle or waiting, immediately start a brand new route to the clicked coordinates
                let startX = 0;
                let startY = 0;

                if (state.signal && state.signal.path.length > 0) {
                    const lastNode = state.signal.path[state.signal.path.length - 1];
                    startX = lastNode.x;
                    startY = lastNode.y;
                } else {
                    const cols = Math.floor(canvas.width / gridSpacing);
                    const rows = Math.floor(canvas.height / gridSpacing);
                    startX = Math.max(1, Math.floor(Math.random() * (cols - 1))) * gridSpacing;
                    startY = Math.max(1, Math.floor(Math.random() * (rows - 1))) * gridSpacing;
                }

                state.origin = {
                    x: startX,
                    y: startY,
                    alpha: 0.8,
                    scale: 1.0,
                    phase: 'pulse',
                    age: 0,
                };

                state.target = {
                    x: destX,
                    y: destY,
                    alpha: 0.9,
                    scale: 1.0,
                    phase: 'pulse',
                    age: 0,
                    isInteractive: true,
                };

                state.signal = {
                    path: getShortestPath(startX, startY, destX, destY),
                    index: 0,
                    progress: 0,
                    speed: 0.08,
                    alpha: 0.7,
                };

                state.state = 'routing';
            }
        };

        window.addEventListener('click', handleGlobalClick);

        // Core State Loop (Single-pass procedural engine)
        const updateAndDraw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const state = stateRef.current;

            // 1. STATE MANAGEMENT
            if (state.state === 'idle') {
                const cols = Math.floor(canvas.width / gridSpacing);
                const rows = Math.floor(canvas.height / gridSpacing);

                if (cols > 2 && rows > 2) {
                    const col = Math.max(1, Math.floor(Math.random() * (cols - 1)));
                    const row = Math.max(1, Math.floor(Math.random() * (rows - 1)));

                    state.origin = {
                        x: col * gridSpacing,
                        y: row * gridSpacing,
                        alpha: 0,
                        scale: 0,
                        phase: 'in',
                        age: 0,
                    };
                    state.state = 'origin-twinkle';
                }
            } else if (state.state === 'origin-twinkle' && state.origin) {
                const o = state.origin;
                if (o.phase === 'in') {
                    o.alpha += 0.04;
                    o.scale += 0.06;
                    if (o.alpha >= 0.8) {
                        o.alpha = 0.8;
                        o.scale = 1.0;
                        o.phase = 'pulse';
                        o.age = 0;
                    }
                } else if (o.phase === 'pulse') {
                    o.age++;
                    if (o.age > 15) {
                        // Spawn random destination sufficiently far from origin
                        const cols = Math.floor(canvas.width / gridSpacing);
                        const rows = Math.floor(canvas.height / gridSpacing);

                        let destCol = Math.max(1, Math.floor(Math.random() * (cols - 1)));
                        let destRow = Math.max(1, Math.floor(Math.random() * (rows - 1)));
                        const startCol = Math.round(o.x / gridSpacing);
                        const startRow = Math.round(o.y / gridSpacing);

                        // Ensure minimum travel distance
                        if (Math.abs(destCol - startCol) + Math.abs(destRow - startRow) < 4) {
                            destCol = (destCol + 6) % (cols - 2) + 1;
                        }

                        state.target = {
                            x: destCol * gridSpacing,
                            y: destRow * gridSpacing,
                            alpha: 0,
                            scale: 0,
                            phase: 'in',
                            age: 0,
                            isInteractive: false,
                        };

                        state.signal = {
                            path: getShortestPath(o.x, o.y, destCol * gridSpacing, destRow * gridSpacing),
                            index: 0,
                            progress: 0,
                            speed: 0.07 + Math.random() * 0.02,
                            alpha: 0.6,
                        };

                        state.state = 'routing';
                        o.phase = 'out';
                    }
                }
            } else if (state.state === 'routing') {
                // Fade out origin dot
                if (state.origin) {
                    state.origin.alpha -= 0.02;
                    if (state.origin.alpha <= 0) {
                        state.origin = null;
                    }
                }

                // Fade in target dot
                if (state.target && state.target.phase === 'in') {
                    state.target.alpha += 0.04;
                    state.target.scale += 0.06;
                    if (state.target.alpha >= 0.8) {
                        state.target.alpha = 0.8;
                        state.target.scale = 1.0;
                        state.target.phase = 'pulse';
                    }
                }

                // Advance signal line routing along segments
                if (state.signal) {
                    const sig = state.signal;
                    sig.progress += sig.speed;
                    if (sig.progress >= 1) {
                        sig.progress = 0;
                        sig.index++;

                        if (sig.index >= sig.path.length - 1) {
                            if (state.target) {
                                state.target.phase = 'pulse';
                                state.target.age = 0;
                            }
                            state.state = 'target-twinkle';
                        }
                    }
                }
            } else if (state.state === 'target-twinkle') {
                // Animate destination dot fade-out & fade tracing line
                if (state.target) {
                    state.target.age++;
                    if (state.target.age > 20) {
                        state.target.alpha -= 0.03;
                        if (state.target.alpha <= 0) {
                            state.target = null;
                        }
                    }
                }

                if (state.signal) {
                    state.signal.alpha -= 0.03;
                    if (state.signal.alpha <= 0) {
                        state.signal = null;
                    }
                }

                if (!state.target && !state.signal) {
                    state.cooldown = 110; // Frames to wait (~1.8 seconds)
                    state.state = 'cooldown';
                }
            } else if (state.state === 'cooldown') {
                state.cooldown--;
                if (state.cooldown <= 0) {
                    state.state = 'idle';
                }
            }

            // 2. RENDERING LOGIC
            // A. Draw dots
            [state.origin, state.target].forEach(dot => {
                if (!dot || dot.alpha <= 0) return;
                ctx.save();
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = dot.isInteractive ? 8 : 4;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
                ctx.globalAlpha = dot.alpha;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, (dot.isInteractive ? 2.5 : 1.5) * dot.scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // B. Draw active pure white routing signal line with subtle tail trail
            if (state.signal) {
                const sig = state.signal;
                ctx.save();
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';

                const tailCount = 3;
                const startSeg = Math.max(0, sig.index - tailCount);

                for (let i = startSeg; i <= sig.index; i++) {
                    if (i >= sig.path.length - 1) break;

                    const p1 = sig.path[i];
                    const p2 = sig.path[i + 1];

                    let endX = p2.x;
                    let endY = p2.y;

                    if (i === sig.index) {
                        endX = p1.x + (p2.x - p1.x) * sig.progress;
                        endY = p1.y + (p2.y - p1.y) * sig.progress;
                    }

                    const segmentAge = sig.index - i;
                    let opacity = sig.alpha * (1 - segmentAge / (tailCount + 1));
                    if (i === sig.index) {
                        opacity *= sig.progress;
                    }

                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1.0;
                    ctx.globalAlpha = opacity;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                }
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(updateAndDraw);
        };

        updateAndDraw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleGlobalClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                zIndex: 1,
            }}
        />
    );
};

export default GridSignalCanvas;
