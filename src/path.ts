import kFse from '@kikiutils/fs-extra';
import type fse from 'fs-extra';
import type { Buffer } from 'node:buffer';
import type { Abortable } from 'node:events';
import type fs from 'node:fs';
import type fsp from 'node:fs/promises';
import nodePath from 'node:path';

export type DoNotRemoveOrUseThisType = typeof fsp;
export type PathLike = fs.PathLike | Path;
type KFseParameters = { [K in keyof typeof kFse]: (typeof kFse)[K] extends (...args: any[]) => any ? Parameters<(typeof kFse)[K]> : never };

/**
 * Class representing a file system path with various utility methods for path operations.
 *
 * This class provides a convenient wrapper around Node.js's `path` and `fs` modules,
 * as well as the `fs-extra` library, allowing for easy manipulation and querying of file system paths.
 *
 * All file-related functions are derived from `@kikiutils/fs-extra`. In cases of incorrect execution,
 * these functions will return either a boolean or undefined. For more details, please refer to the
 * [link](https://github.com/kiki-kanri/kikiutils-node-fs-extra/blob/main/README.md).
 *
 * All methods in the `Path` class are immutable, returning new instances with modified values
 * and leaving the original instance unchanged.
 *
 * Example usage:
 *
 * ```typescript
 * import Path from '@kikiutils/classes/path'; // ESM
 * const { Path } = require('@kikiutils/classes/path'); // CJS
 *
 * const path1 = new Path('/user/local', 'bin');
 * console.log(path1.value); // Output: "/user/local/bin"
 *
 * // Immutable operation
 * const newPath = path1.join('scripts');
 * console.log(newPath.value); // Output: "/user/local/bin/scripts"
 * console.log(path1.value); // Output: "/user/local/bin"
 *
 * const resolvedPath = Path.resolve('/user', 'local', 'bin');
 * console.log(resolvedPath.value); // Output: resolved absolute path
 *
 * const isAbsolute = path1.isAbsolute();
 * console.log(isAbsolute); // Output: true
 * ```
 */
export class Path {
	readonly #value: string;

	constructor(...paths: PathLike[]) {
		this.#value = nodePath.join(...this.#toStrings(paths));
	}

