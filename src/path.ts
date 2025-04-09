import type { Buffer } from 'node:buffer';
import type { Abortable } from 'node:events';
import type fs from 'node:fs';
import type fsp from 'node:fs/promises';
import nodePath from 'node:path';

import * as kFse from '@kikiutils/fs-extra';
import type fse from 'fs-extra';

export type DoNotRemoveOrUseThisType = typeof fsp;
export type PathLike = fs.PathLike | Path;
type KFseParameters = {
    [K in keyof typeof kFse]: (typeof kFse)[K] extends (...args: any[]) => any ? Parameters<(typeof kFse)[K]> : never
};

/**
 * Class representing a file system path with various utility methods for path operations.
 *
 * This class provides a convenient wrapper around Node.js's `path` and `fs` modules,
 * as well as the `fs-extra` library, allowing for easy manipulation and querying of file system paths.
 *
 * All file-related functions are derived from `@kikiutils/fs-extra`. In cases of incorrect execution,
 * these functions will return either a boolean or undefined. For more details, please refer to the
 * [link](https://github.com/kikiutils/node-fs-extra/blob/main/README.md).
 *
 * All methods in the `Path` class are immutable, returning new instances with modified values
 * and leaving the original instance unchanged.
 *
 * Example usage:
 *
 * ```typescript
 * import { Path } from '@kikiutils/classes/path'; // ESM
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
    relative(to: PathLike) {
        return this.#newInstance(nodePath.relative(this.#value, to.toString()));
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
     * This method returns the internal path string value,
     * making it useful for implicit and explicit string conversions.
     */
    toString() {
        return this.#value;
    }

    // node:fs/promise methods

    /**
     * @see {@link fsp.access}
     */
    access(mode?: number) {
        return kFse.access(this.#value, mode);
    }

    /**
     * @see {@link fsp.copyFile}
     */
    copyFile(dest: PathLike, mode?: number) {
        return kFse.copyFile(this.#value, dest.toString(), mode);
    }

    /**
     * @see {@link fsp.open}
     */
    open(flags?: number | string, mode?: fs.Mode) {
        return kFse.open(this.value, flags, mode);
    }

    /**
     * @see {@link fsp.rename}
     */
    rename(newPath: PathLike) {
        return kFse.rename(this.#value, newPath.toString());
    }

    /**
     * @see {@link fsp.truncate}
     */
    truncate(len?: number) {
        return kFse.truncate(this.#value, len);
    }

    /**
     * @see {@link fsp.rmdir}
     */
    rmdir(options?: fs.RmDirOptions) {
        return kFse.rmdir(this.#value, options);
    }

    /**
     * @see {@link fsp.rm}
     */
    rm(options?: fs.RmOptions) {
        return kFse.rm(this.#value, options);
    }

    /**
     * @see {@link fsp.symlink}
     */
    symlink(path: PathLike, type?: null | string) {
        return kFse.symlink(this.#value, path.toString(), type);
    }

    /**
     * @see {@link fsp.link}
     */
    link(newPath: PathLike) {
        return kFse.link(this.#value, newPath.toString());
    }

    /**
     * @see {@link fsp.unlink}
     */
    unlink() {
        return kFse.unlink(this.#value);
    }

    /**
     * @see {@link fsp.chmod}
     */
    chmod(mode: fs.Mode) {
        return kFse.chmod(this.#value, mode);
    }

    /**
     * @see {@link fsp.lchown}
     */
    lchown(uid: number, gid: number) {
        return kFse.lchown(this.#value, uid, gid);
    }

    /**
     * @see {@link fsp.lutimes}
     */
    lutimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return kFse.lutimes(this.#value, atime, mtime);
    }

    /**
     * @see {@link fsp.chown}
     */
    chown(uid: number, gid: number) {
        return kFse.chown(this.#value, uid, gid);
    }

    /**
     * @see {@link fsp.utimes}
     */
    utimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return kFse.utimes(this.#value, atime, mtime);
    }

    /**
     * @see {@link fsp.writeFile}
     */
    writeFile(data: KFseParameters['writeFile'][1], options?: KFseParameters['writeFile'][2]) {
        return kFse.writeFile(this.#value, data, options);
    }

    /**
     * @see {@link fsp.appendFile}
     */
    appendFile(data: KFseParameters['appendFile'][1], options?: KFseParameters['appendFile'][2]) {
        return kFse.appendFile(this.#value, data, options);
    }

    /**
     * @see {@link fsp.opendir}
     */
    opendir(options?: fs.OpenDirOptions) {
        return kFse.opendir(this.#value, options);
    }

    /**
     * @see {@link fsp.cp}
     */
    cp(destination: PathLike, opts?: fs.CopyOptions) {
        return kFse.cp(this.#value, destination.toString(), opts);
    }

    /**
     * @see {@link fsp.mkdir}
     */
    mkdir(options: fs.MakeDirectoryOptions & { recursive: true }): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    mkdir(options?: (fs.MakeDirectoryOptions & { recursive?: false }) | fs.Mode | null): Promise<boolean>;
    mkdir(options?: fs.MakeDirectoryOptions | fs.Mode | null): Promise<string | undefined>;
    mkdir(options?: any) {
        return kFse.mkdir(this.#value, options);
    }

    /**
     * @see {@link fsp.readdir}
     */
    readdir(
        options?: BufferEncoding | (fs.ObjectEncodingOptions & { recursive?: boolean; withFileTypes?: false }) | null
    ): Promise<string[] | undefined>;
    // @ts-expect-error Ignore this error.
    readdir(
        options: 'buffer' | { encoding: 'buffer'; recursive?: boolean; withFileTypes?: false }
    ): Promise<Buffer[] | undefined>;
    readdir(
        options?: BufferEncoding | (fs.ObjectEncodingOptions & { recursive?: boolean; withFileTypes?: false }) | null
    ): Promise<Buffer[] | string[] | undefined>;
    readdir(
        options: fs.ObjectEncodingOptions & { recursive?: boolean; withFileTypes: true }
    ): Promise<fs.Dirent[] | undefined>;
    readdir(options?: any) {
        return kFse.readdir(this.#value, options);
    }

    /**
     * @see {@link fsp.readlink}
     */
    readlink(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    readlink(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
    readlink(options?: fs.ObjectEncodingOptions | null | string): Promise<Buffer | string | undefined>;
    readlink(options?: any) {
        return kFse.readlink(this.#value, options);
    }

    /**
     * @see {@link fsp.lstat}
     */
    lstat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
    // @ts-expect-error Ignore this error.
    lstat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
    lstat(opts?: fs.StatOptions): Promise<fs.BigIntStats | fs.Stats | undefined>;
    lstat(opts?: any) {
        return kFse.lstat(this.#value, opts);
    }

    /**
     * @see {@link fsp.stat}
     */
    stat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
    // @ts-expect-error Ignore this error.
    stat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
    stat(opts?: fs.StatOptions): Promise<fs.BigIntStats | fs.Stats | undefined>;
    stat(opts?: any) {
        return kFse.stat(this.#value, opts);
    }

    /**
     * @see {@link fsp.statfs}
     */
    statfs(opts?: fs.StatFsOptions & { bigint?: false }): Promise<fs.StatsFs | undefined>;
    // @ts-expect-error Ignore this error.
    statfs(opts: fs.StatFsOptions & { bigint: true }): Promise<fs.BigIntStatsFs | undefined>;
    statfs(opts?: fs.StatFsOptions): Promise<fs.BigIntStatsFs | fs.StatsFs | undefined>;
    statfs(opts?: any) {
        return kFse.statfs(this.#value, opts);
    }

    /**
     * @see {@link fsp.realpath}
     */
    realpath(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    realpath(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
    realpath(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<Buffer | string | undefined>;
    realpath(options?: any) {
        return kFse.realpath(this.#value, options);
    }

    /**
     * @see {@link fsp.readFile}
     */
    readFile(options?: (Abortable & { encoding?: null; flag?: fs.OpenMode }) | null): Promise<Buffer | undefined>;
    // @ts-expect-error Ignore this error.
    readFile(
        options: (Abortable & { encoding: BufferEncoding; flag?: fs.OpenMode }) | BufferEncoding
    ): Promise<string | undefined>;
    readFile(
        options?: (Abortable & fs.ObjectEncodingOptions & { flag?: fs.OpenMode }) | BufferEncoding | null
    ): Promise<Buffer | string | undefined>;
    readFile(options?: any) {
        return kFse.readFile(this.#value, options);
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
    truncateSync(len?: number) {
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
    writeFileSync(data: NodeJS.ArrayBufferView | string, options?: fs.WriteFileOptions) {
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
    statfsSync(options?: fs.StatFsOptions): fs.BigIntStatsFs | fs.StatsFs | undefined;
    statfsSync(options?: any) {
        return kFse.statfsSync(this.#value, options);
    }

    /**
     * @see {@link fs.readlinkSync}
     */
    readlinkSync(options?: fs.EncodingOption): string | undefined;
    // @ts-expect-error Ignore this error.
    readlinkSync(options: fs.BufferEncodingOption): Buffer | undefined;
    readlinkSync(options?: fs.EncodingOption): Buffer | string | undefined;
    readlinkSync(options?: any) {
        return kFse.readlinkSync(this.#value, options);
    }

    /**
     * @see {@link fs.realpathSync}
     */
    realpathSync(options?: fs.EncodingOption): string | undefined;
    // @ts-expect-error Ignore this error.
    realpathSync(options: fs.BufferEncodingOption): Buffer | undefined;
    realpathSync(options?: fs.EncodingOption): Buffer | string | undefined;
    realpathSync(options?: any) {
        return kFse.realpathSync(this.#value, options);
    }

    /**
     * @see {@link fs.mkdirSync}
     */
    mkdirSync(options: fs.MakeDirectoryOptions & { recursive: true }): string | undefined;
    // @ts-expect-error Ignore this error.
    mkdirSync(options?: (fs.MakeDirectoryOptions & { recursive?: false }) | fs.Mode | null): boolean;
    mkdirSync(options?: fs.MakeDirectoryOptions | fs.Mode | null): string | undefined;
    mkdirSync(options?: any) {
        return kFse.mkdirSync(this.#value, options);
    }

    /**
     * @see {@link fs.readdirSync}
     */
    readdirSync(
        options?:
          | BufferEncoding
          | null
          | {
              encoding: BufferEncoding | null;
              recursive?: boolean;
              withFileTypes?: false;
          }
    ): string[] | undefined;
    // @ts-expect-error Ignore this error.
    readdirSync(
        options: 'buffer' | { encoding: 'buffer'; recursive?: boolean; withFileTypes?: false }
    ): Buffer[] | undefined;
    readdirSync(
        options?: BufferEncoding | (fs.ObjectEncodingOptions & { recursive?: boolean; withFileTypes?: false }) | null
    ): Buffer[] | string[] | undefined;
    readdirSync(
        options: fs.ObjectEncodingOptions & { recursive?: boolean; withFileTypes: true }): fs.Dirent[] | undefined;
    readdirSync(options?: any) {
        return kFse.readdirSync(this.#value, options);
    }

    /**
     * @see {@link fs.readFileSync}
     */
    readFileSync(options?: null | { encoding?: null; flag?: string }): Buffer | undefined;
    // @ts-expect-error Ignore this error.
    readFileSync(options: BufferEncoding | { encoding: BufferEncoding; flag?: string }): string | undefined;
    readFileSync(
        options?: BufferEncoding | (fs.ObjectEncodingOptions & { flag?: string }) | null
    ): Buffer | string | undefined;
    readFileSync(options?: any) {
        return kFse.readFileSync(this.#value, options);
    }

    /**
     * @see {@link fs.statSync}
     */
    statSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
    // @ts-expect-error Ignore this error.
    statSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
    statSync(options?: fs.StatSyncOptions): fs.BigIntStats | fs.Stats | undefined;
    statSync(options?: any) {
        return kFse.statSync(this.#value, options);
    }

    /**
     * @see {@link fs.statSync}
     */
    lstatSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
    // @ts-expect-error Ignore this error.
    lstatSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
    lstatSync(options?: fs.StatSyncOptions): fs.BigIntStats | fs.Stats | undefined;
    lstatSync(options?: any) {
        return kFse.lstatSync(this.#value, options);
    }

    // fs-extra promise methods

    /**
     * @see {@link fse.pathExists}
     */
    pathExists() {
        return kFse.pathExists(this.#value);
    }

    /**
     * @see {@link fse.copy}
     */
    copy(dest: PathLike, options?: fse.CopyOptions) {
        return kFse.copy(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.move}
     */
    move(dest: PathLike, options?: fse.MoveOptions) {
        return kFse.move(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.ensureFile}
     */
    ensureFile() {
        return kFse.ensureFile(this.#value);
    }

    /**
     * @see {@link fse.ensureFile}
     */
    createFile() {
        return kFse.createFile(this.#value);
    }

    /**
     * @see {@link fse.ensureLink}
     */
    ensureLink(dest: PathLike) {
        return kFse.ensureLink(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureLink}
     */
    createLink(dest: PathLike) {
        return kFse.createLink(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureSymlink}
     */
    ensureSymlink(dest: PathLike, type?: fs.symlink.Type) {
        return kFse.ensureSymlink(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureSymlink}
     */
    createSymlink(dest: PathLike, type?: fs.symlink.Type) {
        return kFse.createSymlink(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    ensureDir(options?: fse.EnsureDirOptions | number) {
        return kFse.ensureDir(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    mkdirp(options?: fse.EnsureDirOptions | number) {
        return kFse.mkdirp(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    mkdirs(options?: fse.EnsureDirOptions | number) {
        return kFse.mkdirs(this.#value, options);
    }

    /**
     * @see {@link fse.outputFile}
     */
    outputFile(data: NodeJS.ArrayBufferView | string, options?: fse.WriteFileOptions) {
        return kFse.outputFile(this.#value, data, options);
    }

    /**
     * @see {@link fse.readJson}
     */
    readJson<T = any>(options?: fse.JsonReadOptions) {
        return kFse.readJson<T>(this.#value, options);
    }

    /**
     * @see {@link fse.writeJson}
     */
    writeJson(obj: any, options?: fse.JsonWriteOptions) {
        return kFse.writeJson(this.#value, obj, options);
    }

    /**
     * @see {@link fse.outputJson}
     */
    outputJson(data: any, options?: fse.JsonOutputOptions) {
        return kFse.outputJson(this.#value, data, options);
    }

    /**
     * @see {@link fse.remove}
     */
    remove() {
        return kFse.remove(this.#value);
    }

    /**
     * @see {@link fse.emptyDir}
     */
    emptyDir() {
        return kFse.emptyDir(this.#value);
    }

    /**
     * @see {@link fse.emptyDir}
     */
    emptydir() {
        return kFse.emptydir(this.#value);
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
    ensureDirSync(options?: fse.EnsureDirOptions | number) {
        return kFse.ensureDirSync(this.#value, options);
    }

    /**
     * @see {@link fse.outputFileSync}
     */
    outputFileSync(data: NodeJS.ArrayBufferView | string, options?: fse.WriteFileOptions) {
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
    mkdirsSync(options?: fse.EnsureDirOptions | number) {
        return kFse.mkdirsSync(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDirSync}
     */
    mkdirpSync(options?: fse.EnsureDirOptions | number) {
        return kFse.mkdirpSync(this.#value, options);
    }

    /**
     * @see {@link fse.readJsonSync}
     */
    readJsonSync<T = any>(options?: fse.JsonReadOptions) {
        return kFse.readJsonSync<T>(this.#value, options);
    }

    /**
     * @see {@link fse.writeJsonSync}
     */
    writeJsonSync(obj: any, options?: fse.JsonWriteOptions) {
        return kFse.writeJsonSync(this.#value, obj, options);
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
    getFileSize(opts?: fs.StatOptions & { bigint?: false }): Promise<number | undefined>;
    // @ts-expect-error Ignore this error.
    getFileSize(opts: fs.StatOptions & { bigint: true }): Promise<bigint | undefined>;
    getFileSize(opts?: fs.StatOptions): Promise<bigint | number | undefined>;
    getFileSize(opts: any) {
        return kFse.getFileSize(this.#value, opts);
    }

    /**
     * @see {@link kFse.pathIsBlockDevice}
     */
    isBlockDevice() {
        return kFse.pathIsBlockDevice(this.#value);
    }

    /**
     * @see {@link kFse.pathIsCharacterDevice}
     */
    isCharacterDevice() {
        return kFse.pathIsCharacterDevice(this.#value);
    }

    /**
     * @see {@link kFse.pathIsDirectory}
     */
    isDir = this.isDirectory;

    /**
     * @see {@link kFse.pathIsDirectory}
     */
    isDirectory() {
        return kFse.pathIsDirectory(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFifo}
     */
    isFifo() {
        return kFse.pathIsFifo(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFile}
     */
    isFile() {
        return kFse.pathIsFile(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSocket}
     */
    isSocket() {
        return kFse.pathIsSocket(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSymbolicLink}
     */
    isSymbolicLink() {
        return kFse.pathIsSymbolicLink(this.#value);
    }

    /**
     * @see {@link kFse.readFileToBlob}
     */
    readFileToBlob(
        options?: (Abortable & { encoding?: null; flag?: fs.OpenMode }) | null
    ): Promise<Blob | undefined>;
    readFileToBlob(
        options: (Abortable & { encoding: BufferEncoding; flag?: fs.OpenMode }) | BufferEncoding
    ): Promise<Blob | undefined>;
    readFileToBlob(
        options?: (Abortable & fs.ObjectEncodingOptions & { flag?: fs.OpenMode }) | BufferEncoding | null
    ): Promise<Blob | undefined>;
    readFileToBlob(options?: any) {
        return kFse.readFileToBlob(this.#value, options);
    }

    // additional sync methods

    getFileSizeSync(options?: fs.StatSyncOptions & { bigint?: false }): number | undefined;
    // @ts-expect-error Ignore this error.
    getFileSizeSync(options: fs.StatSyncOptions & { bigint: true }): bigint | undefined;
    getFileSizeSync(options?: fs.StatSyncOptions): bigint | number | undefined;
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
    isDirSync = this.isDirectorySync;

    /**
     * @see {@link kFse.pathIsDirectorySync}
     */
    isDirectorySync() {
        return kFse.pathIsDirectorySync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFifoSync}
     */
    isFifoSync() {
        return kFse.pathIsFifoSync(this.#value);
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
    readFileToBlobSync(options?: null | { encoding?: null; flag?: string }): Blob | undefined;
    readFileToBlobSync(options: BufferEncoding | { encoding: BufferEncoding; flag?: string }): Blob | undefined;
    readFileToBlobSync(
        options?: BufferEncoding | (fs.ObjectEncodingOptions & { flag?: string }) | null
    ): Blob | undefined;
    readFileToBlobSync(options?: any) {
        return kFse.readFileToBlobSync(this.#value, options);
    }
}
