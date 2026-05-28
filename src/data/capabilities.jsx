import React from 'react';

/**
 * Unified tile data — each tile has a stable `id` and fixed DOM index.
 * Skills content is fully specified.
 * Hobbies state is a PURE structural transformation — no content.
 *
 * Grid sizing per mode is driven entirely by inline gridColumn/gridRow
 * styles in the Capabilities component, so no CSS class switching needed.
 */

export const tilesData = [
    {
        id: 'tile-1',
        skills: {
            type: 'content',
            content: {
                title: <>System-Level<br />Product Thinking</>,
                desc: "Designing scalable, modular interfaces grounded in interaction logic and architectural clarity.",
                tags: ["Component frameworks", "Pattern libraries", "UX scalability", "Structural decision-making"],
                micro: "SCALABLE LOGIC"
            }
        },
    },
    {
        id: 'tile-2',
        skills: {
            type: 'visual',
            content: {
                title: <>Interaction<br />Architecture</>,
                caption: "Flows · States · Behaviors · Edge cases",
                micro: "USER FLOW"
            }
        },
    },
    {
        id: 'tile-3',
        skills: {
            type: 'list',
            content: {
                title: "Experience Design",
                list: ["User journeys", "Information architecture", "High-fidelity prototyping", "Micro-interactions"],
                micro: "JOURNEY MAP"
            }
        },
    },
    {
        id: 'tile-4',
        skills: {
            type: 'list',
            content: {
                title: "Research & Validation",
                list: ["User interviews", "Usability testing", "Behavior analysis", "Iteration cycles"],
                micro: "DATA DRIVEN"
            }
        },
    },
    {
        id: 'tile-5',
        skills: {
            type: 'simple-list',
            content: {
                list: ["Typography", "Spacing", "Rhythm", "Precision"],
                micro: "PIXEL PERFECT"
            }
        },
    },
    {
        id: 'tile-6',
        skills: {
            type: 'visual',
            content: {
                title: <>3D & Spatial<br />Systems</>,
                caption: "Motion · Depth · Product Visualization",
                micro: "SPATIAL UI"
            }
        },
    },
    {
        id: 'tile-7',
        skills: {
            type: 'text',
            content: {
                title: "Design Environment",
                text: "Figma · Blender · Adobe Suite · Miro · Unreal Engine",
                micro: "TECH STACK"
            }
        },
    },
    {
        id: 'tile-8',
        skills: {
            type: 'statement',
            content: {
                text: "Clarity > Complexity"
            }
        },
    }
];
