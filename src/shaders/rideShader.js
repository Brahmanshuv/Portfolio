export const rideShaderSource = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;

const int RAY_STEPS = 150;
const float BRIGHTNESS = 1.2;
const float GAMMA = 1.4;
const float SATURATION = 0.65;
const float detail = 0.001;

// 2D rotation function
mat2 rot(float a) {
  return mat2(cos(a), sin(a), -sin(a), cos(a));
}

// "Amazing Surface" fractal
vec4 formula(vec4 p) {
  p.xz = abs(p.xz + 1.0) - abs(p.xz - 1.0) - p.xz;
  p.y -= 0.25;
  p.xy *= rot(radians(35.0));
  p = p * 2.0 / clamp(dot(p.xyz, p.xyz), 0.2, 1.0);
  return p;
}

// Distance function
float de(vec3 pos) {
  // Waves
  pos.y += sin(pos.z - iTime * 3.0) * 0.15;
  
  vec3 tpos = pos;
  tpos.z = abs(3.0 - mod(tpos.z, 6.0));
  vec4 p = vec4(tpos, 1.0);
  for (int i = 0; i < 4; i++) {
    p = formula(p);
  }
  float fr = (length(max(vec2(0.0), p.yz - 1.5)) - 1.0) / p.w;
  float ro = max(abs(pos.x + 1.0) - 0.3, pos.y - 0.35);
  ro = max(ro, -max(abs(pos.x + 1.0) - 0.1, pos.y - 0.5));
  pos.z = abs(0.25 - mod(pos.z, 0.5));
  ro = max(ro, -max(abs(pos.z) - 0.2, pos.y - 0.3));
  ro = max(ro, -max(abs(pos.z) - 0.01, -pos.y + 0.32));
  return min(fr, ro);
}

// Camera path
vec3 path(float ti) {
  ti *= 1.5;
  return vec3(sin(ti), (1.0 - sin(ti * 2.0)) * 0.5, -ti * 5.0) * 0.5;
}

// Calc normals, and here is edge detection, set to variable "edge"
vec3 normal(vec3 p, float det, out float edge) {
  vec3 e = vec3(0.0, det * 5.0, 0.0);
  float d1 = de(p - e.yxx);
  float d2 = de(p + e.yxx);
  float d3 = de(p - e.xyx);
  float d4 = de(p + e.xyx);
  float d5 = de(p - e.xxy);
  float d6 = de(p + e.xxy);
  float d = de(p);
  edge = abs(d - 0.5 * (d2 + d1)) + abs(d - 0.5 * (d4 + d3)) + abs(d - 0.5 * (d6 + d5));
  edge = min(1.0, pow(edge, 0.55) * 15.0);
  return normalize(vec3(d1 - d2, d3 - d4, d5 - d6));
}

// Raymarching and 2D graphics
vec3 raymarch(vec3 from, vec3 dir, out float edge, out float det) {
  edge = 0.0;
  vec3 p;
  float d = 100.0;
  float totdist = 0.0;
  for (int i = 0; i < RAY_STEPS; i++) {
    if (d > det && totdist < 25.0) {
      p = from + totdist * dir;
      d = de(p);
      det = detail * exp(0.13 * totdist);
      totdist += d;
    }
  }
  vec3 col = vec3(0.0);
  p -= (det - d) * dir;
  vec3 norm = normal(p, det, edge);
  col = (1.0 - abs(norm)) * max(0.0, 1.0 - edge * 0.8);
  totdist = clamp(totdist, 0.0, 26.0);
  dir.y -= 0.02;
  
  float sunsize = 7.0;
  float an = atan(dir.x, dir.y) + iTime * 1.5;
  float s = pow(clamp(1.0 - length(dir.xy) * sunsize - abs(0.2 - mod(an, 0.4)), 0.0, 1.0), 0.1);
  float sb = pow(clamp(1.0 - length(dir.xy) * (sunsize - 0.2) - abs(0.2 - mod(an, 0.4)), 0.0, 1.0), 0.1);
  float sg = pow(clamp(1.0 - length(dir.xy) * (sunsize - 4.5) - 0.5 * abs(0.2 - mod(an, 0.4)), 0.0, 1.0), 3.0);
  float y = mix(0.45, 1.2, pow(smoothstep(0.0, 1.0, 0.75 - dir.y), 2.0)) * (1.0 - sb * 0.5);
  
  vec3 backg = vec3(0.5, 0.0, 1.0) * ((1.0 - s) * (1.0 - sg) * y + (1.0 - sb) * sg * vec3(1.0, 0.8, 0.15) * 3.0);
  backg += vec3(1.0, 0.9, 0.1) * s;
  backg = max(backg, sg * vec3(1.0, 0.9, 0.5));
  
  col = mix(vec3(1.0, 0.9, 0.3), col, exp(-0.004 * totdist * totdist));
  if (totdist > 25.0) col = backg;
  col = pow(col, vec3(GAMMA)) * BRIGHTNESS;
  col = mix(vec3(length(col)), col, SATURATION);
  col *= vec3(1.0, 0.9, 0.85);
  return col;
}

// get camera position
vec3 move(inout vec3 dir, float time) {
  float t = time * 0.5;
  vec3 go = path(t);
  vec3 adv = path(t + 0.7);
  vec3 advec = normalize(adv - go);
  float an = adv.x - go.x;
  an *= min(1.0, abs(adv.z - go.z)) * sign(adv.z - go.z) * 0.7;
  dir.xy = rot(an) * dir.xy;
  an = advec.y * 1.7;
  dir.yz = rot(an) * dir.yz;
  an = atan(advec.x, advec.z);
  dir.xz = rot(an) * dir.xz;
  return go;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord.xy / iResolution.xy * 2.0 - 1.0;
  vec2 oriuv = uv;
  uv.y *= iResolution.y / iResolution.x;
  vec2 mouse = vec2(0.0, -0.05);
  if (iMouse.x > 0.0 || iMouse.y > 0.0) {
    mouse = (iMouse.xy / iResolution.xy - 0.5) * 3.0;
  }
  float fov = 0.9 - max(0.0, 0.7 - iTime * 0.3);
  vec3 dir = normalize(vec3(uv * fov, 1.0));
  dir.yz = rot(mouse.y) * dir.yz;
  dir.xz = rot(mouse.x) * dir.xz;
  vec3 from = vec3(-1.0, 0.7, 0.0) + move(dir, -iTime);
  float edge = 0.0;
  float det = 0.0;
  vec3 color = raymarch(from, dir, edge, det);
  color = mix(vec3(0.0), color, pow(max(0.0, 0.95 - length(oriuv * oriuv * oriuv * vec2(1.05, 1.1))), 0.3));
  fragColor = vec4(color, 1.0);
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;
