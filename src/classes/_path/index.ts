import _path from 'path';

import PathFsOperation from './fsOperation';

export class Path extends PathFsOperation {
	public static format(pathObject: _path.FormatInputPathObject) {
		return new Path(_path.format(pathObject));
	}
}

export default Path;
