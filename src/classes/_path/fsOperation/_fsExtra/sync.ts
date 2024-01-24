import kFse from '@kikiutils/fs-extra';
import fs from 'fs';
import fse from 'fs-extra';

import type { PathLike } from '@/classes/_path/base';
import PromisePathFseOperation from './promise';

export class SyncPathFseOperation extends PromisePathFseOperation {
	mkdirpSync: typeof this.ensureDirSync;
	mkdirsSync: typeof this.ensureDirSync;
	readJSONSync: typeof this.readJsonSync;
	writeJSONSync: typeof this.writeJsonSync;

	constructor(...paths: PathLike[]) {
		super(...paths);
		this.mkdirpSync = this.mkdirsSync = this.ensureDirSync;
		this.readJSONSync = this.readJsonSync;
		this.writeJSONSync = this.writeJsonSync;
	}

	// Get boolean

	/**
	 * @see {@link fse.copySync}
	 */
	copySync(dest: PathLike, options?: fse.CopyOptionsSync) {
		return kFse.copySync(this.raw, dest.toString(), options);
	}

	/**
	 * @see {@link fse.emptyDirSync}
	 */
	emptyDirSync() {
		return kFse.emptyDirSync(this.raw);
	}

	/**
	 * @see {@link fse.ensureDirSync}
	 */
	ensureDirSync(options?: fse.EnsureDirOptions | number) {
		return kFse.ensureDirSync(this.raw, options);
	}

	/**
	 * @see {@link fse.ensureFileSync}
	 */
	ensureFileSync() {
		return kFse.ensureFileSync(this.raw);
	}

	/**
	 * @see {@link fse.ensureLinkSync}
	 */
	ensureLinkSync(dest: PathLike) {
		return kFse.ensureLinkSync(this.raw, dest.toString());
	}

	/**
	 * @see {@link fse.ensureSymlinkSync}
	 */
	ensureSymlinkSync(dest: PathLike, type?: fs.symlink.Type) {
		return kFse.ensureSymlinkSync(this.raw, dest.toString(), type);
	}

	/**
	 * @see {@link fse.moveSync}
	 */
	moveSync(dest: PathLike, options?: fse.MoveOptions) {
		return kFse.moveSync(this.raw, dest.toString(), options);
	}

	/**
	 * @see {@link fse.outputFileSync}
	 */
	outputFileSync(data: NodeJS.ArrayBufferView | string, options?: fs.WriteFileOptions) {
		return kFse.outputFileSync(this.raw, data, options);
	}

	/**
	 * @see {@link fse.outputJsonSync}
	 */
	outputJsonSync(data: any, options?: fse.JsonOutputOptions) {
		return kFse.outputJsonSync(this.raw, data, options);
	}

	/**
	 * @see {@link fse.pathExistsSync}
	 */
	pathExistsSync() {
		return fse.pathExistsSync(this.raw);
	}

	/**
	 * @see {@link fse.removeSync}
	 */
	removeSync() {
		return kFse.removeSync(this.raw);
	}

	/**
	 * @see {@link fse.writeJsonSync}
	 */
	writeJsonSync(obj: any, options?: fse.JsonWriteOptions) {
		return kFse.writeJsonSync(this.raw, obj, options);
	}

	// Get data

	/**
	 * @see {@link fse.readJsonSync}
	 */
	readJsonSync(options?: fse.JsonReadOptions) {
		return kFse.readJsonSync(this.raw, options);
	}
}

export default SyncPathFseOperation;
