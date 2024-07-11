import { Sketch, Time } from '../webpacked-p5';

const sketch = new Sketch();

const timeToCross = 4 * 1000; // ms
const barWidth = 100;

const increment = (Sketch.width + barWidth) / timeToCross;

let incrementalX = -barWidth;
let p5IncrementalX = -barWidth;

let timeScaleSlider;

sketch.setup = function () {
    timeScaleSlider = Sketch.p5.createSlider(0, 2, 1, 0.01);
    timeScaleSlider.elt.oninput = (event) => {
        Time.timeScale = event.target.value;
    };
    timeScaleSlider.style(`width: ${Sketch.width}px`);

    incrementalX += Time.millis * increment;
    p5IncrementalX += Sketch.p5.millis() * increment;
};

sketch.draw = function () {
    sketch.drawSettings.drawGraphicsUI = (Sketch.p5.keyIsPressed && Sketch.p5.key == 'h') === false;

    Sketch.graphics.background(21);
    Sketch.graphicsUI.clear();

    Sketch.graphics.noStroke();

    incrementalX += increment * Time.deltaTime;
    if (incrementalX >= Sketch.width) incrementalX -= Sketch.width + barWidth;

    const computedX = Sketch.p5.map(
        (Time.millis % timeToCross) / timeToCross,
        0,
        1,
        -barWidth,
        Sketch.width
    );

    p5IncrementalX += increment * Sketch.p5.deltaTime;
    if (p5IncrementalX >= Sketch.width) p5IncrementalX -= Sketch.width + barWidth;

    const p5ComputedX = Sketch.p5.map(
        (Sketch.p5.millis() % timeToCross) / timeToCross,
        0,
        1,
        -barWidth,
        Sketch.width
    );

    Sketch.graphics.fill(0, 255, 0);
    Sketch.graphics.rect(incrementalX, Sketch.height / 2, barWidth, Sketch.height / 4);

    Sketch.graphics.fill(255, 0, 0);
    Sketch.graphics.rect(
        computedX,
        Sketch.height / 2 + Sketch.height / 4,
        barWidth,
        Sketch.height / 4
    );

    Sketch.graphics.fill(0, 255, 0);
    Sketch.graphics.rect(p5IncrementalX, 0, barWidth, Sketch.height / 4);

    Sketch.graphics.fill(255, 0, 0);
    Sketch.graphics.rect(p5ComputedX, Sketch.height / 4, barWidth, Sketch.height / 4);

    Sketch.graphicsUI.noStroke();
    Sketch.graphicsUI.fill(0, 0, 255, 80);
    Sketch.graphicsUI.rectMode(Sketch.p5.CORNER);
    Sketch.graphicsUI.rect(0, Sketch.height - 100, Sketch.width, 100);

    Sketch.graphicsUI.textFont(Sketch.p5font, 32);

    Sketch.graphicsUI.fill(255);
    Sketch.graphicsUI.textAlign(Sketch.p5.CENTER, Sketch.p5.CENTER);
    Sketch.graphicsUI.text(
        'Time scale: ' + Time.timeScale + 'x' + '\n' + 'Millis: ' + Math.floor(Time.millis),
        Sketch.width / 2,
        Sketch.height - 50
    );

    Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.TOP);
    Sketch.graphicsUI.text("Hold 'h' to hide UI", 16, 16);

    Sketch.graphicsUI.textFont(Sketch.p5font, 24);
    Sketch.graphicsUI.stroke(0);
    Sketch.graphicsUI.strokeWeight(2);

    Sketch.graphicsUI.fill(0, 255, 0);
    Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.CENTER);
    Sketch.graphicsUI.text(
        "The green bar's x is\nincrementally changed\nevery frame.",
        16,
        Sketch.height - 50
    );

    Sketch.graphicsUI.fill(255, 0, 0);
    Sketch.graphicsUI.textAlign(Sketch.p5.RIGHT, Sketch.p5.CENTER);
    Sketch.graphicsUI.text(
        "The reds bar's x is\ncomputed from millis\nevery frame.",
        Sketch.width - 16,
        Sketch.height - 50
    );

    Sketch.graphicsUI.fill(0);
    Sketch.graphicsUI.noStroke();
    Sketch.graphicsUI.rectMode(Sketch.p5.CENTER);
    Sketch.graphicsUI.rect(Sketch.width / 2, Sketch.height / 2, Sketch.width, 8);

    Sketch.graphicsUI.fill(255);
    Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.BOTTOM);
    Sketch.graphicsUI.text('p5', 16, Sketch.height / 2 - 4);

    Sketch.graphicsUI.fill(255);
    Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.TOP);
    Sketch.graphicsUI.text('webpacked-p5', 16, Sketch.height / 2 + 4);
};

sketch.start();
