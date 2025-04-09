import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const aiEntries = [
  'ai-docs/'
];

const commonEntries = [
  // Node.js
  'node_modules/',
  'npm-debug.log*',
  'yarn-debug.log*',
  'yarn-error.log*',
  '.pnp',
  '.pnp.js',
  
  // Environment
  '.env',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  
  // IDE
  '.idea/',
  '.vscode/',
  '*.swp',
  '*.swo',
  
  // Build
  'dist/',
  'build/',
  '.next/',
  'out/',
  
  // OS
  '.DS_Store',
  'Thumbs.db',
  
  // Logs
  'logs/',
  '*.log',
  
  // Coverage
  'coverage/',
  
  // Cache
  '.cache/',
  '.turbo'
];

export const gitignoreCommand = new Command()
  .name('gitignore')
  .description('Manage .gitignore entries for AI-related files')
  .action(async () => {
    try {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      const exists = await fs.pathExists(gitignorePath);
      
      if (!exists) {
        console.log('Creating new .gitignore file...');
        await fs.writeFile(gitignorePath, [...commonEntries, ...aiEntries].join('\n'));
        console.log('✅ Created .gitignore with common entries and AI-related entries');
        return;
      }

      const currentContent = await fs.readFile(gitignorePath, 'utf-8');
      const currentEntries = currentContent.split('\n').filter(line => line.trim());

      // Check if AI entries already exist
      const missingAiEntries = aiEntries.filter(entry => !currentEntries.includes(entry));

      if (missingAiEntries.length === 0) {
        console.log('✅ AI-related entries already present in .gitignore');
        return;
      }

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Add missing AI-related entries to .gitignore? (${missingAiEntries.join(', ')})`,
          default: true
        }
      ]);

      if (confirm) {
        const newContent = [...currentEntries, ...missingAiEntries].join('\n');
        await fs.writeFile(gitignorePath, newContent);
        console.log('✅ Added AI-related entries to .gitignore');
      }
    } catch (error) {
      console.error('Error managing .gitignore:', error);
      process.exit(1);
    }
  }); 