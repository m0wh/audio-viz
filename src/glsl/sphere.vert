uniform float time;
uniform float volume;

varying float val;

void main () {
  val = (sin(time * 10.) + 1.) / 2. + (cos(position.y * 10. - position.x * 5.) + 1.) / 2.;
  vec3 newPos = position * (volume * 2. + .5);

  vec4 modelViewPosition = modelViewMatrix * vec4(newPos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
