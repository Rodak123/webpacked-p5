import { Sketch } from '../webpacked-p5';

const sketch = new Sketch();

sketch.setup = function () {};

sketch.draw = function () {
    Sketch.graphics.background(21);

    Sketch.graphicsUI.noStroke();
    Sketch.graphicsUI.fill(0, 0, 255);
    Sketch.graphicsUI.rect(0, Sketch.height - 100, Sketch.width, 100);

    Sketch.graphics.noStroke();
    Sketch.graphics.fill(0, 255, 0);
    Sketch.graphics.rect(0, 0, 100, Sketch.height);
};

sketch.setup = null;

sketch.start();
