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
        'ai-docs/context',
      ];

      for (const dir of dirs) {
        await fs.ensureDir(dir);
        logger.success(`Created directory: ${dir}`);
      }

      // Copy root level templates
      const rootTemplatesDir = path.join(__dirname, '../../templates');
      const rootFilesToCopy = [
        { src: 'ai-prompts.md', dest: 'ai-docs/ai-prompts.md' },
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
        { src: 'context/active-task-context.md', dest: 'ai-docs/context/active-task-context.md' },
        { src: 'context/CONTEXT.md', dest: 'ai-docs/context/CONTEXT.md' },
        { src: 'start-here.md', dest: 'ai-docs/start-here.md' },
        { src: 'glossary.md', dest: 'ai-docs/glossary.md' }
      ];

      for (const { src, dest } of docsFilesToCopy) {
        const sourcePath = path.join(docsTemplatesDir, src);
        const destPath = path.join(process.cwd(), dest);
        await fs.copy(sourcePath, destPath);
        logger.success(`Copied template: ${dest}`);
      }

      


      logger.success('\nProject initialized successfully!');
      logger.info('\nNext steps:');
      logger.info('Review and update the requirements documents in ai-docs/requirements/');
      logger.info('Start your first AI session with: prompture docs');
    } catch (error) {
      logger.error('Failed to initialize project:', error);
      process.exit(1);
    }
  }); 