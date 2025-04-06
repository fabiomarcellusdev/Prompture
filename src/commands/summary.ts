import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import inquirer from 'inquirer';

export const summaryCommand = new Command()
  .name('summary')
  .description('Manage AI session summaries')
  .option('-c, --create <description>', 'Create a new summary')
  .option('-l, --list', 'List all summaries')
  .option('-v, --view <date>', 'View a specific summary by date (YYYY-MM-DD)')
  .option('-f, --force', 'Force create without confirmation')
  .action(async (options) => {
    try {
      const projectDir = process.cwd();
      const summariesDir = path.join(projectDir, 'ai-docs', 'context', 'archived-summaries');
      
      if (!await fs.pathExists(summariesDir)) {
        logger.error('archived-summaries directory not found. Run "prompture init" first.');
        process.exit(1);
      }

      if (options.create) {
        await createSummary(summariesDir, options.create, options.force);
      } else if (options.list) {
        await listSummaries(summariesDir);
      } else if (options.view) {
        await viewSummary(summariesDir, options.view);
      } else {
        // If no options provided, show help
        summaryCommand.help();
      }
    } catch (error) {
      logger.error('Failed to manage summaries:', error);
      process.exit(1);
    }
  });

function getWeekFolderName(date: Date): string {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  return `${format(weekStart, 'yyyy-MM-dd')} to ${format(weekEnd, 'yyyy-MM-dd')}`;
}

async function createSummary(summariesDir: string, description: string, force: boolean) {
  const date = new Date();
  const weekFolderName = getWeekFolderName(date);
  const weekFolderPath = path.join(summariesDir, weekFolderName);
  
  // Ensure week folder exists
  await fs.ensureDir(weekFolderPath);

  const summaryName = `summary_${format(date, 'yyyy-MM-dd')}.md`;
  const summaryPath = path.join(weekFolderPath, summaryName);

  const sessionTime = format(date, 'HH:mm:ss');
  const sessionContent = `## Session ${sessionTime}

### Description
${description}

### Context
[Paste relevant context here]

### Key Points
- [Add key points from the session]

### Next Steps
- [Add planned next steps]

### Token Usage
- Estimated tokens used: [Add token count]
- Model: [Add model used]

---

`;

  if (await fs.pathExists(summaryPath)) {
    // Append to existing summary
    await fs.appendFile(summaryPath, sessionContent);
    logger.success(`Appended new session to summary: ${summaryName}`);
  } else {
    // Create new summary with header
    const header = `# AI Session Summary - ${format(date, 'MMMM d, yyyy')}

`;
    await fs.writeFile(summaryPath, header + sessionContent);
    logger.success(`Created new summary: ${summaryName}`);
  }
}

async function listSummaries(summariesDir: string) {
  const weekFolders = (await fs.readdir(summariesDir))
    .filter(item => item.includes(' to '))
    .sort((a, b) => b.localeCompare(a));

  if (weekFolders.length === 0) {
    logger.info('No summaries found');
    return;
  }

  logger.info('Available summaries by week:');
  for (const weekFolder of weekFolders) {
    const weekPath = path.join(summariesDir, weekFolder);
    const summaries = (await fs.readdir(weekPath))
      .filter(file => file.startsWith('summary_') && file.endsWith('.md'))
      .map(file => file.replace('summary_', '').replace('.md', ''))
      .sort((a, b) => b.localeCompare(a));

    if (summaries.length > 0) {
      logger.info(`\nWeek of ${weekFolder}:`);
      summaries.forEach(date => {
        logger.info(`  - ${date}`);
      });
    }
  }
}

async function viewSummary(summariesDir: string, date: string) {
  const targetDate = new Date(date);
  const weekFolderName = getWeekFolderName(targetDate);
  const weekFolderPath = path.join(summariesDir, weekFolderName);
  const summaryPath = path.join(weekFolderPath, `summary_${date}.md`);
  
  if (!await fs.pathExists(summaryPath)) {
    logger.error(`No summary found for date: ${date}`);
    process.exit(1);
  }

  const content = await fs.readFile(summaryPath, 'utf-8');
  console.log('\n' + content);
} 