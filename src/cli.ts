#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from './commands/init';
import { updateContext } from './commands/context';
import { generateDocs } from './commands/docs';
import { version } from '../package.json';

const program = new Command();

program
  .name('prompture')
  .description('A CLI tool for efficient AI-assisted development')
  .version(version);

program
  .command('init')
  .description('Initialize a new AI-assisted project')
  .option('-d, --dir <directory>', 'Project directory', '.')
  .action(initProject);

program
  .command('context')
  .description('Update AI context files')
  .option('-t, --task <task>', 'Current task description')
  .action(updateContext);

program
  .command('docs')
  .description('Generate documentation templates')
  .option('-t, --type <type>', 'Document type (PRD, SRS, etc.)')
  .action(generateDocs);

program.parse(process.argv); 