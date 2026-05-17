import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  "AI Inference",
  "AI Training",
  "Aluminum Smelting",
  "Aviation Fuel Refining",
  "Battery Manufacturing",
  "Bitcoin Mining",
  "Carbon Capture",
  "Cement Production",
  "Desalination",
  "Direct Air Capture",
  "Direct Ocean Capture",
  "Electrified Transport Infrastructure",
  "Electrofuels Production",
  "Fertilizer Production",
  "Fusion Power",
  "Geologic Hydrogen Extraction",
  "High-Performance Computing",
  "Hydrogen Production",
  "Hyperscale Data Centers",
  "Industrial Heat Electrification",
  "Next-Generation Nuclear",
  "Petrochemical Refining",
  "Quantum Computing",
  "Rare Earth Processing",
  "Semiconductor Fabrication",
  "Space-Based Manufacturing",
  "Space Launch",
  "Steelmaking",
  "Waste-To-Energy Conversion",
];

const LOOPED_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

const RIGHT_CONTENT = {
  title: "Our Ambition",
  desc: "Our ambition is to build a platform that evolves alongside energy-intensive technologies for decades to come\u2014from the world-shaping innovations of today to the nascent ideas of tomorrow and the breakthroughs yet to be achieved.",
};

// ─── TUNING CONSTANTS ───
const SMOOTHING = 0.08;
const SCALE_FALLOFF = 0.55;
const SCALE_MIN = 0.6;
const OPACITY_FALLOFF = 0.65;
const OPACITY_MIN = 0.2;
const DISTORTION_MAX = 8;        // px horizontal wave
const ABERRATION_MAX = 0.3;      // max chromatic opacity
const ABERRATION_OFFSET = 1;     // px shift for R/B channels

export default function PoweringTheFuture() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const rightPanelRef = useRef(null);
  const prevActiveRef = useRef(-1);
  const scrollState = useRef({ target: 0, current: 0 });

  // ─── Per-item transform: scale, opacity, distortion, aberration ───
  const applyItemTransforms = useCallback((vh, center, scrollProgress) => {
    const items = itemRefs.current;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const itemCenter = rect.top + rect.height * 0.5;
      const distance = itemCenter - center;
      const absDistance = Math.abs(distance);

      if (absDistance < minDistance) {
        minDistance = absDistance;
        closestIndex = i;
      }

      // ─── Normalized distance (0=center, 1=edge) ───
      const normalized = Math.min(absDistance / (vh * 0.5), 1);

      // ─── SCALE: perspective shrink from center ───
      const rawScale = 1 - (normalized * SCALE_FALLOFF);
      const scale = Math.max(Math.min(rawScale, 1), SCALE_MIN);

      // ─── OPACITY: depth fade ───
      const opacity = Math.max(1 - (normalized * OPACITY_FALLOFF), OPACITY_MIN);

      // ─── DISTORTION: subtle horizontal sine wave ───
      const dist = normalized;
      const offsetX = Math.sin(i + scrollProgress * 2) * dist * DISTORTION_MAX;

      // ─── APPLY transform (no blur!) ───
      el.style.transform = `translateX(${offsetX.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);

      // ─── CHROMATIC ABERRATION: control pseudo-element opacity via CSS var ───
      const aberration = normalized * ABERRATION_MAX;
      el.style.setProperty("--aberration", aberration.toFixed(3));

      // ─── GLASS LAYER: atmospheric intensity scales with distance ───
      const glass = el.querySelector(".ptf-glass");
      if (glass) {
        const glassOpacity = normalized * 0.04;
        glass.style.opacity = glassOpacity.toFixed(4);
      }
    }

    // ─── Active item change + right panel crossfade ───
    if (closestIndex !== prevActiveRef.current) {
      const prev = prevActiveRef.current;
      prevActiveRef.current = closestIndex;

      if (prev >= 0 && items[prev]) items[prev].classList.remove("active");
      if (items[closestIndex]) items[closestIndex].classList.add("active");

      const rp = rightPanelRef.current;
      if (rp && prev >= 0) {
        gsap.to(rp, {
          opacity: 0,
          duration: 0.12,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(rp, { opacity: 1, duration: 0.2, ease: "power2.out" });
          },
        });
      }
    }
  }, []);

  // ─── GSAP + Inertia scroll engine ───
  useEffect(() => {
    const ctx = gsap.context(() => {
      const list = listRef.current;
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!list || !section || !sticky) return;

      // Section fade-in
      gsap.fromTo(
        sticky,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // Right panel entry
      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 30%",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Scroll target capture
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.current.target = self.progress;
        },
      });

      // ─── INERTIA TICKER ───
      const tickerFn = () => {
        const state = scrollState.current;
        const diff = state.target - state.current;
        if (Math.abs(diff) < 0.00001) return;

        state.current += diff * SMOOTHING;

        const vh = window.innerHeight;
        const center = vh * 0.5;
        const totalHeight = list.scrollHeight;
        const maxTravel = totalHeight - vh;
        const y = -(state.current * maxTravel);

        gsap.set(list, { y });
        applyItemTransforms(vh, center, state.current);
      };

      gsap.ticker.add(tickerFn);
      return () => gsap.ticker.remove(tickerFn);
    }, sectionRef);

    return () => ctx.revert();
  }, [applyItemTransforms]);

  return (
    <section ref={sectionRef} className="ptf-section">
      <div ref={stickyRef} className="ptf-sticky">

        <div className="ptf-text-track">
          <div className="ptf-list" ref={listRef}>
            {LOOPED_ITEMS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="ptf-item"
                data-text={item}
              >
                {/* Glass refraction layer */}
                <div className="ptf-glass" />
                {/* Text with chromatic aberration pseudo-elements */}
                <span className="ptf-text" data-text={item}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ptf-divider" />

        <div className="ptf-label-left">
          <p>Powering the Future</p>
        </div>

        <div ref={rightPanelRef} className="ptf-label-right">
          <h4>{RIGHT_CONTENT.title}</h4>
          <p>{RIGHT_CONTENT.desc}</p>
        </div>

      </div>
    </section>
  );
}
