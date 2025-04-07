import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { initCommand } from '../../src/commands/init';
import { logger } from '../../src/utils/logger';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../src/utils/logger');
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn().mockResolvedValue({ confirm: true })
  }
}));

describe('init command', () => {
  const mockCwd = '/test/project';
  const mockAiDocsPath = path.join(mockCwd, 'ai-docs');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`Process exited with code ${code}`);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('directory creation', () => {
    it('should create directory structure and copy templates', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.copy as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await initCommand.parseAsync(['init']);

      // Verify directory creation
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/requirements'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/technical'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/context'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/context/summaries'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/context/summaries/recent-summaries'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('ai-docs/context/summaries/archived-summaries'));

      // Verify template copying
      expect(fs.copy).toHaveBeenCalledWith(
        expect.stringContaining('templates/AI-PROMPTS.md'),
        expect.stringContaining('ai-docs/AI-PROMPTS.md')
      );
      expect(fs.copy).toHaveBeenCalledWith(
        expect.stringContaining('templates/CHANGELOG.md'),
        expect.stringContaining('ai-docs/CHANGELOG.md')
      );

      // Verify success message
      expect(logger.success).toHaveBeenCalledWith('Project initialized successfully!');
    });

    it('should handle directory creation errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);
      (fs.ensureDir as any).mockRejectedValue(new Error('Directory creation error'));

      // Execute the command and expect it to throw
      await expect(initCommand.parseAsync(['init'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize project:', expect.any(Error));
    });
  });

  describe('existing directory handling', () => {
    it('should prompt for confirmation when ai-docs exists', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.remove as any).mockResolvedValue(undefined);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.copy as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await initCommand.parseAsync(['init']);

      // Verify removal of existing directory
      expect(fs.remove).toHaveBeenCalledWith(mockAiDocsPath);
      expect(logger.info).toHaveBeenCalledWith('Removed existing ai-docs directory');
    });

    it('should handle directory removal errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.remove as any).mockRejectedValue(new Error('Remove error'));

      // Execute the command and expect it to throw
      await expect(initCommand.parseAsync(['init'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize project:', expect.any(Error));
    });

    it('should cancel initialization when user declines', async () => {
      // Mock inquirer to return false for confirmation
      vi.mocked(inquirer.prompt).mockResolvedValueOnce({ confirm: false });

      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);

      // Execute the command
      await initCommand.parseAsync(['init']);

      // Verify no directory operations were performed
      expect(fs.remove).not.toHaveBeenCalled();
      expect(fs.ensureDir).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Initialization cancelled.');
    });
  });

  describe('template copying', () => {
    it('should handle template copy errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.copy as any).mockRejectedValue(new Error('Copy error'));

      // Execute the command and expect it to throw
      await expect(initCommand.parseAsync(['init'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize project:', expect.any(Error));
    });

    it('should handle missing template files', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockImplementation((path) => {
        if (path.includes('templates')) {
          return Promise.resolve(false);
        }
        return Promise.resolve(false);
      });
      (fs.ensureDir as any).mockResolvedValue(undefined);

      // Execute the command and expect it to throw
      await expect(initCommand.parseAsync(['init'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize project:', expect.any(Error));
    });
  });

  describe('summary creation', () => {
    it('should create example summary in the correct location', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.copy as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockResolvedValue(undefined);

      // Execute the command
      await initCommand.parseAsync(['init']);

      // Verify summary creation
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('ai-docs/context/summaries/recent-summaries'),
        expect.stringContaining('AI Session Summary')
      );
    });

    it('should handle summary creation errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);
      (fs.ensureDir as any).mockResolvedValue(undefined);
      (fs.copy as any).mockResolvedValue(undefined);
      (fs.writeFile as any).mockRejectedValue(new Error('Write error'));

      // Execute the command and expect it to throw
      await expect(initCommand.parseAsync(['init'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize project:', expect.any(Error));
    });
  });
}); 