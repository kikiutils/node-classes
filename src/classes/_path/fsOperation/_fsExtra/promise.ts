import kFse from '@kikiutils/fs-extra';
import fs from 'fs';
import fse from 'fs-extra';

import type { PathLike } from '@/classes/_path/base';
import PathFsOperation from '../_fs';

export class PromisePathFseOperation extends PathFsOperation {
	mkdirp: typeof this.ensureDir;
	mkdirs: typeof this.ensureDir;
	readJSON: typeof this.readJson;
	writeJSON: typeof this.writeJson;

	constructor(...paths: PathLike[]) {
		super(...paths);
		this.mkdirp = this.mkdirs = this.ensureDir;
		this.readJSON = this.readJson;
		this.writeJSON = this.writeJson;
	}

	// Get boolean

	/**
	 * @see {@link fse.copy}
	 */
	async copy(dest: PathLike, options?: fse.CopyOptions) {
		return await kFse.copy(this.raw, dest.toString(), options);
	}

	/**
	 * @see {@link fse.emptyDir}
	 */
	async emptyDir() {
		return await kFse.emptyDir(this.raw);
	}

	/**
	 * @see {@link fse.ensureDir}
	 */
	async ensureDir(options?: fse.EnsureDirOptions | number) {
		return await kFse.ensureDir(this.raw, options);
	}

	/**
	 * @see {@link fse.ensureFile}
	 */
	async ensureFile() {
		return await kFse.ensureFile(this.raw);
	}

	/**
	 * @see {@link fse.ensureLink}
	 */
	async ensureLink(dest: PathLike) {
		return await kFse.ensureLink(this.raw, dest.toString());
	}

	/**
	 * @see {@link fse.ensureSymlink}
	 */
	async ensureSymlink(dest: PathLike, type?: fs.symlink.Type) {
		return await kFse.ensureSymlink(this.raw, dest.toString(), type);
	}

	/**
	 * @see {@link fse.move}
	 */
	async move(dest: PathLike, options?: fse.MoveOptions) {
		return await kFse.move(this.raw, dest.toString(), options);
	}

	/**
	 * @see {@link fse.outputFile}
	 */
	async outputFile(data: NodeJS.ArrayBufferView | string, options?: fs.WriteFileOptions) {
		return await kFse.outputFile(this.raw, data, options);
	}

	/**
	 * @see {@link fse.outputJson}
	 */
	async outputJson(data: any, options?: fse.JsonOutputOptions) {
		return await kFse.outputJson(this.raw, data, options);
	}

	/**
	 * @see {@link fse.pathExists}
	 */
	async pathExists() {
		return await fse.pathExists(this.raw);
	}

	/**
	 * @see {@link fse.remove}
	 */
	async remove() {
		return await kFse.remove(this.raw);
	}

	/**
	 * @see {@link fse.writeJson}
	 */
	async writeJson(obj: any, options?: fse.JsonWriteOptions) {
		return await kFse.writeJson(this.raw, obj, options);
	}

	// Get data

	/**
	 * @see {@link fse.readJson}
	 */
	async readJson(options?: fse.JsonReadOptions) {
		return await kFse.readJson(this.raw, options);
	}
}

export default PromisePathFseOperation;
