import kFse from '@kikiutils/fs-extra';
import fsp from 'fs/promises';
import fse, { EnsureDirOptions } from 'fs-extra';

import { BasePath } from '../base';
import { WriteFileData, WriteFileOptions } from './types';

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
}

export default PromisePathFsOperation;
