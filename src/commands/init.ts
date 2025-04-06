import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { prompter } from '../utils/prompter';
import { logger } from '../utils/logger';

export const initCommand = new Command()
  .name('init')
  .description('Initialize a new AI-assisted project')
  .option('-d, --dir <directory>', 'Project directory', '.')
  .action(async (options) => {
    try {
      const projectDir = path.resolve(options.dir);
      
      // Create necessary directories
      await fs.ensureDir(path.join(projectDir, 'ai-docs'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'technical'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'requirements'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'context'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'technical', 'fixes'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'context', 'archived-summaries'));
      
      // Copy template files
      const templatesDir = path.join(__dirname, '..', '..', 'templates');
      
      // Root level files
      await fs.copy(path.join(templatesDir, 'README.md'), path.join(projectDir, 'README.md'));
      await fs.copy(path.join(templatesDir, 'CHANGELOG.md'), path.join(projectDir, 'CHANGELOG.md'));
      await fs.copy(path.join(templatesDir, 'AI-PROMPTS.md'), path.join(projectDir, 'AI-PROMPTS.md'));
      
      // Docs root files
      await fs.copy(path.join(templatesDir, 'docs', 'START-HERE.md'), path.join(projectDir, 'ai-docs', 'START-HERE.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'GLOSSARY.md'), path.join(projectDir, 'ai-docs', 'GLOSSARY.md'));
      
      // Technical docs
      await fs.copy(path.join(templatesDir, 'docs', 'technical', 'SYSTEM-ARCHITECTURE.md'), path.join(projectDir, 'ai-docs', 'technical', 'SYSTEM-ARCHITECTURE.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'technical', 'TECHNICAL.md'), path.join(projectDir, 'ai-docs', 'technical', 'TECHNICAL.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'technical', 'CLEAN-AI-CODE.md'), path.join(projectDir, 'ai-docs', 'technical', 'CLEAN-AI-CODE.md'));
      
      // Requirements docs
      await fs.copy(path.join(templatesDir, 'docs', 'requirements', 'PRD.md'), path.join(projectDir, 'ai-docs', 'requirements', 'PRD.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'requirements', 'SRS.md'), path.join(projectDir, 'ai-docs', 'requirements', 'SRS.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'requirements', 'TASKS.md'), path.join(projectDir, 'ai-docs', 'requirements', 'TASKS.md'));
      
      // Context docs
      await fs.copy(path.join(templatesDir, 'docs', 'context', 'CONTEXT.md'), path.join(projectDir, 'ai-docs', 'context', 'CONTEXT.md'));
      await fs.copy(path.join(templatesDir, 'docs', 'context', 'active-context.md'), path.join(projectDir, 'ai-docs', 'context', 'active-context.md'));
      
      // Copy fixes templates
      await fs.copy(
        path.join(templatesDir, 'docs', 'technical', 'fixes'),
        path.join(projectDir, 'ai-docs', 'technical', 'fixes')
      );
      
      // Copy archived-summaries contents
      await fs.copy(
        path.join(templatesDir, 'docs', 'context', 'archived-summaries'),
        path.join(projectDir, 'ai-docs', 'context', 'archived-summaries')
      );
      
      console.log('✅ Project initialized successfully');
    } catch (error) {
      console.error('Error initializing project:', error);
      process.exit(1);
    }
  });

export async function initProject(options: { dir: string }) {
  const projectDir = path.resolve(options.dir);
  
  try {
    // Check if project directory exists and has files
    const isExistingProject = await fs.pathExists(projectDir) && 
      (await fs.readdir(projectDir)).length > 0;

    if (isExistingProject) {
      logger.info('Detected existing project. Adding Prompture configuration...');
      
      // Create only the necessary directories if they don't exist
      await fs.ensureDir(path.join(projectDir, 'ai-docs'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'fixes'));
      await fs.ensureDir(path.join(projectDir, '.ai'));
      await fs.ensureDir(path.join(projectDir, '.ai', 'archived-summaries'));

      // Copy all templates
      const templates = {
        'ai-docs/PRD.md': path.join(__dirname, '../../../templates/PRD.md'),
        'ai-docs/SRS.md': path.join(__dirname, '../../../templates/SRS.md'),
        'ai-docs/TECHNICAL.md': path.join(__dirname, '../../../templates/TECHNICAL.md'),
        'ai-docs/SYSTEM-ARCHITECTURE.md': path.join(__dirname, '../../../templates/SYSTEM-ARCHITECTURE.md'),
        'ai-docs/TASKS.md': path.join(__dirname, '../../../templates/TASKS.md'),
        'ai-docs/CONTEXT.md': path.join(__dirname, '../../../templates/CONTEXT.md'),
        'ai-docs/GLOSSARY.md': path.join(__dirname, '../../../templates/GLOSSARY.md'),
        'ai-docs/CHANGELOG.md': path.join(__dirname, '../../../templates/CHANGELOG.md'),
        'ai-docs/CLEAN-AI-CODE.md': path.join(__dirname, '../../../templates/CLEAN-AI-CODE.md'),
        'ai-docs/AI-PROMPTS.md': path.join(__dirname, '../../../templates/AI-PROMPTS.md'),
        'ai-docs/ai-code.summary.md': path.join(__dirname, '../../../templates/ai-code.summary.md'),
        'ai-docs/START-HERE.md': path.join(__dirname, '../../../templates/START-HERE.md'),
        'ai-docs/fixes/TEMPLATE-fix-doc.md': path.join(__dirname, '../../../templates/fixes/TEMPLATE-fix-doc.md'),
        'ai-docs/fixes/README.md': path.join(__dirname, '../../../templates/fixes/README.md'),
        '.ai/active-context.md': path.join(__dirname, '../../../templates/active-context.md'),
        '.ai/archived-summaries/README.md': path.join(__dirname, '../../../templates/archived-summaries/README.md'),
        '.ai/archived-summaries/2024-04-05_example-summary.md': path.join(__dirname, '../../../templates/archived-summaries/2024-04-05_example-summary.md'),
      };

      // Check each file before copying
      for (const [dest, source] of Object.entries(templates)) {
        const destPath = path.join(projectDir, dest);
        if (await fs.pathExists(destPath)) {
          const overwrite = await prompter.confirm(`File ${dest} already exists. Overwrite?`);
          if (!overwrite) {
            logger.info(`Skipping ${dest}`);
            continue;
          }
        }
        await fs.copyFile(source, destPath);
      }

      // Update package.json if it exists
      const packageJsonPath = path.join(projectDir, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.scripts = {
          ...packageJson.scripts,
          'dev:ai': 'prompture context --task "Current development task"',
        };
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }

      logger.success('Prompture configuration added successfully!');
      logger.info('Next steps:');
      logger.info('1. Review the generated AI documentation templates');
      logger.info('2. Run `prompture context --task "Your current task"` to start tracking AI sessions');
      logger.info('3. Start using AI assistance in your development!');

    } else {
      // Original behavior for new projects
      logger.info('Creating new project with Prompture...');
      
      // Create directory structure
      await fs.ensureDir(projectDir);
      await fs.ensureDir(path.join(projectDir, 'src'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs'));
      await fs.ensureDir(path.join(projectDir, 'ai-docs', 'fixes'));
      await fs.ensureDir(path.join(projectDir, '.ai'));
      await fs.ensureDir(path.join(projectDir, '.ai', 'archived-summaries'));
      await fs.ensureDir(path.join(projectDir, 'scripts'));

      // Copy all template files
      const templates = {
        'README.md': path.join(__dirname, '../../../templates/README.md'),
        'ai-docs/PRD.md': path.join(__dirname, '../../../templates/PRD.md'),
        'ai-docs/SRS.md': path.join(__dirname, '../../../templates/SRS.md'),
        'ai-docs/TECHNICAL.md': path.join(__dirname, '../../../templates/TECHNICAL.md'),
        'ai-docs/SYSTEM-ARCHITECTURE.md': path.join(__dirname, '../../../templates/SYSTEM-ARCHITECTURE.md'),
        'ai-docs/TASKS.md': path.join(__dirname, '../../../templates/TASKS.md'),
        'ai-docs/CONTEXT.md': path.join(__dirname, '../../../templates/CONTEXT.md'),
        'ai-docs/GLOSSARY.md': path.join(__dirname, '../../../templates/GLOSSARY.md'),
        'ai-docs/CHANGELOG.md': path.join(__dirname, '../../../templates/CHANGELOG.md'),
        'ai-docs/CLEAN-AI-CODE.md': path.join(__dirname, '../../../templates/CLEAN-AI-CODE.md'),
        'ai-docs/AI-PROMPTS.md': path.join(__dirname, '../../../templates/AI-PROMPTS.md'),
        'ai-docs/ai-code.summary.md': path.join(__dirname, '../../../templates/ai-code.summary.md'),
        'ai-docs/START-HERE.md': path.join(__dirname, '../../../templates/START-HERE.md'),
        'ai-docs/fixes/TEMPLATE-fix-doc.md': path.join(__dirname, '../../../templates/fixes/TEMPLATE-fix-doc.md'),
        'ai-docs/fixes/README.md': path.join(__dirname, '../../../templates/fixes/README.md'),
        '.ai/active-context.md': path.join(__dirname, '../../../templates/active-context.md'),
        '.ai/archived-summaries/README.md': path.join(__dirname, '../../../templates/archived-summaries/README.md'),
        '.ai/archived-summaries/2024-04-05_example-summary.md': path.join(__dirname, '../../../templates/archived-summaries/2024-04-05_example-summary.md'),
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
    }

  } catch (error) {
    logger.error('Failed to initialize project:', error);
    process.exit(1);
  }
} 