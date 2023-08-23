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

	public static format(pathObject: _path.FormatInputPathObject) {
		return new Path(_path.format(pathObject));
	}
}

export default Path;
