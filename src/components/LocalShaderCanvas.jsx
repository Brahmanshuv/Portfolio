import React, { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function LocalShaderCanvas({ fragmentShaderSource, className }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0, clickX: 0, clickY: 0, isDown: false });

  const isPlaceholder = !fragmentShaderSource || !fragmentShaderSource.includes("mainImage");

  useEffect(() => {
    if (isPlaceholder) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Add uniforms dynamically only if they are not already defined in the source
    let uniformPrefix = "";
    if (!fragmentShaderSource.includes("uniform vec3 iResolution") && !fragmentShaderSource.includes("uniform vec2 iResolution")) {
      uniformPrefix += "uniform vec3 iResolution;\n";
    }
    if (!fragmentShaderSource.includes("uniform float iTime")) {
      uniformPrefix += "uniform float iTime;\n";
    }
    if (!fragmentShaderSource.includes("uniform vec4 iMouse")) {
      uniformPrefix += "uniform vec4 iMouse;\n";
    }

    const hasMain = fragmentShaderSource.includes("void main()");
    const fullFragmentShaderSource = `
      precision highp float;
      ${uniformPrefix}
      ${fragmentShaderSource}
      ${hasMain ? "" : `
      void main() {
        vec4 color;
        mainImage(color, gl_FragCoord.xy);
        gl_FragColor = color;
      }
      `}
    `;

    const program = createProgram(gl, vertexShaderSource, fullFragmentShaderSource);
    if (!program) return;

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const timeLocation = gl.getUniformLocation(program, "iTime");
    const mouseLocation = gl.getUniformLocation(program, "iMouse");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      mouseRef.current.isDown = true;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.clickX = x;
      mouseRef.current.clickY = y;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const render = () => {
      resize();

      const elapsed = (performance.now() - startTimeRef.current) * 0.001;

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform3f(resolutionLocation, canvas.width, canvas.height, 1.0);
      gl.uniform1f(timeLocation, elapsed);
      
      const m = mouseRef.current;
      gl.uniform4f(
        mouseLocation,
        m.x * (canvas.width / canvas.clientWidth),
        m.y * (canvas.height / canvas.clientHeight),
        m.clickX * (canvas.width / canvas.clientWidth),
        m.clickY * (canvas.height / canvas.clientHeight)
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [fragmentShaderSource, isPlaceholder]);

  if (isPlaceholder) {
    return (
      <div className="shader-placeholder-container">
        <div className="shader-placeholder-card">
          <span className="shader-placeholder-warning-icon">⚠️</span>
          <p className="shader-placeholder-text">
            Missing exact XsBXWt GLSL source. Paste the shader code into <code className="shader-placeholder-code">src/shaders/rideShader.js</code>
          </p>
        </div>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={className} />;
}
