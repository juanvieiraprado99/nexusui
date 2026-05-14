#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init/index';
import { addCommand } from './commands/add/index';
import { listCommand } from './commands/list/index';
import { removeCommand } from './commands/remove/index';
import { updateCommand } from './commands/update/index';
import { diffCommand } from './commands/diff/index';

export function isVerbose(): boolean {
  return process.env['NEXUS_VERBOSE'] === '1';
}

const program = new Command();

program
  .name('nexus')
  .description('CLI for installing nexus-ui components into Angular projects')
  .version('__PACKAGE_VERSION__')
  .option('--verbose', 'Show detailed output');

program.hook('preAction', (_thisCommand, actionCommand) => {
  if (actionCommand.optsWithGlobals?.()?.verbose) {
    process.env['NEXUS_VERBOSE'] = '1';
  }
});

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(removeCommand);
program.addCommand(updateCommand);
program.addCommand(diffCommand);

program.parse(process.argv);
