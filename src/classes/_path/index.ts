import _path from 'path';

import PathFsaOperation from './fsOperation';

export class Path extends PathFsaOperation {
	public static format(pathObject: _path.FormatInputPathObject) {
		return new Path(_path.format(pathObject));
	}
}

export default Path;
