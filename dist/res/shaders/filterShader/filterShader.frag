precision highp float;

uniform sampler2D tex0;
uniform float uMillis;

varying vec2 vTexCoord;

void main() {
  vec4 color = texture2D(tex0, vTexCoord);
  
  float blue = (sin(uMillis / 1000.0) + 1.0) / 2.0;

  gl_FragColor = color * vec4(vTexCoord.x, vTexCoord.y, blue, 1.0);
}
