import { PathLike as FsPathLike } from 'fs';
import _path from 'path';

import Path from './index';

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
		return new Path(_path.dirname(this.raw));
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
		return new Path(_path.normalize(this.raw));
	}

	/**
	 * @see {@link _path.join}
	 */
	join(...paths: PathLike[]) {
		return new Path(this.raw, ...this.toStrings(paths));
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
		return new Path(_path.relative(this.raw, to));
	}

	/**
	 * @see {@link _path.resolve}
	 */
	resolve() {
		return new Path(_path.resolve(this.raw));
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
