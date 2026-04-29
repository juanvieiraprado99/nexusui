#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init/index';
import { addCommand } from './commands/add/index';

const program = new Command();

program
  .name('nexus-ui-cli')
  .description('CLI for installing nexus-ui components into Angular projects')
  .version('0.0.1');

program.addCommand(initCommand);
program.addCommand(addCommand);

program.parse(process.argv);
