precision highp float;

varying vec2 vTexCoord;

uniform vec2 uResolution;

uniform vec2 uOffset;
uniform float uW;

uniform vec3 uFactors;

const int maxIterations = 2048;
const float infinity = 16.0;

float computeMandelbrot(vec2 position, vec2 offset, float w) {
    float ratio = uResolution.y / uResolution.x;
    vec2 size = vec2(w, w * ratio);

    vec2 pos = (position - vec2(0.5, 0.5)) * size - offset;

    float a = pos.x;
    float b = pos.y;
    
    int n;
    for(int i=0; i<maxIterations; i++) {
        n = i;

        float aa = a * a;
        float bb = b * b;
        float abs = sqrt(aa + bb);
        if(abs > infinity) {
            break;
        }
        float twoab = 2.0 * a * b;
        a = aa - bb + pos.x;
        b = twoab + pos.y;
    }
    
    return float(n);
}

void main(){
    float n = computeMandelbrot(vTexCoord, uOffset, uW);
    const float nMax = float(maxIterations);

    vec3 factors = uFactors;
    float r = mod(n, nMax * factors.r) / (nMax * factors.r);
    float g = mod(n, nMax * factors.g) / (nMax * factors.g);
    float b = mod(n, nMax * factors.b) / (nMax * factors.b);
    gl_FragColor = vec4(r, g, b, 1.0);
}