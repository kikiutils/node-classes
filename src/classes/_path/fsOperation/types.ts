import { Abortable } from 'events';
import { Mode, ObjectEncodingOptions, OpenMode } from 'fs';
import { Stream } from 'stream';

export type ReadFileOptions = BufferEncoding | (ObjectEncodingOptions & Abortable & { flag?: OpenMode; }) | null;
export type ReadFileSyncOptions = BufferEncoding | (ObjectEncodingOptions & { flag?: string; }) | null;
export type WriteFileData = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | Stream;
export type WriteFileOptions =
	BufferEncoding
	| (ObjectEncodingOptions & {
		flag?: OpenMode;
		mode?: Mode;
	} & Abortable)
	| null;
