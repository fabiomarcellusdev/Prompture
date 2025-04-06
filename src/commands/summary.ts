import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { format, startOfWeek, endOfWeek } from 'date-fns';

export const summaryCommand = new Command()
  .name('summary')
  .description('Create a new AI session summary')
  .option('-c, --create <description>', 'Create a new summary')
  .option('-f, --force', 'Force create without confirmation')
  .action(async (options) => {
    try {
      const projectDir = process.cwd();
      const contextDir = path.join(projectDir, 'ai-docs', 'context');
      const summariesDir = path.join(contextDir, 'summaries');
      const recentSummariesDir = path.join(summariesDir, 'recent-summaries');
      
      if (!await fs.pathExists(contextDir)) {
        logger.error('context directory not found. Run "prompture init" first.');
        process.exit(1);
      }

      // Ensure summaries directories exist
      await fs.ensureDir(summariesDir);
      await fs.ensureDir(recentSummariesDir);

      if (options.create) {
        await createSummary(recentSummariesDir, options.create, options.force);
      } else {
        // If no options provided, show help
        summaryCommand.help();
      }
    } catch (error) {
      logger.error('Failed to create summary:', error);
      process.exit(1);
    }
  });

function getWeekFolderName(date: Date): string {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Start week on Sunday
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  return `${format(weekStart, 'MM-dd-yyyy')} to ${format(weekEnd, 'MM-dd-yyyy')}`;
}

async function createSummary(summariesDir: string, description: string, force: boolean) {
  const date = new Date();
  const weekFolderName = getWeekFolderName(date);
  const weekFolderPath = path.join(summariesDir, weekFolderName);
  
  // Ensure week folder exists
  await fs.ensureDir(weekFolderPath);

  const summaryName = `${format(date, 'MM-dd-yyyy')}.md`;
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