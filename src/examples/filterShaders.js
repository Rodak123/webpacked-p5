import { Shader, ShaderLayer, Sketch, Time } from '../webpacked-p5';

const sketch = new Sketch();

const [fragPath] = Shader.getShaderPaths('filterShader');
const shader = new Shader(ShaderLayer.GRAPHICS, true, fragPath);

sketch.draw = function () {
    shader.shader?.setUniform('uMillis', Time.millis);

    Sketch.graphics.background(50);

    Sketch.graphics.fill(255);
    Sketch.graphics.noStroke();
    Sketch.graphics.rectMode(Sketch.p5.CENTER);
    Sketch.graphics.rect(Sketch.p5.mouseX, Sketch.p5.mouseY, 400, 400, 16);

    Sketch.graphicsUI.rectMode(Sketch.p5.CENTER);
    Sketch.graphicsUI.rect(Sketch.width / 2, 100, 500, 50);

    Sketch.graphicsUI.fill(0);
    Sketch.graphicsUI.noStroke();
    Sketch.graphicsUI.textFont(Sketch.p5font, 20);
    Sketch.graphicsUI.textAlign(Sketch.p5.CENTER, Sketch.p5.CENTER);
    Sketch.graphicsUI.text(`Shader gets applied to ${shader.layer.key}`, Sketch.width / 2, 100);
};

sketch.start();
