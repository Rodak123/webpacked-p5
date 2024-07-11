import { Sketch } from './sketch';
import { validateFilePath } from './validation';

/**
 * Easy to use font class that loads the desired font on preload
 */
class Font {
    /**
     * @param {string} fontPath Path to desired font inside the fonts/ folder
     */
    constructor(fontPath) {
        this._fontPath = validateFilePath(fontPath, [], 'Font path');
        this._font = null;

        if (Sketch.isAfterPreload) {
            console.error(`Font must be created before '${Sketch.preloadEventName}'.`);
        } else {
            Sketch.addPreloadEvent(() => {
                this._loadFont();
            });
        }
    }

    _loadFont() {
        const fontPath = `${Sketch.resourcesPath}/fonts/${this._fontPath}`;
        Sketch.p5.loadFont(
            fontPath,
            (font) => {
                this._font = font;
            },
            (err) => {
                console.error(`Failed to load font at '${fontPath}'.\n${err}`);
            }
        );
    }

    /**
     * Loaded p5.Font
     */
    get font() {
        return this._font;
    }
}

export { Font };
