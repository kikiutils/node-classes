import kFse from '@kikiutils/fs-extra';
import fs from 'node:fs';

import type { PathLike } from '../../base';
import PromisePathFsOperation from './promise';

export class SyncPathFsOperation extends PromisePathFsOperation {
	// Get boolean

	/**
	 * @see {@link fs.accessSync}
	 */
	accessSync(mode?: number) {
		return kFse.accessSync(this.raw, mode);
	}

	/**
	 * @see {@link fs.appendFileSync}
	 */
	appendFileSync(data: string | Uint8Array, options?: fs.WriteFileOptions) {
		return kFse.appendFileSync(this.raw, data, options);
	}

	/**
	 * @see {@link fs.chmodSync}
	 */
	chmodSync(mode: fs.Mode) {
		return kFse.chmodSync(this.raw, mode);
	}

	/**
	 * @see {@link fs.chownSync}
	 */
	chownSync(uid: number, gid: number) {
		return kFse.chownSync(this.raw, uid, gid);
	}

	/**
	 * @see {@link fs.copyFileSync}
	 */
	copyFileSync(dest: PathLike, mode?: number) {
		return kFse.copyFileSync(this.raw, dest.toString(), mode);
	}

	/**
	 * This function is supported in Node v16.7.0 and later.
	 *
	 * If you are using a version prior to 16.7.0, please refrain from using this function.
	 * @see {@link fs.cpSync}
	 */
	cpSync(destination: PathLike, opts?: fs.CopySyncOptions) {
		return kFse.cpSync(this.raw, destination.toString(), opts);
	}

	/**
	 * @see {@link fs.existsSync}
	 */
	existsSync() {
		return fs.existsSync(this.raw);
	}

	/**
	 * @see {@link fs.lchownSync}
	 */
	lchownSync(uid: number, gid: number) {
		return kFse.lchownSync(this.raw, uid, gid);
	}

	/**
	 * @see {@link fs.linkSync}
	 */
	linkSync(newPath: PathLike) {
		return kFse.linkSync(this.raw, newPath.toString());
	}

	/**
	 * @see {@link fs.lutimesSync}
	 */
	lutimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return kFse.lutimesSync(this.raw, atime, mtime);
	}

	/**
	 * @see {@link fs.renameSync}
	 */
	renameSync(newPath: PathLike) {
		return kFse.renameSync(this.raw, newPath.toString());
	}

	/**
	 * @see {@link fs.rmSync}
	 */
	rmSync(options?: fs.RmOptions) {
		return kFse.rmSync(this.raw, options);
	}

	/**
	 * @see {@link fs.rmdirSync}
	 */
	rmdirSync(options?: fs.RmDirOptions) {
		return kFse.rmdirSync(this.raw, options);
	}

	/**
	 * @see {@link fs.symlinkSync}
	 */
	symlinkSync(path: PathLike, type?: fs.symlink.Type | null) {
		return kFse.symlinkSync(this.raw, path.toString(), type);
	}

	/**
	 * @see {@link fs.truncateSync}
	 */
	truncateSync(len?: number | null) {
		return kFse.truncateSync(this.raw, len);
	}

	/**
	 * @see {@link fs.unlinkSync}
	 */
	unlinkSync() {
		return kFse.unlinkSync(this.raw);
	}

	/**
	 * @see {@link fs.utimesSync}
	 */
	utimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return kFse.utimesSync(this.raw, atime, mtime);
	}

	/**
	 * @see {@link fs.writeFileSync}
	 */
	writeFileSync(data: NodeJS.ArrayBufferView | string, options?: fs.WriteFileOptions) {
		return kFse.writeFileSync(this.raw, data, options);
	}

	// Get data

	/**
	 * @see {@link fs.openSync}
	 */
	openSync(flags: fs.OpenMode, mode?: fs.Mode | null) {
		return kFse.openSync(this.raw, flags, mode);
	}

	/**
	 * @see {@link fs.opendirSync}
	 */
	opendirSync(options?: fs.OpenDirOptions) {
		return kFse.opendirSync(this.raw, options);
	}

	// TODO: overloads

	/**
	 * @see {@link fs.lstatSync}
	 */
	lstatSync(options?: fs.StatSyncOptions) {
		return kFse.lstatSync(this.raw, options);
	}

	/**
	 * @see {@link fs.mkdirSync}
	 */
	mkdirSync(options?: fs.MakeDirectoryOptions | fs.Mode | null) {
		return kFse.mkdirSync(this.raw, options);
	}

	/**
	 * @see {@link fs.readFileSync}
	 */
	readFileSync(options?: Parameters<typeof fs.readFileSync>[1]) {
		return kFse.readFileSync(this.raw, options);
	}

	/**
	 * @see {@link fs.readdirSync}
	 */
	readdirSync(options: Parameters<typeof fs.readdirSync>[1]) {
		return kFse.readdirSync(this.raw, options);
	}

	/**
	 * @see {@link fs.readlinkSync}
	 */
	readlinkSync(options?: fs.EncodingOption) {
		return kFse.readlinkSync(this.raw, options);
	}

	/**
	 * @see {@link fs.realpathSync}
	 */
	realpathSync(options?: fs.EncodingOption) {
		return kFse.realpathSync(this.raw, options);
	}

	/**
	 * @see {@link fs.statSync}
	 */
	statSync(options?: fs.StatSyncOptions) {
		return kFse.statSync(this.raw, options);
	}

	/**
	 * This function is supported in Node from v18.15.0 up to, but not including v19, as well as v19.6.0 and later.
	 *
	 * If you are using a version outside of the specified range, please refrain from using this function.
	 * @see {@link fs.statfsSync}
	 */
	statfsSync(options?: fs.StatFsOptions) {
		return kFse.statfsSync(this.raw, options);
	}
}

export default SyncPathFsOperation;
