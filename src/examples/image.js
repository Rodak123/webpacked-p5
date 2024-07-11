import { Image, Sketch } from '../webpacked-p5';

const p5Image = new Image('p5.png');

const sketch = new Sketch();

sketch.setup = function () {};

sketch.draw = function () {
    Sketch.graphics.background(21);

    Sketch.graphics.imageMode(Sketch.p5.CENTER);
    Sketch.graphics.image(p5Image.image, Sketch.p5.mouseX, Sketch.p5.mouseY, 64, 64);
};

sketch.start();
