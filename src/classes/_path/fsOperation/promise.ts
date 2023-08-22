import kFse from '@kikiutils/fs-extra';
import fsp from 'fs/promises';
import fse, { EnsureDirOptions } from 'fs-extra';

import { BasePath, PathLike } from '../base';
import { ReadFileOptions, WriteFileData, WriteFileOptions } from './types';

export class PromisePathFsOperation extends BasePath {
	/**
	 * @see {@link fsp.appendFile}
	 */
	async appendFile(data: string | Uint8Array, options?: BufferEncoding | (fse.ObjectEncodingOptions & fsp.FlagAndOpenMode) | null) {
		return await kFse.appendFile(this.raw, data, options);
	}

	/**
	 * @see {@link fse.emptyDir}
	 */
	async emptyDir() {
		return await kFse.emptyDir(this.raw);
	}

	/**
	 * @see {@link fse.pathExists}
	 */
	async exists() {
		return await fse.pathExists(this.raw);
	}

	/**
	 * @see {@link fse.mkdirs}
	 */
	async mkdirs(options?: EnsureDirOptions | number) {
		return await kFse.mkdirs(this.raw, options);
	}

	/**
	 * Check path is directory.
	 */
	async isDir() {
		return (await kFse.stat(this.raw))?.isDirectory() || false;
	}

	/**
	 * Check path is directory.
	 */
	async isDirectory() {
		return await this.isDir();
	}

	/**
	 * Check path is file.
	 */
	async isFile() {
		return (await kFse.stat(this.raw))?.isFile() || false;
	}

	/**
	 * @see {@link fse.move}
	 */
	async move(dest: PathLike, options?: fse.MoveOptions) {
		return await kFse.move(this.raw, dest.toString(), options);
	}

	/**
	 * @see {@link fsp.readFile}
	 */
	async readFile(options?: ReadFileOptions) {
		return await kFse.readFile(this.raw, options);
	}

	/**
	 * Read file and get blob object.
	 * @see {@link fsp.readFile}
	 */
	async readFileToBlob(options?: ReadFileOptions) {
		const file = await this.readFile(options);
		if (file) return new Blob([file]);
	}

	/**
	 * @see {@link fse.readJson}
	 */
	async readJson(options?: fse.JsonReadOptions) {
		return await kFse.readJson(this.raw, options);
	}

	/**
	 * @see {@link fse.remove}
	 */
	async remove() {
		return await kFse.remove(this.raw);
	}

	/**
	 * @see {@link fsp.truncate}
	 */
	async truncate(length?: number) {
		return await kFse.truncate(this.raw, length);
	}

	/**
	 * @see {@link fsp.writeFile}
	 */
	async writeFile(data: WriteFileData, options?: WriteFileOptions) {
		return await kFse.writeFile(this.raw, data, options);
	}

	/**
	 * @see {@link fse.writeJson}
	 */
	async writeJson(data: any, options?: fse.JsonWriteOptions) {
		return await kFse.writeJson(this.raw, data, options);
	}
}

export default PromisePathFsOperation;
