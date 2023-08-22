import { PathLike as FsPathLike } from 'fs';
import _path from 'path';

export type PathLike = BasePath | FsPathLike;

export class BasePath {
	protected raw: string;

	/**
	 * Constructor path object.
	 *
	 * The paths passed in will not be resolved as an absolute path.
	 *
	 * @param paths path object or string
	 */
	constructor(...paths: PathLike[]) {
		this.raw = _path.join(...this.toStrings(paths));
	}

	private newInstance(...paths: PathLike[]) {
		return new (this.constructor as new (...paths: PathLike[]) => this)(...paths);
	}

	private toStrings(paths: PathLike[]) {
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
		return this.newInstance(_path.dirname(this.raw));
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
		return this.newInstance(_path.normalize(this.raw));
	}

	/**
	 * @see {@link _path.join}
	 */
	join(...paths: PathLike[]) {
		return this.newInstance(this.raw, ...this.toStrings(paths));
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
		return this.newInstance(_path.relative(this.raw, to));
	}

	/**
	 * @see {@link _path.resolve}
	 */
	resolve() {
		return this.newInstance(_path.resolve(this.raw));
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

export default BasePath;
