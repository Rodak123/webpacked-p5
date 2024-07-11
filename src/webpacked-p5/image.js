import p5 from 'p5';
import { Sketch } from './sketch';
import { validateFilePath } from './validation';
/**
 * Easy to use image class that loads the desired image on preload
 */
class Image {
    /**
     * @param {string} imagePath Path to the desired image inside the images/ folder
     */
    constructor(imagePath) {
        this._imagePath = validateFilePath(imagePath, [], 'Image path');
        this._image = null;

        if (Sketch.isAfterPreload) {
            console.error(`Image must be created before '${Sketch.preloadEventName}'.`);
        } else {
            Sketch.addPreloadEvent(() => {
                this._loadImage();
            });
        }
    }

    _loadImage() {
        const imagePath = `${Sketch.resourcesPath}/images/${this._imagePath}`;
        Sketch.p5.loadImage(
            imagePath,
            (image) => {
                this._image = image;
            },
            (err) => {
                console.error(`Failed to load image at '${imagePath}'.\n${err}`);
            }
        );
    }

    /**
     * @returns {p5.Image} Loaded p5.Image
     */
    get image() {
        return this._image;
    }
}

export { Image };
