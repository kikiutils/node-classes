import type { Buffer } from 'node:buffer';
import type { Abortable } from 'node:events';
import type fs from 'node:fs';
import type fsp from 'node:fs/promises';
import {
    basename,
    dirname,
    extname,
    format,
    isAbsolute,
    join,
    normalize,
    parse,
    relative,
    resolve,
    toNamespacedPath,
} from 'node:path';
import type nodePath from 'node:path';

import {
    access,
    accessSync,
    appendFile,
    appendFileSync,
    chmod,
    chmodSync,
    chown,
    chownSync,
    copy,
    copyFile,
    copyFileSync,
    copySync,
    cp,
    cpSync,
    createFile,
    createFileSync,
    createLink,
    createLinkSync,
    createSymlink,
    createSymlinkSync,
    emptyDir,
    emptydir,
    emptyDirSync,
    emptydirSync,
    ensureDir,
    ensureDirSync,
    ensureFile,
    ensureFileSync,
    ensureLink,
    ensureLinkSync,
    ensureSymlink,
    ensureSymlinkSync,
    existsSync,
    getFileSize,
    getFileSizeSync,
    lchown,
    lchownSync,
    link,
    linkSync,
    lstat,
    lstatSync,
    lutimes,
    lutimesSync,
    mkdir,
    mkdirp,
    mkdirpSync,
    mkdirs,
    mkdirsSync,
    mkdirSync,
    move,
    moveSync,
    open,
    opendir,
    opendirSync,
    openSync,
    outputFile,
    outputFileSync,
    outputJson,
    outputJsonSync,
    pathExists,
    pathExistsSync,
    pathIsBlockDevice,
    pathIsBlockDeviceSync,
    pathIsCharacterDevice,
    pathIsCharacterDeviceSync,
    pathIsDirectory,
    pathIsDirectorySync,
    pathIsFifo,
    pathIsFifoSync,
    pathIsFile,
    pathIsFileSync,
    pathIsSocket,
    pathIsSocketSync,
    pathIsSymbolicLink,
    pathIsSymbolicLinkSync,
    readdir,
    readdirSync,
    readFile,
    readFileSync,
    readFileToBlob,
    readFileToBlobSync,
    readJson,
    readJsonSync,
    readlink,
    readlinkSync,
    realpath,
    realpathSync,
    remove,
    removeSync,
    rename,
    renameSync,
    rm,
    rmdir,
    rmdirSync,
    rmSync,
    stat,
    statfs,
    statfsSync,
    statSync,
    symlink,
    symlinkSync,
    truncate,
    truncateSync,
    unlink,
    unlinkSync,
    utimes,
    utimesSync,
    writeFile,
    writeFileSync,
    writeJson,
    writeJsonSync,
} from '@kikiutils/fs-extra';
import type kFse from '@kikiutils/fs-extra';
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
        this.#value = join(...this.#toStrings(paths));
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
        return new Path(format(pathObject));
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
        return basename(this.#value, suffix);
    }

    /**
     * @see {@link nodePath.dirname}
     */
    dirname() {
        return this.#newInstance(dirname(this.#value));
    }

    /**
     * @see {@link nodePath.extname}
     */
    extname() {
        return extname(this.#value);
    }

    /**
     * @see {@link nodePath.isAbsolute}
     */
    isAbsolute() {
        return isAbsolute(this.#value);
    }

    /**
     * @see {@link nodePath.normalize}
     */
    normalize() {
        return this.#newInstance(normalize(this.#value));
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
        return parse(this.#value);
    }

    /**
     * @see {@link nodePath.relative}
     */
    relative(to: PathLike) {
        return this.#newInstance(relative(this.#value, to.toString()));
    }

    /**
     * @see {@link nodePath.resolve}
     */
    resolve() {
        return this.#newInstance(resolve(this.#value));
    }

    toJSON() {
        return this.#value;
    }

    /**
     * @see {@link nodePath.toNamespacedPath}
     */
    toNamespacedPath() {
        return toNamespacedPath(this.#value);
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
        return access(this.#value, mode);
    }

    /**
     * @see {@link fsp.copyFile}
     */
    copyFile(dest: PathLike, mode?: number) {
        return copyFile(this.#value, dest.toString(), mode);
    }

    /**
     * @see {@link fsp.open}
     */
    open(flags?: number | string, mode?: fs.Mode) {
        return open(this.value, flags, mode);
    }

    /**
     * @see {@link fsp.rename}
     */
    rename(newPath: PathLike) {
        return rename(this.#value, newPath.toString());
    }

    /**
     * @see {@link fsp.truncate}
     */
    truncate(len?: number) {
        return truncate(this.#value, len);
    }

    /**
     * @see {@link fsp.rmdir}
     */
    rmdir(options?: fs.RmDirOptions) {
        return rmdir(this.#value, options);
    }

    /**
     * @see {@link fsp.rm}
     */
    rm(options?: fs.RmOptions) {
        return rm(this.#value, options);
    }

    /**
     * @see {@link fsp.symlink}
     */
    symlink(path: PathLike, type?: null | string) {
        return symlink(this.#value, path.toString(), type);
    }

    /**
     * @see {@link fsp.link}
     */
    link(newPath: PathLike) {
        return link(this.#value, newPath.toString());
    }

    /**
     * @see {@link fsp.unlink}
     */
    unlink() {
        return unlink(this.#value);
    }

    /**
     * @see {@link fsp.chmod}
     */
    chmod(mode: fs.Mode) {
        return chmod(this.#value, mode);
    }

    /**
     * @see {@link fsp.lchown}
     */
    lchown(uid: number, gid: number) {
        return lchown(this.#value, uid, gid);
    }

    /**
     * @see {@link fsp.lutimes}
     */
    lutimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return lutimes(this.#value, atime, mtime);
    }

    /**
     * @see {@link fsp.chown}
     */
    chown(uid: number, gid: number) {
        return chown(this.#value, uid, gid);
    }

    /**
     * @see {@link fsp.utimes}
     */
    utimes(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return utimes(this.#value, atime, mtime);
    }

    /**
     * @see {@link fsp.writeFile}
     */
    writeFile(data: KFseParameters['writeFile'][1], options?: KFseParameters['writeFile'][2]) {
        return writeFile(this.#value, data, options);
    }

    /**
     * @see {@link fsp.appendFile}
     */
    appendFile(data: KFseParameters['appendFile'][1], options?: KFseParameters['appendFile'][2]) {
        return appendFile(this.#value, data, options);
    }

    /**
     * @see {@link fsp.opendir}
     */
    opendir(options?: fs.OpenDirOptions) {
        return opendir(this.#value, options);
    }

    /**
     * @see {@link fsp.cp}
     */
    cp(destination: PathLike, opts?: fs.CopyOptions) {
        return cp(this.#value, destination.toString(), opts);
    }

    /**
     * @see {@link fsp.mkdir}
     */
    mkdir(options: fs.MakeDirectoryOptions & { recursive: true }): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    mkdir(options?: (fs.MakeDirectoryOptions & { recursive?: false }) | fs.Mode | null): Promise<boolean>;
    mkdir(options?: fs.MakeDirectoryOptions | fs.Mode | null): Promise<string | undefined>;
    mkdir(options?: any) {
        return mkdir(this.#value, options);
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
        return readdir(this.#value, options);
    }

    /**
     * @see {@link fsp.readlink}
     */
    readlink(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    readlink(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
    readlink(options?: fs.ObjectEncodingOptions | null | string): Promise<Buffer | string | undefined>;
    readlink(options?: any) {
        return readlink(this.#value, options);
    }

    /**
     * @see {@link fsp.lstat}
     */
    lstat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
    // @ts-expect-error Ignore this error.
    lstat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
    lstat(opts?: fs.StatOptions): Promise<fs.BigIntStats | fs.Stats | undefined>;
    lstat(opts?: any) {
        return lstat(this.#value, opts);
    }

    /**
     * @see {@link fsp.stat}
     */
    stat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats | undefined>;
    // @ts-expect-error Ignore this error.
    stat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats | undefined>;
    stat(opts?: fs.StatOptions): Promise<fs.BigIntStats | fs.Stats | undefined>;
    stat(opts?: any) {
        return stat(this.#value, opts);
    }

    /**
     * @see {@link fsp.statfs}
     */
    statfs(opts?: fs.StatFsOptions & { bigint?: false }): Promise<fs.StatsFs | undefined>;
    // @ts-expect-error Ignore this error.
    statfs(opts: fs.StatFsOptions & { bigint: true }): Promise<fs.BigIntStatsFs | undefined>;
    statfs(opts?: fs.StatFsOptions): Promise<fs.BigIntStatsFs | fs.StatsFs | undefined>;
    statfs(opts?: any) {
        return statfs(this.#value, opts);
    }

    /**
     * @see {@link fsp.realpath}
     */
    realpath(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<string | undefined>;
    // @ts-expect-error Ignore this error.
    realpath(options: fs.BufferEncodingOption): Promise<Buffer | undefined>;
    realpath(options?: BufferEncoding | fs.ObjectEncodingOptions | null): Promise<Buffer | string | undefined>;
    realpath(options?: any) {
        return realpath(this.#value, options);
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
        return readFile(this.#value, options);
    }

    // node:fs sync methods

    /**
     * @see {@link fs.existsSync}
     */
    existsSync() {
        return existsSync(this.value);
    }

    /**
     * @see {@link fs.appendFileSync}
     */
    appendFileSync(data: string | Uint8Array, options?: fs.WriteFileOptions | undefined) {
        return appendFileSync(this.#value, data, options);
    }

    /**
     * @see {@link fs.renameSync}
     */
    renameSync(newPath: PathLike) {
        return renameSync(this.#value, newPath.toString());
    }

    /**
     * @see {@link fs.truncateSync}
     */
    truncateSync(len?: number) {
        return truncateSync(this.#value, len);
    }

    /**
     * @see {@link fs.chownSync}
     */
    chownSync(uid: number, gid: number) {
        return chownSync(this.#value, uid, gid);
    }

    /**
     * @see {@link fs.lchownSync}
     */
    lchownSync(uid: number, gid: number) {
        return lchownSync(this.#value, uid, gid);
    }

    /**
     * @see {@link fs.lutimesSync}
     */
    lutimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return lutimesSync(this.#value, atime, mtime);
    }

    /**
     * @see {@link fs.chmodSync}
     */
    chmodSync(mode: fs.Mode) {
        return chmodSync(this.#value, mode);
    }

    /**
     * @see {@link fs.linkSync}
     */
    linkSync(newPath: PathLike) {
        return linkSync(this.#value, newPath.toString());
    }

    /**
     * @see {@link fs.symlinkSync}
     */
    symlinkSync(path: PathLike, type?: fs.symlink.Type | null) {
        return symlinkSync(this.#value, path.toString(), type);
    }

    /**
     * @see {@link fs.unlinkSync}
     */
    unlinkSync() {
        return unlinkSync(this.#value);
    }

    /**
     * @see {@link fs.rmdirSync}
     */
    rmdirSync(options?: fs.RmDirOptions) {
        return rmdirSync(this.#value, options);
    }

    /**
     * @see {@link fs.rmSync}
     */
    rmSync(options?: fs.RmOptions) {
        return rmSync(this.#value, options);
    }

    /**
     * @see {@link fs.utimesSync}
     */
    utimesSync(atime: fs.TimeLike, mtime: fs.TimeLike) {
        return utimesSync(this.#value, atime, mtime);
    }

    /**
     * @see {@link fs.accessSync}
     */
    accessSync(mode?: number) {
        return accessSync(this.#value, mode);
    }

    /**
     * @see {@link fs.copyFileSync}
     */
    copyFileSync(dest: PathLike, mode?: number) {
        return copyFileSync(this.#value, dest.toString(), mode);
    }

    /**
     * @see {@link fs.cpSync}
     */
    cpSync(destination: PathLike, opts?: fs.CopySyncOptions) {
        return cpSync(this.#value, destination.toString(), opts);
    }

    /**
     * @see {@link fs.openSync}
     */
    openSync(flags: fs.OpenMode, mode?: fs.Mode | null) {
        return openSync(this.#value, flags, mode);
    }

    /**
     * @see {@link fs.writeFileSync}
     */
    writeFileSync(data: NodeJS.ArrayBufferView | string, options?: fs.WriteFileOptions) {
        return writeFileSync(this.#value, data, options);
    }

    /**
     * @see {@link fs.opendirSync}
     */
    opendirSync(options?: fs.OpenDirOptions) {
        return opendirSync(this.#value, options);
    }

    /**
     * @see {@link fs.statfsSync}
     */
    statfsSync(options?: fs.StatFsOptions & { bigint?: false }): fs.StatsFs | undefined;
    // @ts-expect-error Ignore this error.
    statfsSync(options: fs.StatFsOptions & { bigint: true }): fs.BigIntStatsFs | undefined;
    statfsSync(options?: fs.StatFsOptions): fs.BigIntStatsFs | fs.StatsFs | undefined;
    statfsSync(options?: any) {
        return statfsSync(this.#value, options);
    }

    /**
     * @see {@link fs.readlinkSync}
     */
    readlinkSync(options?: fs.EncodingOption): string | undefined;
    // @ts-expect-error Ignore this error.
    readlinkSync(options: fs.BufferEncodingOption): Buffer | undefined;
    readlinkSync(options?: fs.EncodingOption): Buffer | string | undefined;
    readlinkSync(options?: any) {
        return readlinkSync(this.#value, options);
    }

    /**
     * @see {@link fs.realpathSync}
     */
    realpathSync(options?: fs.EncodingOption): string | undefined;
    // @ts-expect-error Ignore this error.
    realpathSync(options: fs.BufferEncodingOption): Buffer | undefined;
    realpathSync(options?: fs.EncodingOption): Buffer | string | undefined;
    realpathSync(options?: any) {
        return realpathSync(this.#value, options);
    }

    /**
     * @see {@link fs.mkdirSync}
     */
    mkdirSync(options: fs.MakeDirectoryOptions & { recursive: true }): string | undefined;
    // @ts-expect-error Ignore this error.
    mkdirSync(options?: (fs.MakeDirectoryOptions & { recursive?: false }) | fs.Mode | null): boolean;
    mkdirSync(options?: fs.MakeDirectoryOptions | fs.Mode | null): string | undefined;
    mkdirSync(options?: any) {
        return mkdirSync(this.#value, options);
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
        return readdirSync(this.#value, options);
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
        return readFileSync(this.#value, options);
    }

    /**
     * @see {@link fs.statSync}
     */
    statSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
    // @ts-expect-error Ignore this error.
    statSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
    statSync(options?: fs.StatSyncOptions): fs.BigIntStats | fs.Stats | undefined;
    statSync(options?: any) {
        return statSync(this.#value, options);
    }

    /**
     * @see {@link fs.statSync}
     */
    lstatSync(options?: fs.StatSyncOptions & { bigint?: false }): fs.Stats | undefined;
    // @ts-expect-error Ignore this error.
    lstatSync(options: fs.StatSyncOptions & { bigint: true }): fs.BigIntStats | undefined;
    lstatSync(options?: fs.StatSyncOptions): fs.BigIntStats | fs.Stats | undefined;
    lstatSync(options?: any) {
        return lstatSync(this.#value, options);
    }

    // fs-extra promise methods

    /**
     * @see {@link fse.pathExists}
     */
    pathExists() {
        return pathExists(this.#value);
    }

    /**
     * @see {@link fse.copy}
     */
    copy(dest: PathLike, options?: fse.CopyOptions) {
        return copy(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.move}
     */
    move(dest: PathLike, options?: fse.MoveOptions) {
        return move(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.ensureFile}
     */
    ensureFile() {
        return ensureFile(this.#value);
    }

    /**
     * @see {@link fse.ensureFile}
     */
    createFile() {
        return createFile(this.#value);
    }

    /**
     * @see {@link fse.ensureLink}
     */
    ensureLink(dest: PathLike) {
        return ensureLink(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureLink}
     */
    createLink(dest: PathLike) {
        return createLink(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureSymlink}
     */
    ensureSymlink(dest: PathLike, type?: fs.symlink.Type) {
        return ensureSymlink(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureSymlink}
     */
    createSymlink(dest: PathLike, type?: fs.symlink.Type) {
        return createSymlink(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    ensureDir(options?: fse.EnsureDirOptions | number) {
        return ensureDir(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    mkdirp(options?: fse.EnsureDirOptions | number) {
        return mkdirp(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDir}
     */
    mkdirs(options?: fse.EnsureDirOptions | number) {
        return mkdirs(this.#value, options);
    }

    /**
     * @see {@link fse.outputFile}
     */
    outputFile(data: NodeJS.ArrayBufferView | string, options?: fse.WriteFileOptions) {
        return outputFile(this.#value, data, options);
    }

    /**
     * @see {@link fse.readJson}
     */
    readJson<T = any>(options?: fse.JsonReadOptions) {
        return readJson<T>(this.#value, options);
    }

    /**
     * @see {@link fse.writeJson}
     */
    writeJson(obj: any, options?: fse.JsonWriteOptions) {
        return writeJson(this.#value, obj, options);
    }

    /**
     * @see {@link fse.outputJson}
     */
    outputJson(data: any, options?: fse.JsonOutputOptions) {
        return outputJson(this.#value, data, options);
    }

    /**
     * @see {@link fse.remove}
     */
    remove() {
        return remove(this.#value);
    }

    /**
     * @see {@link fse.emptyDir}
     */
    emptyDir() {
        return emptyDir(this.#value);
    }

    /**
     * @see {@link fse.emptyDir}
     */
    emptydir() {
        return emptydir(this.#value);
    }

    // fs-extra sync methods

    /**
     * @see {@link fse.pathExistsSync}
     */
    pathExistsSync() {
        return pathExistsSync(this.#value);
    }

    /**
     * @see {@link fse.copySync}
     */
    copySync(dest: PathLike, options?: fse.CopyOptionsSync) {
        return copySync(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.moveSync}
     */
    moveSync(dest: PathLike, options?: fse.MoveOptions) {
        return moveSync(this.#value, dest.toString(), options);
    }

    /**
     * @see {@link fse.ensureFileSync}
     */
    ensureFileSync() {
        return ensureFileSync(this.#value);
    }

    /**
     * @see {@link fse.ensureLinkSync}
     */
    ensureLinkSync(dest: PathLike) {
        return ensureLinkSync(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureSymlinkSync}
     */
    ensureSymlinkSync(dest: PathLike, type?: fs.symlink.Type) {
        return ensureSymlinkSync(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureDirSync}
     */
    ensureDirSync(options?: fse.EnsureDirOptions | number) {
        return ensureDirSync(this.#value, options);
    }

    /**
     * @see {@link fse.outputFileSync}
     */
    outputFileSync(data: NodeJS.ArrayBufferView | string, options?: fse.WriteFileOptions) {
        return outputFileSync(this.#value, data, options);
    }

    /**
     * @see {@link fse.outputJsonSync}
     */
    outputJsonSync(data: any, options?: fse.JsonOutputOptions) {
        return outputJsonSync(this.#value, data, options);
    }

    /**
     * @see {@link fse.removeSync}
     */
    removeSync() {
        return removeSync(this.#value);
    }

    /**
     * @see {@link fse.emptyDirSync}
     */
    emptyDirSync() {
        return emptyDirSync(this.#value);
    }

    /**
     * @see {@link fse.ensureFileSync}
     */
    createFileSync() {
        return createFileSync(this.#value);
    }

    /**
     * @see {@link fse.ensureLinkSync}
     */
    createLinkSync(dest: PathLike) {
        return createLinkSync(this.#value, dest.toString());
    }

    /**
     * @see {@link fse.ensureSymlinkSync}
     */
    createSymlinkSync(dest: PathLike, type?: fs.symlink.Type) {
        return createSymlinkSync(this.#value, dest.toString(), type);
    }

    /**
     * @see {@link fse.ensureDirSync}
     */
    mkdirsSync(options?: fse.EnsureDirOptions | number) {
        return mkdirsSync(this.#value, options);
    }

    /**
     * @see {@link fse.ensureDirSync}
     */
    mkdirpSync(options?: fse.EnsureDirOptions | number) {
        return mkdirpSync(this.#value, options);
    }

    /**
     * @see {@link fse.readJsonSync}
     */
    readJsonSync<T = any>(options?: fse.JsonReadOptions) {
        return readJsonSync<T>(this.#value, options);
    }

    /**
     * @see {@link fse.writeJsonSync}
     */
    writeJsonSync(obj: any, options?: fse.JsonWriteOptions) {
        return writeJsonSync(this.#value, obj, options);
    }

    /**
     * @see {@link fse.emptyDirSync}
     */
    emptydirSync() {
        return emptydirSync(this.#value);
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
        return getFileSize(this.#value, opts);
    }

    /**
     * @see {@link kFse.pathIsBlockDevice}
     */
    isBlockDevice() {
        return pathIsBlockDevice(this.#value);
    }

    /**
     * @see {@link kFse.pathIsCharacterDevice}
     */
    isCharacterDevice() {
        return pathIsCharacterDevice(this.#value);
    }

    /**
     * @see {@link kFse.pathIsDirectory}
     */
    isDir = this.isDirectory;

    /**
     * @see {@link kFse.pathIsDirectory}
     */
    isDirectory() {
        return pathIsDirectory(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFifo}
     */
    isFifo() {
        return pathIsFifo(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFile}
     */
    isFile() {
        return pathIsFile(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSocket}
     */
    isSocket() {
        return pathIsSocket(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSymbolicLink}
     */
    isSymbolicLink() {
        return pathIsSymbolicLink(this.#value);
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
        return readFileToBlob(this.#value, options);
    }

    // additional sync methods

    getFileSizeSync(options?: fs.StatSyncOptions & { bigint?: false }): number | undefined;
    // @ts-expect-error Ignore this error.
    getFileSizeSync(options: fs.StatSyncOptions & { bigint: true }): bigint | undefined;
    getFileSizeSync(options?: fs.StatSyncOptions): bigint | number | undefined;
    getFileSizeSync(options?: any) {
        return getFileSizeSync(this.#value, options);
    }

    /**
     * @see {@link kFse.pathIsBlockDeviceSync}
     */
    isBlockDeviceSync() {
        return pathIsBlockDeviceSync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsCharacterDeviceSync}
     */
    isCharacterDeviceSync() {
        return pathIsCharacterDeviceSync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsDirectorySync}
     */
    isDirSync = this.isDirectorySync;

    /**
     * @see {@link kFse.pathIsDirectorySync}
     */
    isDirectorySync() {
        return pathIsDirectorySync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFifoSync}
     */
    isFifoSync() {
        return pathIsFifoSync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsFileSync}
     */
    isFileSync() {
        return pathIsFileSync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSocketSync}
     */
    isSocketSync() {
        return pathIsSocketSync(this.#value);
    }

    /**
     * @see {@link kFse.pathIsSymbolicLinkSync}
     */
    isSymbolicLinkSync() {
        return pathIsSymbolicLinkSync(this.#value);
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
        return readFileToBlobSync(this.#value, options);
    }
}
