import nodePath from 'node:path';

import type { PathLike } from './base';
import PathFsaOperation from './fsOperation';

export type { PathLike } from './base';

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
	 * @see {@link nodePath.format}
	 */
	public static format(pathObject: nodePath.FormatInputPathObject) {
		return new Path(nodePath.format(pathObject));
	}

	/**
	 * @see {@link nodePath.resolve}
	 */
	public static resolve(...paths: PathLike[]) {
		return new this(...paths).resolve();
	}
}

export default Path;
