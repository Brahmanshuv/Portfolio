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
        // Ambient system states
        initialized: false,
        breathingNodes: [],
        ambientCurrents: [],
        illuminatedSegments: [],
        wave: {
            active: false,
            pos: 0,
            speed: 5,
            width: 600,
            cooldown: 180,
        }
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

            let canvasW = 0;
            let canvasH = 0;

            if (w > 0 && h > 0) {
                canvas.width = w;
                canvas.height = h;
                canvasW = w;
                canvasH = h;
            } else {
                // Fallback to full viewport dimensions plus bleed to avoid mounting layout delay races
                canvas.width = window.innerWidth + 120;
                canvas.height = window.innerHeight + 120;
                canvasW = canvas.width;
                canvasH = canvas.height;
            }

            // Seed breathing nodes exactly at grid intersections
            const cols = Math.floor(canvasW / gridSpacing);
            const rows = Math.floor(canvasH / gridSpacing);
            
            const nodes = [];
            const activeIntersections = new Set();
            
            // Randomly select nodes, avoiding edges
            const nodeCount = Math.min(45, Math.floor((cols * rows) * 0.12));
            if (cols > 2 && rows > 2) {
                for (let i = 0; i < nodeCount; i++) {
                    const col = Math.floor(1 + Math.random() * (cols - 2));
                    const row = Math.floor(1 + Math.random() * (rows - 2));
                    const key = `${col},${row}`;
                    
                    if (!activeIntersections.has(key)) {
                        activeIntersections.add(key);
                        nodes.push({
                            x: col * gridSpacing,
                            y: row * gridSpacing,
                            col,
                            row,
                            phase: Math.random() * Math.PI * 2,
                            pulseSpeed: 0.006 + Math.random() * 0.010,
                            baseSize: 0.8 + Math.random() * 0.6,
                            maxOpacity: 0.12 + Math.random() * 0.14,
                            color: Math.random() < 0.45 
                                ? 'rgba(180, 215, 255, ALPHA)' // Icy Blue
                                : (Math.random() < 0.6 
                                    ? 'rgba(0, 190, 220, ALPHA)' // Muted Cyan
                                    : 'rgba(255, 255, 255, ALPHA)' // Soft White
                                )
                        });
                    }
                }
            }
            stateRef.current.breathingNodes = nodes;
            stateRef.current.initialized = true;
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

            // Helper to format rgba strings with safe clamped alphas
            const formatColor = (colorTemplate, alpha) => {
                const a = Math.max(0, Math.min(1, alpha));
                return colorTemplate.replace('ALPHA', a.toFixed(3));
            };

            // ═══════════════════════════════════════════════════
            // AMBIENT LAYER 1: Wave sweep update and rendering
            // ═══════════════════════════════════════════════════
            const wave = state.wave;
            if (!wave.active) {
                wave.cooldown--;
                if (wave.cooldown <= 0) {
                    wave.active = true;
                    wave.pos = -wave.width;
                    wave.speed = 3.5 + Math.random() * 2.5;
                    wave.cooldown = 400 + Math.floor(Math.random() * 400); // 7 to 14 seconds cooldown
                }
            } else {
                wave.pos += wave.speed;
                if (wave.pos > canvas.width + canvas.height + wave.width) {
                    wave.active = false;
                }
            }

            // Draw extremely subtle broad diagonal linear gradient wave
            if (wave.active) {
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                
                const grad = ctx.createLinearGradient(
                    wave.pos - wave.width / 2, 
                    0, 
                    wave.pos + wave.width / 2, 
                    wave.width
                );
                
                grad.addColorStop(0, 'rgba(180, 215, 255, 0)');
                grad.addColorStop(0.3, 'rgba(180, 215, 255, 0.003)');
                grad.addColorStop(0.5, 'rgba(100, 210, 230, 0.022)'); // Muted Cyan peak
                grad.addColorStop(0.7, 'rgba(180, 215, 255, 0.003)');
                grad.addColorStop(1, 'rgba(180, 215, 255, 0)');
                
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
            }

            // ═══════════════════════════════════════════════════
            // AMBIENT LAYER 2: Illuminated segments (Energy Shimmer)
            // ═══════════════════════════════════════════════════
            const segments = state.illuminatedSegments;
            const maxSegments = 4;
            if (segments.length < maxSegments && Math.random() < 0.015 && state.initialized) {
                const cols = Math.floor(canvas.width / gridSpacing);
                const rows = Math.floor(canvas.height / gridSpacing);
                
                if (cols > 2 && rows > 2) {
                    const startCol = Math.floor(1 + Math.random() * (cols - 2));
                    const startRow = Math.floor(1 + Math.random() * (rows - 2));
                    const isHorizontal = Math.random() < 0.5;
                    const length = 1 + Math.floor(Math.random() * 3);
                    
                    let endCol = startCol;
                    let endRow = startRow;
                    
                    if (isHorizontal) {
                        endCol = Math.min(cols - 1, startCol + length);
                    } else {
                        endRow = Math.min(rows - 1, startRow + length);
                    }
                    
                    if (endCol !== startCol || endRow !== startRow) {
                        segments.push({
                            x1: startCol * gridSpacing,
                            y1: startRow * gridSpacing,
                            x2: endCol * gridSpacing,
                            y2: endRow * gridSpacing,
                            opacity: 0,
                            targetOpacity: 0.05 + Math.random() * 0.08,
                            fadeState: 'in',
                            holdTime: 40 + Math.floor(Math.random() * 80),
                            fadeSpeed: 0.003 + Math.random() * 0.004,
                            color: Math.random() < 0.6 
                                ? 'rgba(180, 215, 255, ALPHA)' // Icy Blue
                                : 'rgba(200, 205, 215, ALPHA)' // Silver
                        });
                    }
                }
            }

            // Update and draw illuminated segments
            for (let j = segments.length - 1; j >= 0; j--) {
                const seg = segments[j];
                
                if (seg.fadeState === 'in') {
                    seg.opacity += seg.fadeSpeed;
                    if (seg.opacity >= seg.targetOpacity) {
                        seg.opacity = seg.targetOpacity;
                        seg.fadeState = 'hold';
                    }
                } else if (seg.fadeState === 'hold') {
                    seg.holdTime--;
                    if (seg.holdTime <= 0) {
                        seg.fadeState = 'out';
                    }
                } else if (seg.fadeState === 'out') {
                    seg.opacity -= seg.fadeSpeed;
                    if (seg.opacity <= 0) {
                        segments.splice(j, 1);
                        continue;
                    }
                }
                
                let waveBoost = 1.0;
                if (wave.active) {
                    const midX = (seg.x1 + seg.x2) / 2;
                    const midY = (seg.y1 + seg.y2) / 2;
                    const proj = midX + midY;
                    const dist = Math.abs(proj - wave.pos);
                    if (dist < wave.width / 2) {
                        waveBoost = 1.0 + 1.2 * (1 - dist / (wave.width / 2));
                    }
                }
                
                ctx.save();
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = formatColor(seg.color, seg.opacity * waveBoost);
                ctx.beginPath();
                ctx.moveTo(seg.x1, seg.y1);
                ctx.lineTo(seg.x2, seg.y2);
                ctx.stroke();
                
                // Secondary wider soft glow stroke (efficient, avoids costly shadowBlur filter)
                ctx.lineWidth = 2.4;
                ctx.strokeStyle = formatColor(seg.color, seg.opacity * 0.22 * waveBoost);
                ctx.beginPath();
                ctx.moveTo(seg.x1, seg.y1);
                ctx.lineTo(seg.x2, seg.y2);
                ctx.stroke();
                ctx.restore();
            }

            // ═══════════════════════════════════════════════════
            // AMBIENT LAYER 3: Breathing intersection nodes
            // ═══════════════════════════════════════════════════
            const nodes = state.breathingNodes;
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.phase += node.pulseSpeed;
                const phaseVal = Math.sin(node.phase);
                const opacityScale = 0.45 + 0.55 * phaseVal;
                
                let waveBoost = 1.0;
                if (wave.active) {
                    const proj = node.x + node.y;
                    const dist = Math.abs(proj - wave.pos);
                    if (dist < wave.width / 2) {
                        waveBoost = 1.0 + 1.5 * (1 - dist / (wave.width / 2));
                    }
                }
                
                const currentOpacity = node.maxOpacity * opacityScale * waveBoost;
                const sizeScale = 1.0 + 0.15 * phaseVal;
                const currentRadius = node.baseSize * sizeScale * (waveBoost > 1 ? 1.15 : 1.0);
                
                ctx.save();
                
                // Draw soft glow ring around node
                ctx.fillStyle = formatColor(node.color, currentOpacity * 0.20);
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius * 3.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw core node particle
                ctx.fillStyle = formatColor(node.color, currentOpacity);
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }

            // ═══════════════════════════════════════════════════
            // AMBIENT LAYER 4: Winding Current Streaks (Light Particles)
            // ═══════════════════════════════════════════════════
            const currents = state.ambientCurrents;
            const maxCurrents = 8;
            if (currents.length < maxCurrents && Math.random() < 0.035 && state.initialized) {
                const cols = Math.floor(canvas.width / gridSpacing);
                const rows = Math.floor(canvas.height / gridSpacing);
                
                if (cols > 2 && rows > 2) {
                    const startCol = Math.floor(1 + Math.random() * (cols - 2));
                    const startRow = Math.floor(1 + Math.random() * (rows - 2));
                    
                    const path = [];
                    let cx = startCol;
                    let cy = startRow;
                    path.push({ x: cx * gridSpacing, y: cy * gridSpacing });
                    
                    let dir = Math.floor(Math.random() * 4); // 0: R, 1: D, 2: L, 3: U
                    const pathLength = 3 + Math.floor(Math.random() * 6);
                    
                    let currentLength = 0;
                    let outOfBounds = false;
                    
                    while (currentLength < pathLength && !outOfBounds) {
                        if (currentLength > 0 && Math.random() < 0.25) {
                            const turn = Math.random() < 0.5 ? -1 : 1;
                            dir = (dir + turn + 4) % 4;
                        }
                        
                        let nextCol = cx;
                        let nextRow = cy;
                        
                        if (dir === 0) nextCol++;
                        else if (dir === 1) nextRow++;
                        else if (dir === 2) nextCol--;
                        else if (dir === 3) nextRow--;
                        
                        if (nextCol < 0 || nextCol >= cols || nextRow < 0 || nextRow >= rows) {
                            outOfBounds = true;
                        } else {
                            cx = nextCol;
                            cy = nextRow;
                            path.push({ x: cx * gridSpacing, y: cy * gridSpacing });
                            currentLength++;
                        }
                    }
                    
                    if (path.length > 1) {
                        const isCyan = Math.random() < 0.4;
                        const isIcyBlue = Math.random() < 0.7;
                        
                        currents.push({
                            path,
                            segmentIndex: 0,
                            segmentProgress: 0,
                            speed: 0.02 + Math.random() * 0.02,
                            maxOpacity: 0.12 + Math.random() * 0.16,
                            opacity: 0,
                            fadeState: 'in',
                            history: [],
                            maxHistoryLength: 12 + Math.floor(Math.random() * 12),
                            color: isCyan 
                                ? 'rgba(0, 190, 220, ALPHA)' // Muted Cyan
                                : (isIcyBlue 
                                    ? 'rgba(180, 215, 255, ALPHA)' // Icy Blue
                                    : 'rgba(255, 255, 255, ALPHA)' // Soft White
                                ),
                            width: 0.8 + Math.random() * 0.4,
                        });
                    }
                }
            }

            // Update and render ambient currents
            for (let k = currents.length - 1; k >= 0; k--) {
                const cur = currents[k];
                
                cur.segmentProgress += cur.speed;
                if (cur.segmentProgress >= 1) {
                    cur.segmentProgress = 0;
                    cur.segmentIndex++;
                    
                    if (cur.segmentIndex >= cur.path.length - 1) {
                        cur.fadeState = 'out';
                    }
                }
                
                if (cur.fadeState === 'in') {
                    cur.opacity += 0.02;
                    if (cur.opacity >= cur.maxOpacity) {
                        cur.opacity = cur.maxOpacity;
                        cur.fadeState = 'active';
                    }
                } else if (cur.fadeState === 'out') {
                    cur.opacity -= 0.015;
                    if (cur.opacity <= 0) {
                        currents.splice(k, 1);
                        continue;
                    }
                }
                
                const p1 = cur.path[cur.segmentIndex];
                const p2 = cur.path[cur.segmentIndex + 1];
                let headX = p1.x;
                let headY = p1.y;
                
                if (p2) {
                    headX = p1.x + (p2.x - p1.x) * cur.segmentProgress;
                    headY = p1.y + (p2.y - p1.y) * cur.segmentProgress;
                }
                
                cur.history.unshift({ x: headX, y: headY });
                if (cur.history.length > cur.maxHistoryLength) {
                    cur.history.pop();
                }
                
                let waveBoost = 1.0;
                if (wave.active) {
                    const proj = headX + headY;
                    const dist = Math.abs(proj - wave.pos);
                    if (dist < wave.width / 2) {
                        waveBoost = 1.0 + 1.2 * (1 - dist / (wave.width / 2));
                    }
                }
                
                ctx.save();
                ctx.lineWidth = cur.width;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                // Draw tracing line segments
                for (let i = 0; i < cur.history.length - 1; i++) {
                    const pt1 = cur.history[i];
                    const pt2 = cur.history[i + 1];
                    const trailScale = 1 - i / cur.history.length;
                    const alpha = cur.opacity * trailScale * waveBoost;
                    
                    ctx.strokeStyle = formatColor(cur.color, alpha);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x, pt1.y);
                    ctx.lineTo(pt2.x, pt2.y);
                    ctx.stroke();
                }
                
                // Draw leading head particle and soft bloom
                if (cur.history.length > 0) {
                    const head = cur.history[0];
                    const headAlpha = Math.min(1.0, cur.opacity * 2.2 * waveBoost);
                    
                    ctx.fillStyle = formatColor(cur.color, headAlpha * 0.14);
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, cur.width * 3.5, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, cur.width * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
            }

            // ═══════════════════════════════════════════════════
            // INTERACTIVE LAYER: click routing & main visual route
            // ═══════════════════════════════════════════════════
            
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
