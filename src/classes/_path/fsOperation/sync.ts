import kFse from '@kikiutils/fs-extra';
import fs from 'fs';
import fse, { EnsureDirOptions } from 'fs-extra';

import PromisePathFsOperation from './promise';

export class SyncPathFsOperation extends PromisePathFsOperation {
	/**
	 * @see {@link fs.appendFileSync}
	 */
	appendFileSync(data: string | Uint8Array, options?: fs.WriteFileOptions) {
		return kFse.appendFileSync(this.raw, data, options);
	}

	/**
	 * @see {@link fse.emptyDirSync}
	 */
	emptyDirSync() {
		return kFse.emptyDirSync(this.raw);
	}

	/**
	 * @see {@link fse.pathExistsSync}
	 */
	existsSync() {
		return fse.pathExistsSync(this.raw);
	}

	/**
	 * @see {@link fse.mkdirsSync}
	 */
	mkdirsSync(options?: EnsureDirOptions | number) {
		return kFse.mkdirsSync(this.raw, options);
	}

	/**
	 * Check path is directory.
	 */
	isDirSync() {
		return kFse.statSync(this.raw)?.isDirectory() || false;
	}

	/**
	 * Check path is directory.
	 */
	isDirectorySync() {
		return this.isDir();
	}

	/**
	 * Check path is file.
	 */
	isFileSync() {
		return kFse.statSync(this.raw)?.isFile() || false;
	}

	/**
	 * @see {@link fse.removeSync}
	 */
	removeSync() {
		return kFse.removeSync(this.raw);
	}

	/**
	 * @see {@link fs.truncateSync}
	 */
	truncateSync(length?: number) {
		return kFse.truncateSync(this.raw, length);
	}
}
