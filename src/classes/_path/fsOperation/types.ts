import events from 'events';
import fs from 'fs';
import stream from 'stream';

export type WriteFileData = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | stream.Stream;
export type WriteFileOptions =
	BufferEncoding
	| (fs.ObjectEncodingOptions & {
		flag?: fs.OpenMode | undefined;
		mode?: fs.Mode | undefined;
	} & events.Abortable)
	| null;
