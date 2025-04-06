#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { docsCommand } from './commands/docs';
import { contextCommand } from './commands/context';
import { gitignoreCommand } from './commands/gitignore';
import { cleanCommand } from './commands/clean';
import { version } from '../package.json';

const program = new Command();

program
  .name('prompture')
  .description('CLI tool for AI documentation and context management')
  .version(version);

program.addCommand(initCommand);
program.addCommand(docsCommand);
program.addCommand(contextCommand);
program.addCommand(gitignoreCommand);
program.addCommand(cleanCommand);

program.parse(); 