import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { summaryCommand } from '../../src/commands/summary';
import { logger } from '../../src/utils/logger';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../src/utils/logger');
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn().mockResolvedValue({ description: 'Test summary' })
  }
}));

describe('summary command', () => {
  const mockCwd = '/test/project';
  const mockSummariesPath = path.join(mockCwd, 'ai-docs', 'context', 'summaries');
  const mockRecentSummariesPath = path.join(mockSummariesPath, 'recent-summaries');
  const mockArchivedSummariesPath = path.join(mockSummariesPath, 'archived-summaries');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    // Mock date to ensure consistent test results
    vi.setSystemTime(new Date('2024-04-06'));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('create summary', () => {
    it('should create a new summary in the correct week folder', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await summaryCommand.parseAsync(['summary', '--create', 'Test summary']);

      // Verify directory creation
      const weekFolder = '04-01-2024 to 04-07-2024';
      expect(fs.ensureDir).toHaveBeenCalledWith(
        path.join(mockRecentSummariesPath, weekFolder)
      );

      // Verify file creation
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockRecentSummariesPath, weekFolder, '04-06-2024.md'),
        expect.stringContaining('Test summary')
      );

      expect(logger.success).toHaveBeenCalledWith('Summary created successfully!');
    });

    it('should handle missing ai-docs directory', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);

      // Execute the command and expect it to throw
      await expect(summaryCommand.parseAsync(['summary', '--create', 'Test summary'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith(
        'Error: ai-docs directory not found. Run "prompture init" first.'
      );
    });

    it('should handle directory creation errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.ensureDir as any).mockRejectedValue(new Error('Directory creation error'));

      // Execute the command and expect it to throw
      await expect(summaryCommand.parseAsync(['summary', '--create', 'Test summary'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Error creating summary:', expect.any(Error));
    });

    it('should handle file write errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockRejectedValue(new Error('Write error'));

      // Execute the command and expect it to throw
      await expect(summaryCommand.parseAsync(['summary', '--create', 'Test summary'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Error creating summary:', expect.any(Error));
    });
  });

  describe('archive summary', () => {
    it('should archive a summary to the correct location', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readdir as any).mockResolvedValue(['04-06-2024.md']);
      (fs.readFile as any).mockResolvedValue('Summary content');
      (fs.writeFile as any).mockResolvedValue(undefined);
      (fs.remove as any).mockResolvedValue(undefined);

      // Execute the command
      await summaryCommand.parseAsync(['summary', '--archive', '04-06-2024.md']);

      // Verify file operations
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockArchivedSummariesPath, '04-06-2024.md'),
        'Summary content'
      );
      expect(fs.remove).toHaveBeenCalledWith(
        path.join(mockRecentSummariesPath, '04-01-2024 to 04-07-2024', '04-06-2024.md')
      );

      expect(logger.success).toHaveBeenCalledWith('Summary archived successfully!');
    });

    it('should handle non-existent summary file', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readdir as any).mockResolvedValue(['other-file.md']);

      // Execute the command and expect it to throw
      await expect(summaryCommand.parseAsync(['summary', '--archive', '04-06-2024.md'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Summary file not found: 04-06-2024.md');
    });

    it('should handle read errors during archiving', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readdir as any).mockResolvedValue(['04-06-2024.md']);
      (fs.readFile as any).mockRejectedValue(new Error('Read error'));

      // Execute the command and expect it to throw
      await expect(summaryCommand.parseAsync(['summary', '--archive', '04-06-2024.md'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Error archiving summary:', expect.any(Error));
    });
  });

  describe('list summaries', () => {
    it('should list all summaries in recent and archived folders', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readdir as any).mockImplementation((dir) => {
        if (dir.includes('recent-summaries')) {
          return Promise.resolve(['04-01-2024 to 04-07-2024']);
        }
        if (dir.includes('archived-summaries')) {
          return Promise.resolve(['old-summary.md']);
        }
        return Promise.resolve(['04-06-2024.md']);
      });

      // Execute the command
      await summaryCommand.parseAsync(['summary', '--list']);

      // Verify logging
      expect(logger.info).toHaveBeenCalledWith('Recent Summaries:');
      expect(logger.info).toHaveBeenCalledWith('Archived Summaries:');
    });

    it('should handle empty summary directories', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readdir as any).mockResolvedValue([]);

      // Execute the command
      await summaryCommand.parseAsync(['summary', '--list']);

      // Verify logging
      expect(logger.info).toHaveBeenCalledWith('No summaries found.');
    });
  });
}); 