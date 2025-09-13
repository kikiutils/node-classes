import type * as fs from 'node:fs';
import {
    basename,
    dirname,
    extname,
    format,
    isAbsolute,
    join,
    normalize,
    parse,
    relative,
    resolve,
    toNamespacedPath,
} from 'node:path';
import type * as nodePath from 'node:path';

export type PathLike = fs.PathLike | Path;

/**
 * Class representing a file system path with various utility methods for path operations.
 *
 * All methods in the `Path` class are immutable, returning new instances with modified values
 * and leaving the original instance unchanged.
 */
export class Path {
    readonly #value: string;

    constructor(...paths: PathLike[]) {
        this.#value = join(...this.#toStrings(paths));
    }

    // Private methods
    #newInstance(...paths: PathLike[]) {
        return new Path(...paths);
    }

    #toStrings(paths: PathLike[]) {
        return paths.map((path) => path.toString());
    }

    // Symbols
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return this.#value;
    }

    [Symbol.toPrimitive](hint: string) {
        if (hint === 'number') throw new TypeError('Cannot convert a Path to a number');
        return this.#value;
    }

    // Public getters

    /**
     * @see {@link nodePath.dirname}
     */
    get parent() {
        return this.dirname();
    }

    /**
     * Returns the internal path string value.
     */
    get value() {
        return this.#value;
    }

    // Static methods

    /**
     * @see {@link nodePath.format}
     */
    static format(pathObject: nodePath.FormatInputPathObject) {
        return new Path(format(pathObject));
    }

    /**
     * @see {@link nodePath.resolve}
     */
    static resolve(...paths: PathLike[]) {
        return new this(...paths).resolve();
    }

    // Base methods

    /**
     * @see {@link nodePath.basename}
     */
    basename(suffix?: string) {
        return basename(this.#value, suffix);
    }

    /**
     * @see {@link nodePath.dirname}
     */
    dirname() {
        return this.#newInstance(dirname(this.#value));
    }

    /**
     * @see {@link nodePath.extname}
     */
    extname() {
        return extname(this.#value);
    }

    /**
     * @see {@link nodePath.isAbsolute}
     */
    isAbsolute() {
        return isAbsolute(this.#value);
    }

    /**
     * @see {@link nodePath.normalize}
     */
    normalize() {
        return this.#newInstance(normalize(this.#value));
    }

    /**
     * @see {@link nodePath.join}
     */
    join(...paths: PathLike[]) {
        return this.#newInstance(this.#value, ...this.#toStrings(paths));
    }

    /**
     * @see {@link nodePath.parse}
     */
    parse() {
        return parse(this.#value);
    }

    /**
     * @see {@link nodePath.relative}
     */
    relative(to: PathLike) {
        return this.#newInstance(relative(this.#value, to.toString()));
    }

    /**
     * @see {@link nodePath.resolve}
     */
    resolve() {
        return this.#newInstance(resolve(this.#value));
    }

    toJSON() {
        return this.#value;
    }

    /**
     * @see {@link nodePath.toNamespacedPath}
     */
    toNamespacedPath() {
        return toNamespacedPath(this.#value);
    }

    /**
     * Converts the Path instance to a string.
     * This method returns the internal path string value,
     * making it useful for implicit and explicit string conversions.
     */
    toString() {
        return this.#value;
    }
}
