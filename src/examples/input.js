import { Input, Sketch } from '../webpacked-p5';

const sketch = new Sketch();

let scrollValue = 0;

sketch.input.addMouseWheelEvent(function (event) {
    scrollValue += event.delta;
});

sketch.draw = function () {
    Sketch.graphics.background(21);

    Sketch.graphics.noStroke();
    Sketch.graphics.fill(255, 100, 255);
    Sketch.graphics.rect(0, 400, 800, scrollValue);
    scrollValue = 0;

    if (Input.mouseIsPressed === false) Sketch.graphicsUI.clear();

    Sketch.graphicsUI.noStroke();
    Sketch.graphicsUI.fill(255, 100, 100);
    Sketch.graphicsUI.circle(Input.mouseX, Input.mouseY, 32);
};

sketch.start();
