import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { prompter } from '../utils/prompter';

const DOC_TEMPLATES = {
  PRD: 'PRD.md',
  SRS: 'SRS.md',
  TECHNICAL: 'TECHNICAL.md',
  TASKS: 'TASKS.md',
  CONTEXT: 'CONTEXT.md',
  GLOSSARY: 'GLOSSARY.md',
};

export async function generateDocs(options: { type: string }) {
  try {
    const docType = options.type?.toUpperCase();
    
    if (!docType || !DOC_TEMPLATES[docType]) {
      throw new Error(`Invalid document type. Available types: ${Object.keys(DOC_TEMPLATES).join(', ')}`);
    }

    const templatePath = path.join(__dirname, '../../templates', DOC_TEMPLATES[docType]);
    const outputPath = path.join(process.cwd(), 'docs', DOC_TEMPLATES[docType]);

    if (fs.existsSync(outputPath)) {
      const overwrite = await prompter.confirm(`File ${DOC_TEMPLATES[docType]} already exists. Overwrite?`);
      if (!overwrite) {
        logger.info('Operation cancelled.');
        return;
      }
    }

    await fs.copyFile(templatePath, outputPath);
    logger.success(`${DOC_TEMPLATES[docType]} generated successfully!`);

  } catch (error) {
    logger.error('Failed to generate documentation:', error);
    process.exit(1);
  }
} 