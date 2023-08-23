import fs from 'fs';

import { PathLike } from '../base';
import PathFseOperation from './_fsExtra';
import { KFseParameters } from './types';

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

	async readFileToBlob(options?: KFseParameters['readFile'][1]) {
		const file = await this.readFile(options);
		if (file) return new Blob([file]);
	}

	readFileToBlobSync(options?: Parameters<typeof fs.readFileSync>[1]) {
		const file = this.readFileSync(options);
		if (file) return new Blob([file]);
	}
}

export default PathFsaOperation;
