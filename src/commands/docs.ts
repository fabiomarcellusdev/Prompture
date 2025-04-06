import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

type DocType = 'PRD' | 'SRS' | 'SYSTEM-ARCHITECTURE' | 'TECHNICAL' | 'TASKS' | 'CONTEXT' | 'GLOSSARY';

const docTemplates: Record<DocType, string> = {
  'PRD': 'PRD.md',
  'SRS': 'SRS.md',
  'SYSTEM-ARCHITECTURE': 'SYSTEM-ARCHITECTURE.md',
  'TECHNICAL': 'TECHNICAL.md',
  'TASKS': 'TASKS.md',
  'CONTEXT': 'CONTEXT.md',
  'GLOSSARY': 'GLOSSARY.md',
};

export const docsCommand = new Command()
  .name('docs')
  .description('Generate AI documentation templates')
  .option('-t, --type <type>', 'Document type (PRD, SRS, SYSTEM-ARCHITECTURE, TECHNICAL, TASKS)')
  .action(async (options) => {
    try {
      const docsDir = path.join(process.cwd(), 'ai-docs');
      
      if (!await fs.pathExists(docsDir)) {
        console.error('Error: ai-docs directory not found. Run "prompture init" first.');
        process.exit(1);
      }

      if (options.type) {
        const docType = options.type.toUpperCase() as DocType;
        const templateFile = docTemplates[docType];
        if (!templateFile) {
          console.error(`Error: Invalid document type. Valid types are: ${Object.keys(docTemplates).join(', ')}`);
          process.exit(1);
        }

        const templatePath = path.join(__dirname, '..', '..', 'templates', templateFile);
        const targetPath = path.join(docsDir, templateFile);

        if (await fs.pathExists(targetPath)) {
          console.error(`Error: ${templateFile} already exists in ai-docs directory`);
          process.exit(1);
        }

        await fs.copy(templatePath, targetPath);
        console.log(`✅ Generated ${templateFile} in ai-docs directory`);
      } else {
        console.log('Available document types:');
        console.log(Object.keys(docTemplates).join(', '));
      }
    } catch (error) {
      console.error('Error generating documentation:', error);
      process.exit(1);
    }
  }); 