import { Plugin } from '@yarnpkg/core';
import ping from './commands/ping';

const plugin: Plugin = {
  commands: [ping],
};

export default plugin;
