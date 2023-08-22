import _path from 'path';

export type PathLike = BasePath | string;

export class BasePath {
	protected raw: string;

	constructor(...paths: PathLike[]) {
		this.raw = _path.resolve(...this.toRaws(paths));
	}

	protected toRaws(paths: PathLike[]) {
		return paths.map((path) => path.toString());
	}

	/**
	 * @see {@link _path.basename}
	 */
	basename(suffix?: string) {
		return _path.basename(this.raw, suffix);
	}

	/**
	 * @see {@link _path.dirname}
	 */
	dirname() {
		return _path.dirname(this.raw);
	}

	/**
	 * @see {@link _path.extname}
	 */
	extname() {
		return _path.extname(this.raw);
	}

	/**
	 * @see {@link _path.isAbsolute}
	 */
	isAbsolute() {
		return _path.isAbsolute(this.raw);
	}

	/**
	 * @see {@link _path.normalize}
	 */
	normalize() {
		this.raw = _path.normalize(this.raw);
		return this;
	}

	/**
	 * @see {@link _path.normalize}
	 */
	normalizeToString() {
		return _path.normalize(this.raw);
	}

	/**
	 * @see {@link _path.join}
	 */
	join(...paths: PathLike[]) {
		this.raw = _path.join(this.raw, ...this.toRaws(paths));
		return this;
	}

	/**
	 * @see {@link _path.join}
	 */
	joinToString(...paths: PathLike[]) {
		return this.raw = _path.join(this.raw, ...this.toRaws(paths));
	}

	/**
	 * @see {@link _path.parse}
	 */
	parse() {
		return _path.parse(this.raw);
	}

	/**
	 * @see {@link _path.relative}
	 */
	relative(to: string) {
		this.raw = _path.relative(this.raw, to);
		return this;
	}

	/**
	 * @see {@link _path.relative}
	 */
	relativeToString(to: string) {
		return _path.relative(this.raw, to);
	}

	/**
	 * @see {@link _path.toNamespacedPath}
	 */
	toNamespacedPath() {
		return _path.toNamespacedPath(this.raw);
	}

	/**
	 * Get now path string.
	 */
	toString() {
		return this.raw;
	}
}
