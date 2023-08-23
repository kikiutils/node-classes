import _path from 'path';

import { PathLike } from './base';
import PathFsaOperation from './fsOperation';

export class Path extends PathFsaOperation {
	/**
	 * Constructor path object.
	 *
	 * The paths passed in will not be resolved as an absolute path.
	 */
	constructor(...paths: PathLike[]) {
		super(...paths);
	}

	/**
	 * @see {@link _path.format}
	 */
	public static format(pathObject: _path.FormatInputPathObject) {
		return new Path(_path.format(pathObject));
	}

	/**
	 * @see {@link _path.resolve}
	 */
	public static resolve(...paths: PathLike[]) {
		return new this(...paths).resolve();
	}
}

export default Path;
