import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';

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