import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import inquirer from 'inquirer';

export const initCommand = new Command()
  .name('init')
  .description('Initialize a new Prompture project')
  .action(async () => {
    try {
      // Check if ai-docs already exists
      const aiDocsPath = path.join(process.cwd(), 'ai-docs');
      if (await fs.pathExists(aiDocsPath)) {
        const { confirm } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message: 'The ai-docs directory already exists. Do you want to overwrite it?',
            default: false
          }
        ]);

        if (!confirm) {
          logger.info('Initialization cancelled.');
          return;
        }

        // Remove existing ai-docs directory
        await fs.remove(aiDocsPath);
        logger.info('Removed existing ai-docs directory');
      }

      // Create directory structure
      const dirs = [
        'ai-docs',
        'ai-docs/requirements',
        'ai-docs/technical',
        'ai-docs/technical/fixes',
        'ai-docs/context',
        'ai-docs/context/summaries',
        'ai-docs/context/summaries/recent-summaries',
        'ai-docs/context/summaries/archived-summaries'
      ];

      for (const dir of dirs) {
        await fs.ensureDir(dir);
        logger.success(`Created directory: ${dir}`);
      }

      // Copy root level templates
      const rootTemplatesDir = path.join(__dirname, '../../templates');
      const rootFilesToCopy = [
        { src: 'AI-PROMPTS.md', dest: 'ai-docs/AI-PROMPTS.md' },
        { src: 'CHANGELOG.md', dest: 'ai-docs/CHANGELOG.md' }
      ];

      for (const { src, dest } of rootFilesToCopy) {
        const sourcePath = path.join(rootTemplatesDir, src);
        const destPath = path.join(process.cwd(), dest);
        await fs.copy(sourcePath, destPath);
        logger.success(`Copied template: ${dest}`);
      }

      // Copy docs templates
      const docsTemplatesDir = path.join(__dirname, '../../templates/docs');
      const docsFilesToCopy = [
        { src: 'requirements/PRD.md', dest: 'ai-docs/requirements/PRD.md' },
        { src: 'requirements/SRS.md', dest: 'ai-docs/requirements/SRS.md' },
        { src: 'requirements/TASKS.md', dest: 'ai-docs/requirements/TASKS.md' },
        { src: 'technical/CLEAN-AI-CODE.md', dest: 'ai-docs/technical/CLEAN-AI-CODE.md' },
        { src: 'technical/SYSTEM-ARCHITECTURE.md', dest: 'ai-docs/technical/SYSTEM-ARCHITECTURE.md' },
        { src: 'technical/TECHNICAL.md', dest: 'ai-docs/technical/TECHNICAL.md' },
        { src: 'context/active-context.md', dest: 'ai-docs/context/active-context.md' },
        { src: 'context/CONTEXT.md', dest: 'ai-docs/context/CONTEXT.md' },
        { src: 'START-HERE.md', dest: 'ai-docs/START-HERE.md' },
        { src: 'GLOSSARY.md', dest: 'ai-docs/GLOSSARY.md' }
      ];

      for (const { src, dest } of docsFilesToCopy) {
        const sourcePath = path.join(docsTemplatesDir, src);
        const destPath = path.join(process.cwd(), dest);
        await fs.copy(sourcePath, destPath);
        logger.success(`Copied template: ${dest}`);
      }

      // Copy example summaries
      const summariesTemplatesDir = path.join(docsTemplatesDir, 'context/summaries');
      const summaryFilesToCopy = [
        { src: '2024-04-05_example.md', dest: 'ai-docs/context/summaries/2024-04-05_example.md' },
        { src: 'example-summary.md', dest: 'ai-docs/context/summaries/example-summary.md' }
      ];

      for (const { src, dest } of summaryFilesToCopy) {
        const sourcePath = path.join(summariesTemplatesDir, src);
        const destPath = path.join(process.cwd(), dest);
        await fs.copy(sourcePath, destPath);
        logger.success(`Copied template: ${dest}`);
      }

      // Create current summary
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekFolder = `${weekStart.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} to ${weekEnd.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
      const summaryDir = path.join(process.cwd(), 'ai-docs/context/summaries/recent-summaries', weekFolder);
      await fs.ensureDir(summaryDir);

      const summaryFile = path.join(summaryDir, `${today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}.md`);
      await fs.writeFile(summaryFile, `# AI Session Summary - ${today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}

## Description
Example AI session summary.

## Context
This is an example summary to demonstrate the structure.

## Key Points
- Example point 1
- Example point 2

## Next Steps
- Example next step 1
- Example next step 2

## Token Usage
- Input: 0
- Output: 0
- Total: 0
`);

      logger.success('Created example summary');

      logger.success('\nProject initialized successfully!');
      logger.info('\nNext steps:');
      logger.info('1. Review and update the requirements documents in ai-docs/requirements/');
      logger.info('2. Start your first AI session with: prompture docs');
      logger.info('3. Create your first summary with: prompture summary --create "Description"');
    } catch (error) {
      logger.error('Failed to initialize project:', error);
      process.exit(1);
    }
  }); 