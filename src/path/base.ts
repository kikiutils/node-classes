import type { PathLike as FsPathLike } from 'fs';
import nodePath from 'node:path';

export type PathLike = BasePath | FsPathLike;

export class BasePath {
	protected raw: string;

	constructor(...paths: PathLike[]) {
		this.raw = nodePath.join(...this.#toStrings(paths));
	}

	#newInstance(...paths: PathLike[]) {
		return new (this.constructor as new (...paths: PathLike[]) => this)(...paths);
	}

	#toStrings(paths: PathLike[]) {
		return paths.map((path) => path.toString());
	}

	/**
	 * @see {@link nodePath.dirname}
	 */
	get parent() {
		return this.dirname();
	}

	/**
	 * @see {@link nodePath.basename}
	 */
	basename(suffix?: string) {
		return nodePath.basename(this.raw, suffix);
	}

	/**
	 * @see {@link nodePath.dirname}
	 */
	dirname() {
		return this.#newInstance(nodePath.dirname(this.raw));
	}

	/**
	 * @see {@link nodePath.extname}
	 */
	extname() {
		return nodePath.extname(this.raw);
	}

	/**
	 * @see {@link nodePath.isAbsolute}
	 */
	isAbsolute() {
		return nodePath.isAbsolute(this.raw);
	}

	/**
	 * @see {@link nodePath.normalize}
	 */
	normalize() {
		return this.#newInstance(nodePath.normalize(this.raw));
	}

	/**
	 * @see {@link nodePath.join}
	 */
	join(...paths: PathLike[]) {
		return this.#newInstance(this.raw, ...this.#toStrings(paths));
	}

	/**
	 * @see {@link nodePath.parse}
	 */
	parse() {
		return nodePath.parse(this.raw);
	}

	/**
	 * @see {@link nodePath.relative}
	 */
	relative(to: string) {
		return this.#newInstance(nodePath.relative(this.raw, to));
	}

	/**
	 * @see {@link nodePath.resolve}
	 */
	resolve() {
		return this.#newInstance(nodePath.resolve(this.raw));
	}

	/**
	 * @see {@link nodePath.toNamespacedPath}
	 */
	toNamespacedPath() {
		return nodePath.toNamespacedPath(this.raw);
	}

	/**
	 * Get now path string.
	 */
	toString() {
		return this.raw;
	}
}

export default BasePath;
