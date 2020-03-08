
uniform vec3 colorA;
uniform vec3 colorB;
uniform float volume;

varying float val;

void main() {
  vec3 color = mix(colorA, colorB, val * volume);

  gl_FragColor = vec4(color, 1.0);
}
