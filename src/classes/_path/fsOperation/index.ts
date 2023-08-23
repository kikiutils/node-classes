import { PathLike } from '../base';
import PathFseOperation from './_fsExtra';

/**
 * All fs operations of custom operation, native fs, fs/promises and fs-extra methods.
 */
export class PathFsaOperation extends PathFseOperation {
	isDir: typeof this.isDirectory;
	isDirSync: typeof this.isDirectorySync;

	constructor(...paths: PathLike[]) {
		super(...paths);
		this.isDir = this.isDirectory;
		this.isDirSync = this.isDirectorySync;
	}

	async isDirectory() {
		return (await this.stat())?.isDirectory() || false;
	}

	isDirectorySync() {
		return this.statSync()?.isDirectory() || false;
	}

	async isFile() {
		return (await this.stat())?.isFile() || false;
	}

	isFileSync() {
		return this.statSync()?.isFile() || false;
	}
}

export default PathFsaOperation;