	// Private methods
	#newInstance(...paths: PathLike[]) {
		return new Path(...paths);
	}

	#toStrings(paths: PathLike[]) {
		return paths.map((path) => path.toString());
	}

	// Symbols
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.#value;
	}

	[Symbol.toPrimitive](hint: string) {
		if (hint === 'number') throw new TypeError('Cannot convert a Path to a number');
		return this.#value;
	}

	// Public getters

	/**
	 * @see {@link nodePath.dirname}
	 */
	get parent() {
		return this.dirname();
	}

	/**
	 * Returns the internal path string value.
	 */
	get value() {
		return this.#value;
	}

	// Static methods

	/**
	 * @see {@link nodePath.format}
	 */
	static format(pathObject: nodePath.FormatInputPathObject) {
		return new Path(nodePath.format(pathObject));
	}

	/**
	 * @see {@link nodePath.resolve}
	 */
	static resolve(...paths: PathLike[]) {
		return new this(...paths).resolve();
	}

	// Base methods

	/**
	 * @see {@link nodePath.basename}
	 */
	basename(suffix?: string) {
		return nodePath.basename(this.#value, suffix);
	}

	/**
	 * @see {@link nodePath.dirname}
	 */
	dirname() {
		return this.#newInstance(nodePath.dirname(this.#value));
	}

	/**
	 * @see {@link nodePath.extname}
	 */
	extname() {
		return nodePath.extname(this.#value);
	}

	/**
	 * @see {@link nodePath.isAbsolute}
	 */
	isAbsolute() {
		return nodePath.isAbsolute(this.#value);
	}

	/**
	 * @see {@link nodePath.normalize}
	 */
	normalize() {
		return this.#newInstance(nodePath.normalize(this.#value));
	}

	/**
	 * @see {@link nodePath.join}
	 */
	join(...paths: PathLike[]) {
		return this.#newInstance(this.#value, ...this.#toStrings(paths));
	}

	/**
	 * @see {@link nodePath.parse}
	 */
	parse() {
		return nodePath.parse(this.#value);
	}

	/**
	 * @see {@link nodePath.relative}
	 */
	relative(to: string) {
		return this.#newInstance(nodePath.relative(this.#value, to));
	}

	/**
	 * @see {@link nodePath.resolve}
	 */
	resolve() {
		return this.#newInstance(nodePath.resolve(this.#value));
	}

	toJSON() {
		return this.#value;
	}

	/**
	 * @see {@link nodePath.toNamespacedPath}
	 */
	toNamespacedPath() {
		return nodePath.toNamespacedPath(this.#value);
	}

	/**
	 * Converts the Path instance to a string.
	 * This method returns the internal path string value, making it useful for implicit and explicit string conversions.
	 */
	toString() {
		return this.#value;
	}

	// node:fs/promise methods

	/**
	 * @see {@link fsp.access}
	 */
	async access(mode?: number) {
		return await kFse.access(this.#value, mode);
	}

	/**
	 * @see {@link fsp.copyFile}
	 */
	async copyFile(dest: PathLike, mode?: number) {
		return await kFse.copyFile(this.#value, dest.toString(), mode);
	}

	/**
	 * @see {@link fsp.open}
	 */
	async open(flags?: string | number, mode?: fs.Mode) {
		return await kFse.open(this.value, flags, mode);
	}

	/**
	 * @see {@link fsp.rename}
	 */
	async rename(newPath: PathLike) {
		return await kFse.rename(this.#value, newPath.toString());
	}

	/**
	 * @see {@link fsp.truncate}
	 */
	async truncate(len?: number) {
		return await kFse.truncate(this.#value, len);
	}

	/**
	 * @see {@link fsp.rmdir}
	 */
	async rmdir(options?: fs.RmDirOptions) {
		return await kFse.rmdir(this.#value, options);
	}

	/**
	 * @see {@link fsp.rm}
	 */
	async rm(options?: fs.RmOptions) {
		return await kFse.rm(this.#value, options);
	}

	/**
	 * @see {@link fsp.symlink}
	 */
	async symlink(path: PathLike, type?: string | null) {
		return await kFse.symlink(this.#value, path.toString(), type);
	}

	/**
	 * @see {@link fsp.link}
	 */
	async link(newPath: PathLike) {
		return await kFse.link(this.#value, newPath.toString());
	}

	/**
	 * @see {@link fsp.unlink}
	 */
	async unlink() {
		return await kFse.unlink(this.#value);
	}

	/**
	 * @see {@link fsp.chmod}
	 */
	async chmod(mode: fs.Mode) {
		return await kFse.chmod(this.#value, mode);
	}

	/**
	 * @see {@link fsp.lchmod}
	 */
	async lchmod(mode: fs.Mode) {
		return await kFse.lchmod(this.#value, mode);
	}

	/**
	 * @see {@link fsp.lchown}
	 */
	async lchown(uid: number, gid: number) {
		return await kFse.lchown(this.#value, uid, gid);
	}

	/**
	 * @see {@link fsp.lutimes}
	 */
	async lutimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return await kFse.lutimes(this.#value, atime, mtime);
	}

	/**
	 * @see {@link fsp.chown}
	 */
	async chown(uid: number, gid: number) {
		return await kFse.chown(this.#value, uid, gid);
	}

	/**
	 * @see {@link fsp.utimes}
	 */
	async utimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return await kFse.utimes(this.#value, atime, mtime);
	}

	/**
	 * @see {@link fsp.writeFile}
	 */
	async writeFile(data: KFseParameters['writeFile'][1], options?: KFseParameters['writeFile'][2]) {
		return await kFse.writeFile(this.#value, data, options);
	}

	/**
	 * @see {@link fsp.appendFile}
	 */
	async appendFile(data: KFseParameters['appendFile'][1], options?: KFseParameters['appendFile'][2]) {
		return await kFse.appendFile(this.#value, data, options);
	}

	/**
	 * @see {@link fsp.opendir}
	 */
	async opendir(options?: fs.OpenDirOptions) {
		return await kFse.opendir(this.#value, options);
	}

	/**
	 * @see {@link fsp.cp}
	 */
	async cp(destination: PathLike, opts?: fs.CopyOptions) {
		return await kFse.cp(this.#value, destination.toString(), opts);
	}

	/**
	 * @see {@link fsp.mkdir}
	 */
	async mkdir(options: fs.MakeDirectoryOptions & { recursive: true }): Promise<string | undefined>;
	// @ts-expect-error Ignore this error.
	async mkdir(options?: fs.Mode | (fs.MakeDirectoryOptions & { recursive?: false }) | null): Promise<boolean>;
	async mkdir(options?: fs.Mode | fs.MakeDirectoryOptions | null): Promise<string | undefined>;
	async mkdir(options?: any) {
		return await kFse.mkdir(this.#value, options);
	}

	/**
	 * @see {@link fsp.readdir}
	 */
	async readdir(options?: (fs.ObjectEncodingOptions & { withFileTypes?: false; recursive?: boolean }) | BufferEncoding | null): Promise<string[] | undefined>;
	// @ts-expect-error Ignore this error.
	async readdir(options: { encoding: 'buffer'; withFileTypes?: false; recursive?: boolean } | 'buffer'): Promise<Buffer[] | undefined>;
	async readdir(options?: (fs.ObjectEncodingOptions & { withFileTypes?: false; recursive?: boolean }) | BufferEncoding | null): Promise<string[] | Buffer[] | undefined>;
	async readdir(options: fs.ObjectEncodingOptions & { withFileTypes: true; recursive?: boolean }): Promise<fs.Dirent[] | undefined>;
	async readdir(options?: any) {
		return await kFse.readdir(this.#value, options);
	}

	/**
	 * @see {@link fsp.readlink}
	 */
	async readlink(options?: fs.ObjectEncodingOptions | BufferEncoding | null): Promise<string | undefined>;
	// @ts-expect-error Ignore this error.
	async readlink(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
	async readlink(options?: fs.ObjectEncodingOptions | string | null): Promise<string | Buffer | undefined>;
	async readlink(options?: any) {
		return await kFse.readlink(this.#value, options);
	}

	/**
	 * @see {@link fsp.lstat}
	 */
	async lstat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
	// @ts-expect-error Ignore this error.
	async lstat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
	async lstat(opts?: fs.StatOptions): Promise<fs.Stats | fs.BigIntStats | undefined>;
	async lstat(opts?: any) {
		return await kFse.lstat(this.#value, opts);
	}

	/**
	 * @see {@link fsp.stat}
	 */
	async stat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
	// @ts-expect-error Ignore this error.
	async stat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
	async stat(opts?: fs.StatOptions): Promise<fs.Stats | fs.BigIntStats | undefined>;
	async stat(opts?: any) {
		return await kFse.stat(this.#value, opts);
	}

	/**
	 * @see {@link fsp.statfs}
	 */
	async statfs(opts?: fs.StatFsOptions & { bigint?: false }): Promise<fs.StatsFs | undefined>;
	// @ts-expect-error Ignore this error.
	async statfs(opts: fs.StatFsOptions & { bigint: true }): Promise<fs.BigIntStatsFs | undefined>;
	async statfs(opts?: fs.StatFsOptions): Promise<fs.StatsFs | fs.BigIntStatsFs | undefined>;
	async statfs(opts?: any) {
		return await kFse.statfs(this.#value, opts);
	}

	/**
	 * @see {@link fsp.realpath}
	 */
	async realpath(options?: fs.ObjectEncodingOptions | BufferEncoding | null): Promise<string | undefined>;
	// @ts-expect-error Ignore this error.
	async realpath(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
	async realpath(options?: fs.ObjectEncodingOptions | BufferEncoding | null): Promise<string | Buffer | undefined>;
	async realpath(options?: any) {
		return await kFse.realpath(this.#value, options);
	}

	/**
	 * @see {@link fsp.readFile}
	 */
	async readFile(options?: ({ encoding?: null; flag?: fs.OpenMode } & Abortable) | null): Promise<Buffer | undefined>;
	// @ts-expect-error Ignore this error.
	async readFile(options: ({ encoding: BufferEncoding; flag?: fs.OpenMode } & Abortable) | BufferEncoding): Promise<string | undefined>;
	async readFile(options?: (fs.ObjectEncodingOptions & Abortable & { flag?: fs.OpenMode }) | BufferEncoding | null): Promise<string | Buffer | undefined>;
	async readFile(options?: any) {
		return await kFse.readFile(this.#value, options);
	}

	// node:fs sync methods

	/**
	 * @see {@link fs.existsSync}
	 */
	existsSync() {
		return kFse.existsSync(this.value);
	}

	/**
	 * @see {@link fs.appendFileSync}
	 */
	appendFileSync(data: string | Uint8Array, options?: fs.WriteFileOptions | undefined) {
		return kFse.appendFileSync(this.#value, data, options);
	}

	/**
	 * @see {@link fs.renameSync}
	 */
	renameSync(newPath: PathLike) {
		return kFse.renameSync(this.#value, newPath.toString());
	}

	/**
	 * @see {@link fs.truncateSync}
	 */
	truncateSync(len?: number | null) {
		return kFse.truncateSync(this.#value, len);
	}

	/**
	 * @see {@link fs.chownSync}
	 */
	chownSync(uid: number, gid: number) {
		return kFse.chownSync(this.#value, uid, gid);
	}

	/**
	 * @see {@link fs.lchownSync}
	 */
	lchownSync(uid: number, gid: number) {
		return kFse.lchownSync(this.#value, uid, gid);
	}

	/**
	 * @see {@link fs.lutimesSync}
	 */
	lutimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return kFse.lutimesSync(this.#value, atime, mtime);
	}

	/**
	 * @see {@link fs.chmodSync}
	 */
	chmodSync(mode: fs.Mode) {
		return kFse.chmodSync(this.#value, mode);
	}

	/**
	 * @see {@link fs.lchmodSync}
	 *
	 * @deprecated
	 */
	lchmodSync(mode: fs.Mode) {
		return kFse.lchmodSync(this.#value, mode);
	}

	/**
	 * @see {@link fs.linkSync}
	 */
	linkSync(newPath: PathLike) {
		return kFse.linkSync(this.#value, newPath.toString());
	}

	/**
	 * @see {@link fs.symlinkSync}
	 */
	symlinkSync(path: PathLike, type?: fs.symlink.Type | null) {
		return kFse.symlinkSync(this.#value, path.toString(), type);
	}

	/**
	 * @see {@link fs.unlinkSync}
	 */
	unlinkSync() {
		return kFse.unlinkSync(this.#value);
	}

	/**
	 * @see {@link fs.rmdirSync}
	 */
	rmdirSync(options?: fs.RmDirOptions) {
		return kFse.rmdirSync(this.#value, options);
	}

	/**
	 * @see {@link fs.rmSync}
	 */
	rmSync(options?: fs.RmOptions) {
		return kFse.rmSync(this.#value, options);
	}

	/**
	 * @see {@link fs.utimesSync}
	 */
	utimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
		return kFse.utimesSync(this.#value, atime, mtime);
	}

	/**
	 * @see {@link fs.accessSync}
	 */
	accessSync(mode?: number) {
		return kFse.accessSync(this.#value, mode);
	}

	/**
	 * @see {@link fs.copyFileSync}
	 */
	copyFileSync(dest: PathLike, mode?: number) {
		return kFse.copyFileSync(this.#value, dest.toString(), mode);
	}

	/**
	 * @see {@link fs.cpSync}
	 */
	cpSync(destination: PathLike, opts?: fs.CopySyncOptions) {
		return kFse.cpSync(this.#value, destination.toString(), opts);
	}

	/**
	 * @see {@link fs.openSync}
	 */
	openSync(flags: fs.OpenMode, mode?: fs.Mode | null) {
		return kFse.openSync(this.#value, flags, mode);
	}

	/**
	 * @see {@link fs.writeFileSync}
	 */
	writeFileSync(data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions) {
		return kFse.writeFileSync(this.#value, data, options);
	}

	/**
	 * @see {@link fs.opendirSync}
	 */
	opendirSync(options?: fs.OpenDirOptions) {
		return kFse.opendirSync(this.#value, options);
	}

	/**
	 * @see {@link fs.statfsSync}
	 */
	statfsSync(options?: fs.StatFsOptions & { bigint?: false }): fs.StatsFs | undefined;
	// @ts-expect-error Ignore this error.
	statfsSync(options: fs.StatFsOptions & { bigint: true }): fs.BigIntStatsFs | undefined;
	statfsSync(options?: fs.StatFsOptions): fs.StatsFs | fs.BigIntStatsFs | undefined;
	statfsSync(options?: any) {
		return kFse.statfsSync(this.#value, options);
	}

	/**
	 * @see {@link fs.readlinkSync}
	 */
	readlinkSync(options?: fs.EncodingOption): string | undefined;
	// @ts-expect-error Ignore this error.
	readlinkSync(options: fs.BufferEncodingOption): Buffer | undefined;
	readlinkSync(options?: fs.EncodingOption): string | Buffer | undefined;
	readlinkSync(options?: any) {
		return kFse.readlinkSync(this.#value, options);
	}

	/**
	 * @see {@link fs.realpathSync}
	 */
	realpathSync(options?: fs.EncodingOption): string | undefined;
	// @ts-expect-error Ignore this error.
	realpathSync(options: fs.BufferEncodingOption): Buffer | undefined;
	realpathSync(options?: fs.EncodingOption): string | Buffer | undefined;
	realpathSync(options?: any) {
		return kFse.realpathSync(this.#value, options);
	}

	/**
	 * @see {@link fs.mkdirSync}
	 */
	mkdirSync(options: fs.MakeDirectoryOptions & { recursive: true }): string | undefined;
	// @ts-expect-error Ignore this error.
	mkdirSync(options?: fs.Mode | (fs.MakeDirectoryOptions & { recursive?: false }) | null): boolean;
	mkdirSync(options?: fs.Mode | fs.MakeDirectoryOptions | null): string | undefined;
	mkdirSync(options?: any) {
		return kFse.mkdirSync(this.#value, options);
	}

	/**
	 * @see {@link fs.readdirSync}
	 */
	readdirSync(options?: { encoding: BufferEncoding | null; withFileTypes?: false; recursive?: boolean } | BufferEncoding | null): string[] | undefined;
	// @ts-expect-error Ignore this error.
	readdirSync(options: { encoding: 'buffer'; withFileTypes?: false; recursive?: boolean } | 'buffer'): Buffer[] | undefined;
	readdirSync(options?: (fs.ObjectEncodingOptions & { withFileTypes?: false; recursive?: boolean }) | BufferEncoding | null): string[] | Buffer[] | undefined;
	readdirSync(options: fs.ObjectEncodingOptions & { withFileTypes: true; recursive?: boolean }): fs.Dirent[] | undefined;
	readdirSync(options?: any) {
		return kFse.readdirSync(this.#value, options);
	}

	/**
	 * @see {@link fs.readFileSync}
	 */
	readFileSync(options?: { encoding?: null; flag?: string } | null): Buffer | undefined;
	// @ts-expect-error Ignore this error.
	readFileSync(options: { encoding: BufferEncoding; flag?: string } | BufferEncoding): string | undefined;
	readFileSync(options?: (fs.ObjectEncodingOptions & { flag?: string }) | BufferEncoding | null): string | Buffer | undefined;
	readFileSync(options?: any) {
		return kFse.readFileSync(this.#value, options);
	}

	/**
	 * @see {@link fs.statSync}
	 */
	statSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
	// @ts-expect-error Ignore this error.
	statSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
	statSync(options?: fs.StatSyncOptions): fs.Stats | fs.BigIntStats | undefined;
	statSync(options?: any) {
		return kFse.statSync(this.#value, options);
	}

	/**
	 * @see {@link fs.statSync}
	 */
	lstatSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
	// @ts-expect-error Ignore this error.
	lstatSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
	lstatSync(options?: fs.StatSyncOptions): fs.Stats | fs.BigIntStats | undefined;
	lstatSync(options?: any) {
		return kFse.lstatSync(this.#value, options);
	}

	// fs-extra promise methods

	/**
	 * @see {@link fse.pathExists}
	 */
	async pathExists() {
		return await kFse.pathExists(this.#value);
	}

	/**
	 * @see {@link fse.copy}
	 */
	async copy(dest: PathLike, options?: fse.CopyOptions) {
		return await kFse.copy(this.#value, dest.toString(), options);
	}

	/**
	 * @see {@link fse.move}
	 */
	async move(dest: PathLike, options?: fse.MoveOptions) {
		return await kFse.move(this.#value, dest.toString(), options);
	}

	/**
	 * @see {@link fse.ensureFile}
	 */
	async ensureFile() {
		return await kFse.ensureFile(this.#value);
	}

	/**
	 * @see {@link fse.ensureFile}
	 */
	async createFile() {
		return await kFse.createFile(this.#value);
	}

	/**
	 * @see {@link fse.ensureLink}
	 */
	async ensureLink(dest: PathLike) {
		return await kFse.ensureLink(this.#value, dest.toString());
	}

	/**
	 * @see {@link fse.ensureLink}
	 */
	async createLink(dest: PathLike) {
		return await kFse.createLink(this.#value, dest.toString());
	}

	/**
	 * @see {@link fse.ensureSymlink}
	 */
	async ensureSymlink(dest: PathLike, type?: fs.symlink.Type) {
		return await kFse.ensureSymlink(this.#value, dest.toString(), type);
	}

	/**
	 * @see {@link fse.ensureSymlink}
	 */
	async createSymlink(dest: PathLike, type?: fs.symlink.Type) {
		return await kFse.createSymlink(this.#value, dest.toString(), type);
	}

	/**
	 * @see {@link fse.ensureDir}
	 */
	async ensureDir(options?: number | fse.EnsureDirOptions) {
		return await kFse.ensureDir(this.#value, options);
	}

	/**
	 * @see {@link fse.ensureDir}
	 */
	async mkdirp(options?: number | fse.EnsureDirOptions) {
		return await kFse.mkdirp(this.#value, options);
	}

	/**
	 * @see {@link fse.ensureDir}
	 */
	async mkdirs(options?: number | fse.EnsureDirOptions) {
		return await kFse.mkdirs(this.#value, options);
	}

	/**
	 * @see {@link fse.outputFile}
	 */
	async outputFile(data: string | NodeJS.ArrayBufferView, options?: fse.WriteFileOptions) {
		return await kFse.outputFile(this.#value, data, options);
	}

	/**
	 * @see {@link fse.readJson}
	 */
	async readJson<T = any>(options?: fse.JsonReadOptions) {
		return await kFse.readJson<T>(this.#value, options);
	}

	/**
	 * @see {@link fse.readJson}
	 */
	async readJSON<T = any>(options?: fse.JsonReadOptions) {
		return await kFse.readJSON<T>(this.#value, options);
	}

	/**
	 * @see {@link fse.writeJson}
	 */
	async writeJson(obj: any, options?: fse.JsonWriteOptions) {
		return await kFse.writeJson(this.#value, obj, options);
	}

	/**
	 * @see {@link fse.writeJson}
	 */
	async writeJSON(obj: any, options?: fse.JsonWriteOptions) {
		return await kFse.writeJSON(this.#value, obj, options);
	}

	/**
	 * @see {@link fse.outputJson}
	 */
	async outputJson(data: any, options?: fse.JsonOutputOptions) {
		return await kFse.outputJson(this.#value, data, options);
	}

	/**
	 * @see {@link fse.outputJson}
	 */
	async outputJSON(data: any, options?: fse.JsonOutputOptions) {
		return await kFse.outputJSON(this.#value, data, options);
	}

	/**
	 * @see {@link fse.remove}
	 */
	async remove() {
		return await kFse.remove(this.#value);
	}

	/**
	 * @see {@link fse.emptyDir}
	 */
	async emptyDir() {
		return await kFse.emptyDir(this.#value);
	}

	/**
	 * @see {@link fse.emptyDir}
	 */
	async emptydir() {
		return await kFse.emptydir(this.#value);
	}

	// fs-extra sync methods

	/**
	 * @see {@link fse.pathExistsSync}
	 */
	pathExistsSync() {
		return kFse.pathExistsSync(this.#value);
	}

	/**
	 * @see {@link fse.copySync}
	 */
	copySync(dest: PathLike, options?: fse.CopyOptionsSync) {
		return kFse.copySync(this.#value, dest.toString(), options);
	}

	/**
	 * @see {@link fse.moveSync}
	 */
	moveSync(dest: PathLike, options?: fse.MoveOptions) {
		return kFse.moveSync(this.#value, dest.toString(), options);
	}

	/**
	 * @see {@link fse.ensureFileSync}
	 */
	ensureFileSync() {
		return kFse.ensureFileSync(this.#value);
	}

	/**
	 * @see {@link fse.ensureLinkSync}
	 */
	ensureLinkSync(dest: PathLike) {
		return kFse.ensureLinkSync(this.#value, dest.toString());
	}

	/**
	 * @see {@link fse.ensureSymlinkSync}
	 */
	ensureSymlinkSync(dest: PathLike, type?: fs.symlink.Type) {
		return kFse.ensureSymlinkSync(this.#value, dest.toString(), type);
	}

	/**
	 * @see {@link fse.ensureDirSync}
	 */
	ensureDirSync(options?: number | fse.EnsureDirOptions) {
		return kFse.ensureDirSync(this.#value, options);
	}

	/**
	 * @see {@link fse.outputFileSync}
	 */
	outputFileSync(data: string | NodeJS.ArrayBufferView, options?: fse.WriteFileOptions) {
		return kFse.outputFileSync(this.#value, data, options);
	}

	/**
	 * @see {@link fse.outputJsonSync}
	 */
	outputJsonSync(data: any, options?: fse.JsonOutputOptions) {
		return kFse.outputJsonSync(this.#value, data, options);
	}

	/**
	 * @see {@link fse.removeSync}
	 */
	removeSync() {
		return kFse.removeSync(this.#value);
	}

	/**
	 * @see {@link fse.emptyDirSync}
	 */
	emptyDirSync() {
		return kFse.emptyDirSync(this.#value);
	}

	/**
	 * @see {@link fse.ensureFileSync}
	 */
	createFileSync() {
		return kFse.createFileSync(this.#value);
	}

	/**
	 * @see {@link fse.ensureLinkSync}
	 */
	createLinkSync(dest: PathLike) {
		return kFse.createLinkSync(this.#value, dest.toString());
	}

	/**
	 * @see {@link fse.ensureSymlinkSync}
	 */
	createSymlinkSync(dest: PathLike, type?: fs.symlink.Type) {
		return kFse.createSymlinkSync(this.#value, dest.toString(), type);
	}

	/**
	 * @see {@link fse.ensureDirSync}
	 */
	mkdirsSync(options?: number | fse.EnsureDirOptions) {
		return kFse.mkdirsSync(this.#value, options);
	}

	/**
	 * @see {@link fse.ensureDirSync}
	 */
	mkdirpSync(options?: number | fse.EnsureDirOptions) {
		return kFse.mkdirpSync(this.#value, options);
	}

	/**
	 * @see {@link fse.readJsonSync}
	 */
	readJsonSync<T = any>(options?: fse.JsonReadOptions) {
		return kFse.readJsonSync<T>(this.#value, options);
	}

	/**
	 * @see {@link fse.readJsonSync}
	 */
	readJSONSync<T = any>(options?: fse.JsonReadOptions) {
		return kFse.readJSONSync<T>(this.#value, options);
	}

	/**
	 * @see {@link fse.writeJsonSync}
	 */
	writeJsonSync(obj: any, options?: fse.JsonWriteOptions) {
		return kFse.writeJsonSync(this.#value, obj, options);
	}

	/**
	 * @see {@link fse.writeJsonSync}
	 */
	writeJSONSync(obj: any, options?: fse.JsonWriteOptions) {
		return kFse.writeJSONSync(this.#value, obj, options);
	}

	/**
	 * @see {@link fse.outputJsonSync}
	 */
	outputJSONSync(data: any, options?: fse.JsonOutputOptions) {
		return kFse.outputJSONSync(this.#value, data, options);
	}

	/**
	 * @see {@link fse.emptyDirSync}
	 */
	emptydirSync() {
		return kFse.emptydirSync(this.#value);
	}

	// additional promise methods

	/**
	 * @see {@link kFse.getFileSize}
	 */
	async getFileSize(opts?: fs.StatOptions & { bigint?: false }): Promise<number | undefined>;
	// @ts-expect-error Ignore this error.
	async getFileSize(opts: fs.StatOptions & { bigint: true }): Promise<bigint | undefined>;
	async getFileSize(opts?: fs.StatOptions): Promise<number | bigint | undefined>;
	async getFileSize(opts: any) {
		return await kFse.getFileSize(this.#value, opts);
	}

	/**
	 * @see {@link kFse.pathIsBlockDevice}
	 */
	async isBlockDevice() {
		return await kFse.pathIsBlockDevice(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsCharacterDevice}
	 */
	async isCharacterDevice() {
		return await kFse.pathIsCharacterDevice(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsDirectory}
	 */
	async isDirectory() {
		return await kFse.pathIsDirectory(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsDirectory}
	 */
	async isDir() {
		return await kFse.pathIsDir(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsFIFO}
	 */
	async isFIFO() {
		return await kFse.pathIsFIFO(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsFile}
	 */
	async isFile() {
		return await kFse.pathIsFile(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsSocket}
	 */
	async isSocket() {
		return await kFse.pathIsSocket(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsSymbolicLink}
	 */
	async isSymbolicLink() {
		return await kFse.pathIsSymbolicLink(this.#value);
	}

	/**
	 * @see {@link kFse.readFileToBlob}
	 */
	async readFileToBlob(options?: ({ encoding?: null; flag?: fs.OpenMode } & Abortable) | null): Promise<Blob | undefined>;
	async readFileToBlob(options: ({ encoding: BufferEncoding; flag?: fs.OpenMode } & Abortable) | BufferEncoding): Promise<Blob | undefined>;
	async readFileToBlob(options?: (fs.ObjectEncodingOptions & Abortable & { flag?: fs.OpenMode }) | BufferEncoding | null): Promise<Blob | undefined>;
	async readFileToBlob(options?: any) {
		return await kFse.readFileToBlob(this.#value, options);
	}

	// additional sync methods

	getFileSizeSync(options?: fs.StatSyncOptions & { bigint?: false }): number | undefined;
	// @ts-expect-error Ignore this error.
	getFileSizeSync(options: fs.StatSyncOptions & { bigint: true }): bigint | undefined;
	getFileSizeSync(options?: fs.StatSyncOptions): number | bigint | undefined;
	getFileSizeSync(options?: any) {
		return kFse.getFileSizeSync(this.#value, options);
	}

	/**
	 * @see {@link kFse.pathIsBlockDeviceSync}
	 */
	isBlockDeviceSync() {
		return kFse.pathIsBlockDeviceSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsCharacterDeviceSync}
	 */
	isCharacterDeviceSync() {
		return kFse.pathIsCharacterDeviceSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsDirectorySync}
	 */
	isDirectorySync() {
		return kFse.pathIsDirectorySync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsDirectorySync}
	 */
	isDirSync() {
		return kFse.pathIsDirSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsFIFOSync}
	 */
	isFIFOSync() {
		return kFse.pathIsFIFOSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsFileSync}
	 */
	isFileSync() {
		return kFse.pathIsFileSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsSocketSync}
	 */
	isSocketSync() {
		return kFse.pathIsSocketSync(this.#value);
	}

	/**
	 * @see {@link kFse.pathIsSymbolicLinkSync}
	 */
	isSymbolicLinkSync() {
		return kFse.pathIsSymbolicLinkSync(this.#value);
	}

	/**
	 * @see {@link kFse.readFileToBlobSync}
	 */
	readFileToBlobSync(options?: { encoding?: null; flag?: string } | null): Blob | undefined;
	readFileToBlobSync(options: { encoding: BufferEncoding; flag?: string } | BufferEncoding): Blob | undefined;
	readFileToBlobSync(options?: (fs.ObjectEncodingOptions & { flag?: string }) | BufferEncoding | null): Blob | undefined;
	readFileToBlobSync(options?: any) {
		return kFse.readFileToBlobSync(this.#value, options);
	}
}

export default Path;
