import p5 from 'p5';
import { Sketch } from './sketch';

/**
 * A global time class that allows speeding up and slowing down time
 */
class Time {
    /**
     * @type {number}
     */
    static _deltaTime = 0;
    /**
     * @type {number}
     */
    static _timeScale = 1;

    /**
     * @type {number}
     */
    static _millis = 0;

    /**
     * Time between the previous frame and the one before, modified by timeScale
     */
    static get deltaTime() {
        return this._deltaTime * this._timeScale;
    }

    /**
     * Actual time between the previous frame and the one before
     */
    static get realDeltaTime() {
        return this._deltaTime;
    }

    /**
     * Milliseconds since the start of the sketch, modified by timeScale
     */
    static get millis() {
        return this._millis;
    }

    /**
     * Actual milliseconds since the start of the sketch
     */
    static get realMillis() {
        return Sketch.p5.millis();
    }

    /**
     * Modifies deltaTime, used for speeding up or slowing down time
     * @param {number} value
     */
    static set timeScale(value) {
        this._timeScale = value;
    }

    /**
     * @returns {number} Returns current time scale
     */
    static get timeScale() {
        return this._timeScale;
    }

    /**
     * @param {p5} p5 A p5 instance from which deltaTime is read
     */
    static update(p5) {
        this._deltaTime = p5.deltaTime;

        this._millis += this.deltaTime;
    }

    /**
     * Synchronizes millis with realMillis
     */
    static synchronizeMillis() {
        this._millis = this.realMillis;
    }
}

export { Time };
