import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

type DocType = 'PRD' | 'SRS' | 'SYSTEM-ARCHITECTURE' | 'TECHNICAL' | 'TASKS' | 'CONTEXT' | 'GLOSSARY' | 'START-HERE' | 'CLEAN-AI-CODE' | 'FIXES' | 'ARCHIVED-SUMMARIES';

const docTemplates: Record<DocType, { path: string, category: string, isDirectory?: boolean }> = {
  'PRD': { path: 'PRD.md', category: 'requirements' },
  'SRS': { path: 'SRS.md', category: 'requirements' },
  'SYSTEM-ARCHITECTURE': { path: 'SYSTEM-ARCHITECTURE.md', category: 'technical' },
  'TECHNICAL': { path: 'TECHNICAL.md', category: 'technical' },
  'TASKS': { path: 'TASKS.md', category: 'requirements' },
  'CONTEXT': { path: 'CONTEXT.md', category: 'context' },
  'GLOSSARY': { path: 'GLOSSARY.md', category: 'root' },
  'START-HERE': { path: 'START-HERE.md', category: 'root' },
  'CLEAN-AI-CODE': { path: 'CLEAN-AI-CODE.md', category: 'technical' },
  'FIXES': { path: 'fixes', category: 'technical', isDirectory: true },
  'ARCHIVED-SUMMARIES': { path: 'archived-summaries', category: 'context', isDirectory: true }
};

export const docsCommand = new Command()
  .name('docs')
  .description('Generate AI documentation templates')
  .option('-t, --type <type>', 'Document type (PRD, SRS, SYSTEM-ARCHITECTURE, TECHNICAL, TASKS, CONTEXT, GLOSSARY, START-HERE, CLEAN-AI-CODE, FIXES, ARCHIVED-SUMMARIES)')
  .action(async (options) => {
    try {
      const docsDir = path.join(process.cwd(), 'ai-docs');
      
      if (!await fs.pathExists(docsDir)) {
        console.error('Error: ai-docs directory not found. Run "prompture init" first.');
        process.exit(1);
      }

      if (options.type) {
        const docType = options.type.toUpperCase() as DocType;
        const templateInfo = docTemplates[docType];
        if (!templateInfo) {
          console.error(`Error: Invalid document type. Valid types are: ${Object.keys(docTemplates).join(', ')}`);
          process.exit(1);
        }

        const templatePath = path.join(__dirname, '..', '..', 'templates', 'docs', templateInfo.category, templateInfo.path);
        const targetDir = templateInfo.category === 'root' 
          ? docsDir 
          : path.join(docsDir, templateInfo.category);
        const targetPath = path.join(targetDir, templateInfo.path);

        if (await fs.pathExists(targetPath)) {
          console.error(`Error: ${templateInfo.path} already exists in ${targetDir}`);
          process.exit(1);
        }

        await fs.ensureDir(targetDir);
        
        if (templateInfo.isDirectory) {
          await fs.copy(templatePath, targetPath);
          console.log(`✅ Copied ${templateInfo.path} directory to ${targetDir}`);
        } else {
          await fs.copy(templatePath, targetPath);
          console.log(`✅ Generated ${templateInfo.path} in ${targetDir}`);
        }
      } else {
        console.log('Available document types:');
        console.log(Object.keys(docTemplates).join(', '));
      }
    } catch (error) {
      console.error('Error generating documentation:', error);
      process.exit(1);
    }
  }); 