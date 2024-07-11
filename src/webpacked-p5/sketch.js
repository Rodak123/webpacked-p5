import p5 from 'p5';

import { DrawSettings } from './drawSettings';
import { Font } from './font';
import { Input } from './input';
import { Shader, ShaderLayer } from './shader/shader';
import { Time } from './time';
import { validateTypeOrDefault } from './validation';

/**
 * A wrapper class for a p5 sketch instance.
 */
class Sketch {
    /**
     * @returns {string} Path to the resources folder from the index
     */
    static get resourcesPath() {
        return './res';
    }

    /**
     * @returns {string} Name of the preload event
     */
    static get preloadEventName() {
        return 'preload';
    }

    /**
     * @returns {string} Name of the setup event
     */
    static get setupEventName() {
        return 'setup';
    }

    /**
     * @type {Sketch|null}
     */
    static _activeSketch = null;

    /**
     * @type {void[]}
     */
    static _preloadEvents = [];
    /**
     * @type {void[]}
     */
    static _setupEvents = [];

    /**
     * @type {Shader[]}
     */
    static _shaders = [];

    /**
     * @returns {boolean} Wheter there is an active sketch
     */
    static get isSketchActive() {
        return this._activeSketch !== null;
    }

    /**
     * @returns {Sketch|null} The active sketch
     */
    static get sketch() {
        return this._activeSketch;
    }

    /**
     * @returns {p5|null} p5 instance used by the active sketch
     */
    static get p5() {
        if (!this.isSketchActive) return null;
        return this._activeSketch.p5;
    }

    /**
     * @returns {p5.Graphics|null} Graphics of the active sketch
     */
    static get graphics() {
        if (!this.isSketchActive) return null;
        return this._activeSketch.graphics;
    }

    /**
     * @returns {p5.Graphics|null} UI Graphics of the active sketch
     */
    static get graphicsUI() {
        if (!this.isSketchActive) return null;
        return this._activeSketch.graphicsUI;
    }

    /**
     * @returns {number} Width of the active sketch canvas or -1
     */
    static get width() {
        if (!this.isSketchActive) return -1;
        return this._activeSketch.width;
    }

    /**
     * @returns {number} Height of the active sketch canvas or -1
     */
    static get height() {
        if (!this.isSketchActive) return -1;
        return this._activeSketch.height;
    }

    /**
     * @returns {Font|null} Font used by the active sketch
     */
    static get font() {
        if (!this.isSketchActive) return null;
        return this._activeSketch.font;
    }

    /**
     * @returns {p5.Font|null} p5.Font used by the active sketch, from Sketch.font
     */
    static get p5font() {
        const font = this.font;
        if (font === null) return null;
        return font.font;
    }

    /**
     * @param {void} event Method that gets called on preload
     */
    static addPreloadEvent(event) {
        this._preloadEvents.push(event);
    }

    /**
     * @param {void} event Method that gets called on setup
     */
    static addSetupEvent(event) {
        this._setupEvents.push(event);
    }

    static get isAfterPreload() {
        if (!this.isSketchActive) return false;
        return this._activeSketch.isAfterPreload;
    }

    static get isAfterSetup() {
        if (!this.isSketchActive) return false;
        return this._activeSketch.isAfterSetup;
    }

    /**
     * @param {Shader} shader Shader that is going to be applied during draw
     */
    static addShader(shader) {
        this._shaders.push(shader);
    }

    /**
     * @returns {void[]} All preload events defined up to this point
     */
    static _dumpPrelaodEvents() {
        return this._preloadEvents.splice(0, this._preloadEvents.length);
    }

    /**
     * @returns {void[]} All setup events defined up to this point
     */
    static _dumpSetupEvents() {
        return this._setupEvents.splice(0, this._setupEvents.length);
    }

    /**
     * @returns {Shader[]} All defined shaders up to this point
     */
    static _dumpShaders() {
        return this._shaders.splice(0, this._shaders.length);
    }

    /**
     * @type {p5}
     */
    _p5 = null;
    /**
     * @type {p5.Element|null}
     */
    _canvas = null;

    /**
     * @returns {p5} The p5 instance used by this sketch.
     * If this sketch was not yet started, returns a noCanvas(), noLoop() p5 instance.
     */
    get p5() {
        return this._p5;
    }

    /**
     * @type {number}
     */
    _width = -1;
    /**
     * @type {number}
     */
    _height = -1;

    /**
     * @returns {number} Width of the canvas
     */
    get width() {
        return this._width;
    }

    /**
     * @returns {number} Height of the canvas
     */
    get height() {
        return this._height;
    }

    /**
     * @type {p5.Graphics|null}
     */
    _graphics = null;
    /**
     * @type {p5.Graphics|null}
     */
    _graphicsUI = null;

    /**
     * @type {DrawSettings}
     */
    _drawSettings = new DrawSettings();

