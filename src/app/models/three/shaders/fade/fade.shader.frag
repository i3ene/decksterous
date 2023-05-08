varying vec3 fNormal;
uniform vec3 col1;
uniform vec3 col2;

vec3 lerpColor(vec3 color1, vec3 color2, float t) {
  vec3 color = vec3(0);
  color.x = color1.x + ((color2.x - color1.x) * t);
  color.y = color1.y + ((color2.y - color1.y) * t);
  color.z = color1.z + ((color2.z - color1.z) * t);
  return color;
}

void main(void) {
  gl_FragColor = vec4( lerpColor(col1, col2, fNormal.y), 1. );
}
