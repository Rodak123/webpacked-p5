import p5 from 'p5';
import { Sketch } from '../sketch';
import { validateFilePath, validateType } from '../validation';
import { ShaderLayer } from './shaderLayer';

/**
 * Checks if source exists and is not empty
 * @param {null|string} source Source code of a shader component
 * @returns {boolean} True if source code is valid for compiling
 */
function isSourceMissing(source) {
    return source === null || source.length === 0;
}

/**
 * A easy to use shader class that loads the needed files and creates the desired shader type. Gets applied automatically.
 */
class Shader {
    /**
     * Returns paths of the shader components
     * @param {string} shaderName Name of the shader
     * @returns {string[]} [Fragment shader path, Vertex shader path]
     */
    static getShaderPaths(shaderName) {
        const shaderFolder = this.getShaderFolder(shaderName);
        return [`${shaderFolder}/${shaderName}.frag`, `${shaderFolder}/${shaderName}.vert`];
    }

    /**
     * Returns the shader folder inside the resources folder
     * @param {string} shaderName Name of the shader
     * @returns {string} Folder of the shader
     */
    static getShaderFolder(shaderName) {
        return Sketch.resourcesPath + '/shaders/' + shaderName;
    }

    /**
     * @type {p5.Shader|null}
     */
    _shader = null;

    /**
     * Path to the fragment shader or null when not used
     * @type {string|null}
     */
    _fragPath = null;
    /**
     * Path to the vertex shader or null when not used
     * @type {string|null}
     */
    _vertPath = null;

    /**
     * Source code of the fragment shader or null when not used
     * @type {string|null}
     */
    _fragSource = null;
    /**
     * Source code of the vertex shader or null when not used
     * @type {string|null}
     */
    _vertSource = null;

    /**
     * Whether this shader is a filter shader
     * @type {boolean}
     */
    _isFilter = false;
    /**
     * On which layer gets this shader applied
     * @type {ShaderLayer}
     */
    _layer = ShaderLayer.GLOBAL;

    /**
     * Whether this shader gets applied by the Sketch instance automatically
     * @type {boolean}
     */
    autoApplied = true;

    /**
     * @constructor
     * @param {ShaderLayer} shaderLayer On which layer gets this shader applied
     * @param {boolean} isFilter Whether this shader is a filter shader (Uses the canvas as a uniform sampler2D)
     * @param {string} frag Path or source of the fragment shader, based on the usingSource argument
     * @param {string} vert Path or source of the vertex shader, based on the usingSource argument
     * @param {boolean} usingSource Wheter the second and third arguments are paths to the shader or source code of the shader
     */
    constructor(shaderLayer, isFilter, frag, vert = '', usingSource = false) {
        this._shader = null;

        this._isFilter = validateType(isFilter, true, 'isFilter');
        this._layer = validateType(shaderLayer, ShaderLayer.GRAPHICS, 'shaderLayer');

        validateType(usingSource, false, 'usingSource', this);

        if (usingSource) {
            this._fragSource = frag;
            if (isFilter === false) this._vertSource = vert;
        } else {
            this._fragPath = validateFilePath(frag, ['frag'], 'Shader fragment path');
            if (isFilter === false)
                this._vertPath = validateFilePath(vert, ['vert'], 'Shader vertex path');

            if (Sketch.isAfterPreload) {
                console.error(
                    `Shader that is not using source must be created before ${Sketch.preloadEventName}. Aborting.`
                );
                return;
            } else {
                Sketch.addPreloadEvent(() => {
                    this._loadShader();
                });
            }
        }
        if (Sketch.isAfterSetup) {
            console.error(
                `Every shader must be created before ${Sketch.setupEventName}. Aborting.`
            );
            return;
        } else {
            Sketch.addSetupEvent(() => {
                this._createShader();
            });
        }

        Sketch.addShader(this);
    }

    /**
     * Loads shader source file content
     */
    _loadShader() {
        Sketch.p5.loadStrings(this._fragPath, (fragShaderLines) => {
            this._fragSource = fragShaderLines.join('\n');
        });

        if (this._isFilter) return;

        Sketch.p5.loadStrings(this._vertPath, (vertShaderLines) => {
            this._vertSource = vertShaderLines.join('\n');
        });
    }

    /**
     * Creates p5.Shader instance
     */
    _createShader() {
        const shaderContext = ShaderLayer.getShaderLayerContext(this.layer);

        if (this._isFilter) {
            if (isSourceMissing(this._fragSource))
                throw new Error('Filter shader is missing fragment source.');

            this._shader = shaderContext.createFilterShader(this._fragSource);
        } else {
            if (isSourceMissing(this._fragSource))
                throw new Error('Shader is missing fragment source.');
            if (isSourceMissing(this._vertSource))
                throw new Error('Shader is missing vertex source.');

            this._shader = shaderContext.createShader(this._vertSource, this._fragSource);
        }
    }

    /**
     * Applies the shader to this layer's context
     */
    applyShader() {
        if (this._shader === null) return;
        const context = ShaderLayer.getShaderLayerContext(this.layer);
        try {
            if (this._isFilter) context?.filter(this._shader);
            else context?.shader(this._shader);
        } catch (err) {
            console.error('Shader failed to apply. Maybe a syntax error?');
        }
    }

    /**
     * @returns {ShaderLayer} On which layer gets this shader applied
     */
    get layer() {
        return this._layer;
    }

    /**
     * @returns {p5.Shader|null} Loaded p5.Shader
     */
    get shader() {
        return this._shader;
    }
}

export { Shader, ShaderLayer };
