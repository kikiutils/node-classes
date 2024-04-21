import kFse from '@kikiutils/fs-extra';
import type fs from 'node:fs';

import type { PathLike } from '../base';
import PathFseOperation from './_fsExtra';
import type { KFseParameters } from './types';

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

	// @ts-ignore
	async getFileSize(options: fs.StatOptions & { bigint: true }): Promise<bigint | undefined>;
	async getFileSize(options: fs.StatOptions & { bigint: false }): Promise<number | undefined>;
	async getFileSize(options?: fs.StatOptions): Promise<number | undefined>;
	async getFileSize(options?: fs.StatOptions) {
		return await kFse.getFileSize(this.raw, options);
	}

	// @ts-ignore
	getFileSizeSync(options: fs.StatOptions & { bigint: true }): bigint | undefined;
	getFileSizeSync(options: fs.StatOptions & { bigint: false }): number | undefined;
	getFileSizeSync(options?: fs.StatOptions): number | undefined;
	getFileSizeSync(options?: fs.StatOptions) {
		return kFse.getFileSizeSync(this.raw, options);
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
