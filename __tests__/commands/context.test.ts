import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { contextCommand } from '../../src/commands/context';
import { logger } from '../../src/utils/logger';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../src/utils/logger');

describe('context command', () => {
  const mockCwd = '/test/project';
  const mockContextPath = path.join(mockCwd, 'ai-docs', 'context', 'active-task-context.md');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('task update', () => {
    it('should update task in active-task-context.md', async () => {
      // Mock fs-extra methods
      (fs.readFile as any).mockResolvedValue('# Active Context\n\n## Current Task\nOld task');
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await contextCommand.parseAsync(['context', '--task', 'New task']);

      // Verify file operations
      expect(fs.readFile).toHaveBeenCalledWith(mockContextPath, 'utf8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Current Task\nNew task')
      );
      expect(logger.success).toHaveBeenCalledWith('✅ Task updated in active-task-context.md');
    });

    it('should handle missing active-task-context.md', async () => {
      // Mock fs-extra methods to throw error
      (fs.readFile as any).mockRejectedValue(new Error('File not found'));

      // Execute the command and expect it to throw
      await expect(contextCommand.parseAsync(['context', '--task', 'New task'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith(
        'Error: ai-docs/context/active-task-context.md not found. Run "prompture init" first.'
      );
    });

    it('should handle file write errors', async () => {
      // Mock fs-extra methods
      (fs.readFile as any).mockResolvedValue('# Active Context\n\n## Current Task\nOld task');
      (fs.writeFile as any).mockRejectedValue(new Error('Write error'));

      // Execute the command and expect it to throw
      await expect(contextCommand.parseAsync(['context', '--task', 'New task'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Error updating task:', expect.any(Error));
    });

    it('should handle malformed active-task-context.md', async () => {
      // Mock fs-extra methods with malformed content
      (fs.readFile as any).mockResolvedValue('Invalid content without task section');
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await contextCommand.parseAsync(['context', '--task', 'New task']);

      // Verify file operations
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Current Task\nNew task')
      );
    });

    it('should preserve other sections when updating task', async () => {
      // Mock fs-extra methods with multiple sections
      const originalContent = `# Active Context

## Summary
Project summary

## Current Task
Old task

## Next Steps
Next steps here`;
      (fs.readFile as any).mockResolvedValue(originalContent);
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await contextCommand.parseAsync(['context', '--task', 'New task']);

      // Verify file operations
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Summary\nProject summary')
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Next Steps\nNext steps here')
      );
    });
  });

  describe('context update', () => {
    it('should update context in active-task-context.md', async () => {
      // Mock fs-extra methods
      (fs.readFile as any).mockResolvedValue('# Active Context\n\n## Summary\nOld context');
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await contextCommand.parseAsync(['context', '--update', 'New context']);

      // Verify file operations
      expect(fs.readFile).toHaveBeenCalledWith(mockContextPath, 'utf8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Summary\nNew context')
      );
      expect(logger.success).toHaveBeenCalledWith('✅ Context updated in active-task-context.md');
    });

    it('should handle missing summary section', async () => {
      // Mock fs-extra methods with content missing summary section
      (fs.readFile as any).mockResolvedValue('# Active Context\n\n## Current Task\nTask here');
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await contextCommand.parseAsync(['context', '--update', 'New context']);

      // Verify file operations
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Summary\nNew context')
      );
    });

    it('should handle empty context update', async () => {
      // Mock fs-extra methods
      (fs.readFile as any).mockResolvedValue('# Active Context\n\n## Summary\nOld context');
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command with empty context
      await contextCommand.parseAsync(['context', '--update', '']);

      // Verify file operations
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockContextPath,
        expect.stringContaining('## Summary\n')
      );
    });
  });

  describe('invalid commands', () => {
    it('should handle missing command arguments', async () => {
      // Execute the command without arguments
      await expect(contextCommand.parseAsync(['context'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith(
        'Please specify either --task or --update with a value'
      );
    });

    it('should handle invalid command options', async () => {
      // Execute the command with invalid option
      await expect(contextCommand.parseAsync(['context', '--invalid', 'value'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Unknown option: --invalid');
    });
  });
}); 