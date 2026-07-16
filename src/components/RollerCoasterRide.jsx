/**
 * RollerCoasterRide — Easter egg fullscreen shader overlay.
 *
 * Renders a fullscreen WebGL shader (rideShader) triggered by the
 * "Roller Coaster ⚠️" button in the Contact section.
 * Press Escape or click the button again to close.
 *
 * Side-effects: adds/removes `roller-coaster-open` class on document.body
 * to allow CSS to respond to the open state (e.g. hide scrollbars).
 */
import { useEffect, useState } from "react";
import LocalShaderCanvas from "./LocalShaderCanvas";
import { rideShaderSource } from "../shaders/rideShader";
import "./RollerCoasterRide.css";

export default function RollerCoasterRide() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.classList.add("roller-coaster-open");
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.classList.remove("roller-coaster-open");
    }

    return () => {
      document.body.classList.remove("roller-coaster-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="roller-coaster-overlay">
          <LocalShaderCanvas
            className="roller-coaster-canvas"
            fragmentShaderSource={rideShaderSource}
          />
          <div className="roller-coaster-overlay-vignette" />
        </div>
      )}

      <button
        type="button"
        className={`roller-coaster-button ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? "← My bad" : "Roller Coaster ⚠️"}
      </button>
    </>
  );
}
