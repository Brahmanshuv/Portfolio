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
                desc: "", // Removed description completely as requested
                tags: ["Design Systems", "User Flows", "Information Architecture", "Scalability", "Problem Solving", "Product Strategy"],
                micro: "SCALABLE LOGIC"
            }
        },
    },
    {
        id: 'tile-2',
        skills: {
            type: 'list',
            content: {
                title: "Interaction Architecture",
                list: ["User Flows", "Navigation", "States", "Edge Cases", "Interactions", "Prototyping"],
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
                list: ["User Journeys", "Information Architecture", "Wireframing", "Prototyping"],
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
                list: ["User Research", "Usability Testing", "Analysis", "Iteration"],
                micro: "DATA DRIVEN"
            }
        },
    },
    {
        id: 'tile-5',
        skills: {
            type: 'list',
            content: {
                title: "Typography",
                list: ["Hierarchy", "Spacing", "Consistency", "Readability"],
                micro: "PIXEL PERFECT"
            }
        },
    },
    {
        id: 'tile-6',
        skills: {
            type: 'grid-list',
            content: {
                title: <>3D & Spatial<br />Systems</>,
                list: ["Blender", "Motion", "Product Visualization", "3D Design", "Rendering", "Animation"],
                micro: "SPATIAL UI"
            }
        },
    },
    {
        id: 'tile-7',
        skills: {
            type: 'chips',
            content: {
                title: "Design Environment",
                list: ["Figma", "Blender", "Adobe", "Miro", "ChatGPT", "Antigravity"],
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
