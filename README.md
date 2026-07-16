# Brahmanshu Verma — Portfolio

A personal portfolio website for product design, UI/UX, 3D experiments, case studies, and interactive web experiences. Built with React and Vite, featuring WebGL shaders, smooth scroll, and cinematic animations.

## Live

[brahmanshuverma.com](https://brahmanshuverma.com) *(update with your live URL)*

## Sections

- **Hero** — Marble WebGL shader, 3D project carousel, mouse-parallax depth
- **Experience** — Timeline of roles and companies
- **Selected Work** — Project archive with desktop showcase and mobile accordion views
- **Skills** — Bento-grid capabilities layout
- **Case Studies** — Deep-dive editorial breakdowns
- **Contact** — Card tilt, Roller Coaster Easter egg, music widget

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Styling | Vanilla CSS |
| 3D / Shaders | Three.js, WebGL (GLSL) |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| Scroll | Lenis (smooth scroll) |
| Loading | Lottie (JSON animation) |

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
  components/     # All page section components
  data/           # Static data (projects, capabilities, case studies)
  animations/     # Shared Framer Motion variants
  shaders/        # GLSL fragment shader source strings
  utils/          # Router utility
  projects/       # Per-project case study pages and registry

assets/           # Source assets (images, Lottie JSON) — imported by components
public/           # Static assets served at root (project previews, icons)
```
