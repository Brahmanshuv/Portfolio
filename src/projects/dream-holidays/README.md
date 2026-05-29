# 🌴 Dream Holidays Case Study System

This directory houses the structured content, metadata, styles, and configurations for the **Dream Holidays** case study. It establishes a highly scalable, zero-dependency reusable template architecture.

## 📁 Directory Structure

```
/src/projects/dream-holidays
├── metadata.js   # Decoupled project parameters (Title, Category, Tags, Role)
├── content.js    # Decoupled deep, high-fidelity case study text copy & diagrams
├── styles.js     # Curated colors, spacings, and local visual system configurations
├── page.jsx      # Rendering shell loading CaseStudyTemplate
└── README.md     # System documentation (This file)
```

---

## 🚀 How to Add Future Case Studies

To add a new project in the future without rebuild layouts:

1. **Create a New Folder**:
   Create `/src/projects/your-project-slug/`

2. **Add Metadata (`metadata.js`)**:
   Define details matching the following format:
   ```javascript
   export const metadata = {
       id: 'your-project',
       title: 'Your Project Title',
       subtitle: 'Detailed Subtitle...',
       category: 'UX / Product Design',
       slug: 'your-project-slug',
       role: 'Product Designer',
       year: '2024',
       tags: ['Tag A', 'Tag B'],
       timeline: '6 Weeks',
       projectType: 'Conceptual',
       status: 'Shipped',
       coverImage: 'hero-cover.webp'
   };
   ```

3. **Add Rich Content (`content.js`)**:
   Provide headings, paragraphs, and list configurations matching the outline inside `src/projects/dream-holidays/content.js`.

4. **Add Render Shell (`page.jsx`)**:
   Create a basic shell passing metadata and content:
   ```jsx
   import React from 'react';
   import CaseStudyTemplate from '../../components/CaseStudyTemplate';
   import { metadata } from './metadata';
   import { content } from './content';

   export default function ProjectPage() {
       return <CaseStudyTemplate metadata={metadata} content={content} />;
   }
   ```

5. **Register the Project**:
   Add the component to the central case study registry in `/src/projects/registry.js` (or `/src/projects/index.js`).
