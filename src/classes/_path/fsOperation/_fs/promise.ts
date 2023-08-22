import kFse from '@kikiutils/fs-extra';
import fs from 'fs';
import fsp from 'fs/promises';

import BasePath, { PathLike } from '@/classes/_path/base';
import { KFseParameters } from '../types';

export class PromisePathFsOperation extends BasePath {
	// Get boolean

	/**
	 * @see {@link fsp.access}
	 */
	async access(mode?: number) {
		return await kFse.access(this.raw, mode);
	}

	/**
	 * @see {@link fsp.appendFile}
	 */
	async appendFile(data: string | Uint8Array, options?: KFseParameters['appendFile'][2]) {
		return await kFse.appendFile(this.raw, data, options);
	}

	/**
	 * @see {@link fsp.chmod}
	 */
	async chmod(mode: fs.Mode) {
		return await kFse.chmod(this.raw, mode);
	}

	/**
	 * @see {@link fsp.chown}
	 */
	async chown(uid: number, gid: number) {
		return await kFse.chown(this.raw, uid, gid);
	}

	/**
	 * @see {@link fsp.copyFile}
	 */
	async copyFile(dest: fs.PathLike, mode?: number) {
		return await kFse.copyFile(this.raw, dest, mode);
	}

	/**
	 * This function is supported in Node v16.7.0 and later.
	 *
	 * If you are using a version prior to 16.7.0, please refrain from using this function.
	 * @see {@link fsp.cp}
	 */
	async cp(destination: string | URL, opts?: fs.CopyOptions) {
		return await kFse.cp(this.raw, destination, opts);
	}

	/**
	 * @see {@link fsp.lchown}
	 */
	async lchown(uid: number, gid: number) {
		return await kFse.lchown(this.raw, uid, gid);
	}

	/**
	 * @see {@link fsp.link}
	 */
	async link(newPath: PathLike) {
		return await kFse.link(this.raw, newPath.toString());
	}

	/**
	 * @see {@link fsp.lutimes}
	 */
	async lutimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return await kFse.lutimes(this.raw, atime, mtime);
	}

	/**
	 * @see {@link fsp.rename}
	 */
	async rename(newPath: PathLike) {
		return await kFse.rename(this.raw, newPath.toString());
	}

	/**
	 * @see {@link fsp.rm}
	 */
	async rm(options?: fs.RmOptions) {
		return await kFse.rm(this.raw, options);
	}

	/**
	 * @see {@link fsp.rmdir}
	 */
	async rmdir(options?: fs.RmDirOptions) {
		return await kFse.rmdir(this.raw, options);
	}

	/**
	 * @see {@link fsp.truncate}
	 */
	async truncate(len?: number) {
		return await kFse.truncate(this.raw, len);
	}

	/**
	 * @see {@link fsp.unlink}
	 */
	async unlink() {
		return await kFse.unlink(this.raw);
	}

	/**
	 * @see {@link fsp.utimes}
	 */
	async utimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return await kFse.utimes(this.raw, atime, mtime);
	}

	/**
	 * @see {@link fsp.writeFile}
	 */
	async writeFile<P extends KFseParameters['writeFile']>(data: P[1], options?: P[2]) {
		return await kFse.writeFile(this.raw, data, options);
	}

	// Get data

	/**
	 * @see {@link fsp.open}
	 */
	async open(flags?: number | string, mode?: fs.Mode) {
		return await kFse.open(this.raw, flags, mode);
	}

	/**
	 * @see {@link fsp.opendir}
	 */
	async opendir(options?: fs.OpenDirOptions) {
		return await kFse.opendir(this.raw, options);
	}

	// TODO: overloads

	/**
	 * @see {@link fsp.lstat}
	 */
	async lstat(opts?: fs.StatOptions) {
		return await kFse.lstat(this.raw, opts);
	}

	/**
	 * @see {@link fsp.mkdir}
	 */
	async mkdir(options?: fs.Mode | fs.MakeDirectoryOptions | null) {
		return await kFse.mkdir(this.raw, options);
	}

	/**
	 * @see {@link fsp.readFile}
	 */
	async readFile(options?: KFseParameters['readFile'][1]) {
		return await kFse.readFile(this.raw, options);
	}

	/**
	 * @see {@link fsp.readdir}
	 */
	async readdir(options: KFseParameters['readdir'][1]) {
		return await kFse.readdir(this.raw, options);
	}

	/**
	 * @see {@link fsp.readlink}
	 */
	async readlink(options?: string | fs.ObjectEncodingOptions | null) {
		return await kFse.readlink(this.raw, options);
	}

	/**
	 * @see {@link fsp.realpath}
	 */
	async realpath(options?: BufferEncoding | fs.ObjectEncodingOptions | null) {
		return await kFse.realpath(this.raw, options);
	}

	/**
	 * @see {@link fsp.stat}
	 */
	async stat(opts?: fs.StatOptions) {
		return await kFse.stat(this.raw, opts);
	}

	/**
	 * This function is supported in Node from v18.15.0 up to, but not including v19, as well as v19.6.0 and later.
	 *
	 * If you are using a version outside of the specified range, please refrain from using this function.
	 * @see {@link fsp.statfs}
	 */
	async statfs(opts?: fs.StatFsOptions) {
		return await kFse.statfs(this.raw, opts);
	}
}

export default PromisePathFsOperation;
