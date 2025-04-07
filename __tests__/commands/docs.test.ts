import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { docsCommand } from '../../src/commands/docs';
import { logger } from '../../src/utils/logger';
import inquirer from 'inquirer';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../src/utils/logger');
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn().mockResolvedValue({ docType: 'PRD' })
  }
}));

describe('docs command', () => {
  const mockCwd = '/test/project';
  const mockDocsPath = path.join(mockCwd, 'ai-docs');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('document selection', () => {
    it('should open selected document', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('Document content');

      // Execute the command
      await docsCommand.parseAsync(['docs']);

      // Verify file operations
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockDocsPath, 'requirements', 'PRD.md'),
        'utf8'
      );
      expect(logger.success).toHaveBeenCalledWith('Document opened successfully!');
    });

    it('should handle missing ai-docs directory', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(false);

      // Execute the command and expect it to throw
      await expect(docsCommand.parseAsync(['docs'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith(
        'Error: ai-docs directory not found. Run "prompture init" first.'
      );
    });

    it('should handle file read errors', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockRejectedValue(new Error('Read error'));

      // Execute the command and expect it to throw
      await expect(docsCommand.parseAsync(['docs'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Error reading document:', expect.any(Error));
    });

    it('should handle missing document file', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockImplementation((path) => {
        if (path.includes('PRD.md')) {
          return Promise.resolve(false);
        }
        return Promise.resolve(true);
      });

      // Execute the command and expect it to throw
      await expect(docsCommand.parseAsync(['docs'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Document file not found:', expect.any(String));
    });
  });

  describe('document types', () => {
    it('should handle different document types', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('Document content');

      // Mock different document type selections
      const docTypes = ['PRD', 'SRS', 'TASKS', 'TECHNICAL', 'CLEAN-AI-CODE', 'SYSTEM-ARCHITECTURE'];
      for (const docType of docTypes) {
        vi.mocked(inquirer.prompt).mockResolvedValueOnce({ docType });
        await docsCommand.parseAsync(['docs']);
        expect(fs.readFile).toHaveBeenCalledWith(
          expect.stringContaining(docType),
          'utf8'
        );
      }
    });

    it('should handle invalid document type selection', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      vi.mocked(inquirer.prompt).mockResolvedValueOnce({ docType: 'INVALID' });

      // Execute the command and expect it to throw
      await expect(docsCommand.parseAsync(['docs'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Invalid document type selected');
    });
  });

  describe('command options', () => {
    it('should handle direct document type specification', async () => {
      // Mock fs-extra methods
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('Document content');

      // Execute the command with direct document type
      await docsCommand.parseAsync(['docs', '--type', 'PRD']);

      // Verify file operations
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockDocsPath, 'requirements', 'PRD.md'),
        'utf8'
      );
      expect(inquirer.prompt).not.toHaveBeenCalled();
    });

    it('should handle invalid document type option', async () => {
      // Execute the command with invalid document type
      await expect(docsCommand.parseAsync(['docs', '--type', 'INVALID'])).rejects.toThrow();

      // Verify error logging
      expect(logger.error).toHaveBeenCalledWith('Invalid document type: INVALID');
    });

    it('should handle missing document type option', async () => {
      // Execute the command without document type
      await docsCommand.parseAsync(['docs', '--type']);

      // Verify prompt was shown
      expect(inquirer.prompt).toHaveBeenCalled();
    });
  });
}); 