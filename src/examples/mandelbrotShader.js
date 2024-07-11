import { Input, Shader, ShaderLayer, Sketch } from '../webpacked-p5';

const sketch = new Sketch({
    width: 1000,
});

const [fragPath, vertPath] = Shader.getShaderPaths('mandelbrotShader');
const shader = new Shader(ShaderLayer.GLOBAL, false, fragPath, vertPath);

let zoom = 3;
const offset = Sketch.p5.createVector(0.6, 0);

const zoomButtonSize = 80;
const zoomButtonMargin = zoomButtonSize / 8;

const plusButtonX = zoomButtonMargin;
const plusButtonY = zoomButtonMargin;

const minusButtonX = 2 * zoomButtonMargin + zoomButtonSize;
const minusButtonY = zoomButtonMargin;

const factorSliders = [];

let offsetP, zoomP;

sketch.setup = function () {
    for (let i = 0; i < 3; i++)
        factorSliders.push(Sketch.p5.createSlider(0.00001, 1, 0, Math.pow(10, -10)));

    offsetP = Sketch.p5.createP('');
    zoomP = Sketch.p5.createP('');
};

sketch.draw = function () {
    updateOffsetAndZoom();

    offsetP.html(`Current offset: (${offset.x}, ${offset.y})`);
    zoomP.html(`Current zoom: ${zoom}`);

    shader.shader?.setUniform('uResolution', [Sketch.width, Sketch.height]);

    shader.shader?.setUniform('uW', zoom);
    shader.shader?.setUniform('uOffset', [offset.x, offset.y]);
    shader.shader?.setUniform(
        'uFactors',
        factorSliders.map((slider) => slider.value())
    );

    Sketch.graphicsUI.clear();

    Sketch.graphicsUI.fill(0, 120);
    Sketch.graphicsUI.noStroke();

    Sketch.graphicsUI.rect(plusButtonX, plusButtonY, zoomButtonSize, zoomButtonSize, 16);
    Sketch.graphicsUI.rect(minusButtonX, minusButtonY, zoomButtonSize, zoomButtonSize, 16);

    Sketch.graphicsUI.fill(255);
    Sketch.graphicsUI.textFont(Sketch.p5font, zoomButtonSize);
    Sketch.graphicsUI.textAlign(Sketch.p5.CENTER, Sketch.p5.CENTER);
    Sketch.graphicsUI.text(
        '+',
        plusButtonX + zoomButtonSize / 2,
        plusButtonY + zoomButtonSize / 2 - zoomButtonSize / 8
    );
    Sketch.graphicsUI.text(
        '-',
        minusButtonX + zoomButtonSize / 2,
        minusButtonY + zoomButtonSize / 2 - zoomButtonSize / 8
    );
};

function updateOffsetAndZoom() {
    if (!Input.mouseIsPressed) {
        return;
    }

    const overPlusButton =
        Input.mouseX >= plusButtonX &&
        Input.mouseX < plusButtonX + zoomButtonSize &&
        Input.mouseY >= plusButtonY &&
        Input.mouseY < plusButtonY + zoomButtonSize;

    const overMinusButton =
        Input.mouseX >= minusButtonX &&
        Input.mouseX < minusButtonX + zoomButtonSize &&
        Input.mouseY >= minusButtonY &&
        Input.mouseY < minusButtonY + zoomButtonSize;

    if (overPlusButton) zoom -= zoom * 0.05;
    else if (overMinusButton) zoom += zoom * 0.05;
    else {
        if (
            Input.mouseX < 0 ||
            Input.mouseX >= Sketch.width ||
            Input.mouseY < 0 ||
            Input.mouseY >= Sketch.height
        )
            return;
        const delta = Sketch.p5.createVector(
            Input.mouseX - Input.pmouseX,
            Input.mouseY - Input.pmouseY
        );
        const speed = zoom * 0.0032;
        delta.mult(speed);
        offset.add(delta);
    }
}

sketch.start();
