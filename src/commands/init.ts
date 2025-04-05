import fs from 'fs-extra';
import path from 'path';
import { prompter } from '../utils/prompter';
import { logger } from '../utils/logger';

export async function initProject(options: { dir: string }) {
  const projectDir = path.resolve(options.dir);
  
  try {
    // Create directory structure
    await fs.ensureDir(projectDir);
    await fs.ensureDir(path.join(projectDir, 'src'));
    await fs.ensureDir(path.join(projectDir, 'docs'));
    await fs.ensureDir(path.join(projectDir, '.ai'));
    await fs.ensureDir(path.join(projectDir, 'scripts'));

    // Copy template files
    const templates = {
      'README.md': path.join(__dirname, '../../templates/README.md'),
      'docs/PRD.md': path.join(__dirname, '../../templates/PRD.md'),
      'docs/SRS.md': path.join(__dirname, '../../templates/SRS.md'),
      '.ai/active-context.md': path.join(__dirname, '../../templates/active-context.md'),
    };

    for (const [dest, source] of Object.entries(templates)) {
      await fs.copyFile(source, path.join(projectDir, dest));
    }

    // Initialize package.json
    const packageJson = {
      name: path.basename(projectDir),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'prompture context --task "Current development task"',
      },
    };

    await fs.writeJson(path.join(projectDir, 'package.json'), packageJson, { spaces: 2 });

    logger.success('Project initialized successfully!');
    logger.info('Next steps:');
    logger.info('1. Review and update the generated documentation');
    logger.info('2. Run `prompture context --task "Your current task"` to update context');
    logger.info('3. Start developing with your AI assistant!');

  } catch (error) {
    logger.error('Failed to initialize project:', error);
    process.exit(1);
  }
} 