import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';

export const contextCommand = new Command()
  .name('context')
  .description('Update AI context files')
  .option('-t, --task <task>', 'Current task description')
  .action(async (options) => {
    try {
      const contextPath = path.join(process.cwd(), '.ai', 'active-context.md');
      
      if (!await fs.pathExists(contextPath)) {
        console.error('Error: .ai/active-context.md not found. Run "prompture init" first.');
        process.exit(1);
      }

      let content = await fs.readFile(contextPath, 'utf-8');
      
      if (options.task) {
        // Update the task section
        const taskRegex = /## Current Task\n\n[\s\S]*?(?=##|$)/;
        const newTaskContent = `## Current Task\n\n${options.task}\n`;
        
        if (taskRegex.test(content)) {
          content = content.replace(taskRegex, newTaskContent);
        } else {
          content += `\n${newTaskContent}`;
        }
        
        await fs.writeFile(contextPath, content);
        console.log('✅ Task updated in active-context.md');
      } else {
        console.log('Current context:');
        console.log(content);
      }
    } catch (error) {
      console.error('Error updating context:', error);
      process.exit(1);
    }
  });

export async function updateContext(options: { task: string }) {
  try {
    const contextPath = path.join(process.cwd(), '.ai', 'active-context.md');
    const tasksPath = path.join(process.cwd(), 'ai-docs', 'TASKS.md');

    if (!fs.existsSync(contextPath)) {
      throw new Error('Active context file not found. Run `prompture init` first.');
    }

    const context = await fs.readFile(contextPath, 'utf-8');
    const tasks = await fs.readFile(tasksPath, 'utf-8');

    const updatedContext = context.replace(
      /## Current Task\n.*?\n/,
      `## Current Task\n${options.task}\n`
    );

    await fs.writeFile(contextPath, updatedContext);
    logger.success('Context updated successfully!');

  } catch (error) {
    logger.error('Failed to update context:', error);
    process.exit(1);
  }
} 