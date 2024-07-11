import p5 from 'p5';
import { Sketch } from '../sketch';

/**
 * Shader layers determine in which context is shader applied
 */
class ShaderLayer {
    /**
     * The "global" shader layer gets applied to the p5 instance after graphics and graphicsUI are rendered
     * @constant {ShaderLayer}
     */
    static get GLOBAL() {
        return GLOBAL;
    }

    /**
     * The "graphics" shader layer gets applied to the graphics p5.Graphics instance
     * @constant {ShaderLayer}
     */
    static get GRAPHICS() {
        return GRAPHICS;
    }

    /**
     * The "graphicsUI" shader layer gets applied to the graphicsUI p5.Graphics instance
     * @constant {ShaderLayer}
     */
    static get GRAPHICS_UI() {
        return GRAPHICS_UI;
    }

    /**
     * @param {ShaderLayer} shaderLayer Shader layer
     * @returns {p5|p5.Graphics} Context of given shader layer
     * @throws {Error} When shader layer key is unknown
     */
    static getShaderLayerContext(shaderLayer) {
        switch (shaderLayer.key) {
            case ShaderLayer.GLOBAL.key:
                return Sketch.p5;
            case ShaderLayer.GRAPHICS.key:
                return Sketch.graphics;
            case ShaderLayer.GRAPHICS_UI.key:
                return Sketch.graphicsUI;
            default:
                throw new Error(`Shader layer key '${shaderLayer.key}' is unknown`);
        }
    }

    /**
     * ID of this shader layer
     * @type {string}
     */
    _key = '';

    /**
     * @constructor
     * @param {string} key
     */
    constructor(key) {
        this._key = key;
    }

    /**
     * @returns {string} The key of this shader layer
     */
    get key() {
        return this._key;
    }

    /**
     * @param {ShaderLayer} other Other shader layer to comapre this one to
     * @returns {boolean} True if this and other shader layer's keys are equal
     */
    isSameAs(other) {
        return this.key === other.key;
    }
}

/**
 * @constant {ShaderLayer}
 */
const GLOBAL = new ShaderLayer('global');
/**
 * @constant {ShaderLayer}
 */
const GRAPHICS = new ShaderLayer('graphics');
/**
 * @constant {ShaderLayer}
 */
const GRAPHICS_UI = new ShaderLayer('graphicsUI');

export { ShaderLayer };
