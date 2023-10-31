import kFse from '@kikiutils/fs-extra';

export type KFseParameters = {
	[K in keyof typeof kFse]: Parameters<(typeof kFse)[K]>;
};
