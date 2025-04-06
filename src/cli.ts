#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { contextCommand } from './commands/context';
import { docsCommand } from './commands/docs';
import { gitignoreCommand } from './commands/gitignore';
import { version } from '../package.json';

const program = new Command();

program
  .name('prompture')
  .description('A CLI tool for efficient AI-assisted development')
  .version(version);

program.addCommand(initCommand);
program.addCommand(contextCommand);
program.addCommand(docsCommand);
program.addCommand(gitignoreCommand);

program.parse(process.argv); 