    /**
     * @returns {p5.Graphics|null} Graphics
     */
    get graphics() {
        return this._graphics;
    }

    /**
     * @returns {p5.Graphics|null} UI Graphics
     */
    get graphicsUI() {
        return this._graphicsUI;
    }

    /**
     * @returns {DrawSettings} Draw settings
     */
    get drawSettings() {
        return this._drawSettings;
    }

    /**
     * @type {Font|null}
     */
    _font = null;

    /**
     * Set the default font
     * @param {Font} font
     */
    set font(font) {
        this._font = font;
    }

    /**
     * Get the default font
     * @returns {Font|null}
     */
    get font() {
        return this._font;
    }

    /**
     * @type {boolean}
     */
    _isAfterPreload = false;
    /**
     * @type {boolean}
     */
    _isAfterSetup = false;

    /**
     * @returns {boolean}
     */
    get isAfterPreload() {
        return this._isAfterPreload;
    }

    /**
     * @returns {boolean}
     */
    get isAfterSetup() {
        return this._isAfterSetup;
    }

    /**
     * @type {Shader[]}
     */
    _shaders = [];
    /**
     * @type {Shader[]}
     */
    _globalShaders = [];

    /**
     * @type {Input}
     */
    _input = new Input();

    /**
     * @returns {Input}
     */
    get input() {
        return this._input;
    }

    /**
     * @type {boolean} Whether this sketch can be started
     */
    _canStart = false;

    /**
     * Sketch settings:
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     * @param {number} defaultFontPath Path to the automatically loaded font
     */
    constructor(settings = {}) {
        if (Sketch.isSketchActive) {
            console.error('There can be only one sketch instance. Aborting.');
            return;
        }

        this._width = validateTypeOrDefault(settings.width, 800, 'Sketch width');
        this._height = validateTypeOrDefault(settings.height, 800, 'Sketch height');

        const defaultFontPath = validateTypeOrDefault(
            settings.defaultFontPath,
            'Roboto/Roboto-Regular.ttf',
            'Sketch default font path'
        );
        this._font = new Font(defaultFontPath);

        Sketch._activeSketch = this;

        this._p5 = new p5((p5) => {
            p5.setup = () => {
                p5.noCanvas();
                p5.noLoop();
            };
        });

        this._canStart = true;
    }

    /**
     * Starts this sketch
     */
    start() {
        if (this._canStart !== true) return;

        new p5((p5) => {
            this._p5 = p5;

            p5.preload = () => this._preload();
            p5.setup = () => this._setup();
            p5.draw = () => this._draw();

            this.input.bindEvents(p5);
        });
    }

    /**
     * Gets called by p5 on p5.preload
     */
    _preload() {
        Sketch._dumpPrelaodEvents().forEach((preloadEvent) => preloadEvent?.call());

        this._isAfterPreload = true;
    }

    /**
     * Gets called by p5 on p5.setup
     */
    _setup() {
        this._canvas = this.p5.createCanvas(this.width, this.height, this.p5.WEBGL);
        this.p5.pixelDensity(1);

        this._graphics = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);
        this._graphicsUI = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);

        Time.synchronizeMillis();

        Sketch._dumpShaders().forEach((shader) => {
            const shaderArray = shader.layer.isSameAs(ShaderLayer.GLOBAL)
                ? this._globalShaders
                : this._shaders;
            shaderArray.push(shader);
        });

        this.p5.noStroke();

        this._isAfterSetup = true;

        this.setup?.call(this);

        Sketch._dumpSetupEvents().forEach((setupEvent) => setupEvent?.call());
    }

    /**
     * Gets called by p5 on p5.draw
     */
    _draw() {
        Time.update(this.p5);

        this._p5.frameCount > 1 && this._graphics.pop();
        this._graphics.push();
        this._graphics.translate(-this.width / 2, -this.height / 2);

        this._p5.frameCount > 1 && this._graphicsUI.pop();
        this._graphicsUI.push();
        this._graphicsUI.translate(-this.width / 2, -this.height / 2);

        this.draw?.call(this);

        this.drawSettings.autoClearCanvas && this.p5.clear();

        this._globalShaders.length > 0 && this.p5.plane(Sketch.width, Sketch.height);
        this.p5.translate(-this.width / 2, -this.height / 2);

        this._shaders.forEach((shader) => {
            shader.autoApplied && shader.applyShader();
        });

        this.drawSettings.drawGraphics &&
            this.p5.image(this.graphics, 0, 0, this.width, this.height);

        this.drawSettings.drawGraphicsUI &&
            this.p5.image(this.graphicsUI, 0, 0, this.width, this.height);

        this._globalShaders.forEach((shader) => {
            shader.autoApplied && shader.applyShader();
        });
    }

    /**
     * Gets called after canvas and graphics are created and before setupEvents are executed.
     */
    setup() {}

    /**
     * Gets called each frame.
     */
    draw() {}
}

export { Sketch };
