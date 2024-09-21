import { defineConfig } from 'ts-project-builder';

export default defineConfig({ builtInInputPluginOptions: { nodeExternal: { include: ['node-ssh'] } } });
