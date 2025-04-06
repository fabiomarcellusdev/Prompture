import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { format, subDays } from 'date-fns';
import { glob } from 'glob';
import inquirer from 'inquirer';

export const cleanCommand = new Command()
  .name('clean')
  .description('Clean up and organize AI documentation')
  .option('-a, --archive-older-than <days>', 'Archive context files older than specified days', '14')
  .option('-t, --clean-temp', 'Clean temporary files')
  .option('-o, --organize', 'Organize documentation structure')
  .option('-f, --force', 'Force clean without confirmation')
  .action(async (options) => {
    try {
      const projectDir = process.cwd();
      const aiDocsDir = path.join(projectDir, 'ai-docs');
      
      if (!await fs.pathExists(aiDocsDir)) {
        logger.error('ai-docs directory not found. Run "prompture init" first.');
        process.exit(1);
      }

      // Archive old context files
      if (options.archiveOlderThan) {
        await archiveOldContext(aiDocsDir, parseInt(options.archiveOlderThan), options.force);
      }

      // Clean temporary files
      if (options.cleanTemp) {
        await cleanTempFiles(aiDocsDir, options.force);
      }

      // Organize documentation
      if (options.organize) {
        await organizeDocs(aiDocsDir, options.force);
      }

      // Archive old summaries
      await archiveOldSummaries(aiDocsDir, options.force);

      logger.success('Cleanup completed successfully!');
    } catch (error) {
      logger.error('Failed to clean documentation:', error);
      process.exit(1);
    }
  });

async function archiveOldContext(aiDocsDir: string, days: number, force: boolean) {
  const contextDir = path.join(aiDocsDir, 'context');
  const archivedDir = path.join(contextDir, 'archived-summaries');
  
  if (!await fs.pathExists(contextDir)) {
    logger.warning('context directory not found, skipping archiving');
    return;
  }

  await fs.ensureDir(archivedDir);

  const activeContextPath = path.join(contextDir, 'active-context.md');
  if (await fs.pathExists(activeContextPath)) {
    const stats = await fs.stat(activeContextPath);
    const lastModified = stats.mtime;
    const daysOld = (Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24);

    if (daysOld > days) {
      if (!force) {
        const { proceed } = await inquirer.prompt({
          type: 'confirm',
          name: 'proceed',
          message: `Active context is ${Math.floor(daysOld)} days old. Archive it?`,
          default: false
        });

        if (!proceed) {
          logger.info('Skipping archiving of active context');
          return;
        }
      }

      const archiveName = `context_${format(lastModified, 'MM-dd-yyyy')}.md`;
      await fs.copy(activeContextPath, path.join(archivedDir, archiveName));
      await fs.writeFile(activeContextPath, '# Active Context\n\n');
      logger.success(`Archived old context to ${archiveName}`);
    }
  }
}

async function archiveOldSummaries(aiDocsDir: string, force: boolean) {
  const contextDir = path.join(aiDocsDir, 'context');
  const summariesDir = path.join(contextDir, 'summaries');
  const recentSummariesDir = path.join(summariesDir, 'recent-summaries');
  const archivedSummariesDir = path.join(summariesDir, 'archived-summaries');

  if (!await fs.pathExists(recentSummariesDir)) {
    return;
  }

  await fs.ensureDir(archivedSummariesDir);

  const twoWeeksAgo = subDays(new Date(), 14);
  const weekFolders = await fs.readdir(recentSummariesDir);

  for (const weekFolder of weekFolders) {
    if (!weekFolder.includes(' to ')) continue;

    const weekStart = new Date(weekFolder.split(' to ')[0]);
    if (weekStart < twoWeeksAgo) {
      if (!force) {
        const { proceed } = await inquirer.prompt({
          type: 'confirm',
          name: 'proceed',
          message: `Archive summaries from ${weekFolder}?`,
          default: false
        });

        if (!proceed) {
          logger.info(`Skipping archiving of ${weekFolder}`);
          continue;
        }
      }

      const sourcePath = path.join(recentSummariesDir, weekFolder);
      const targetPath = path.join(archivedSummariesDir, weekFolder);
      
      await fs.move(sourcePath, targetPath, { overwrite: true });
      logger.success(`Archived summaries from ${weekFolder}`);
    }
  }
}

async function cleanTempFiles(aiDocsDir: string, force: boolean) {
  const tempFiles = [
    path.join(aiDocsDir, '*.tmp'),
    path.join(aiDocsDir, '*.temp'),
    path.join(aiDocsDir, '*.bak')
  ];

  if (!force) {
    const { proceed } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceed',
      message: 'Clean temporary files?',
      default: false
    });

    if (!proceed) {
      logger.info('Skipping temporary file cleanup');
      return;
    }
  }

  for (const pattern of tempFiles) {
    const files = await glob(pattern);
    for (const file of files) {
      await fs.remove(file);
      logger.info(`Removed temporary file: ${path.basename(file)}`);
    }
  }
}

async function organizeDocs(aiDocsDir: string, force: boolean) {
  if (!force) {
    const { proceed } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceed',
      message: 'Organize documentation structure?',
      default: false
    });

    if (!proceed) {
      logger.info('Skipping documentation organization');
      return;
    }
  }

  // Ensure all required directories exist
  const requiredDirs = [
    'technical',
    'requirements',
    'context',
    'context/summaries',
    'context/summaries/recent-summaries',
    'context/summaries/archived-summaries',
    'technical/fixes'
  ];

  for (const dir of requiredDirs) {
    await fs.ensureDir(path.join(aiDocsDir, dir));
  }

  // Move any loose files to appropriate directories
  const files = await fs.readdir(aiDocsDir);
  for (const file of files) {
    if (file === 'README.md' || file === 'START-HERE.md' || file === 'GLOSSARY.md') {
      continue;
    }

    const filePath = path.join(aiDocsDir, file);
    const stats = await fs.stat(filePath);
    
    if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.md') {
        const content = await fs.readFile(filePath, 'utf-8');
        let targetDir = '';

        if (content.includes('## Technical') || content.includes('## Architecture')) {
          targetDir = 'technical';
        } else if (content.includes('## Requirements') || content.includes('## Features')) {
          targetDir = 'requirements';
        } else if (content.includes('## Context') || content.includes('## Summary')) {
          targetDir = 'context';
        }

        if (targetDir) {
          const targetPath = path.join(aiDocsDir, targetDir, file);
          await fs.move(filePath, targetPath, { overwrite: true });
          logger.info(`Moved ${file} to ${targetDir}/`);
        }
      }
    }
  }
} 