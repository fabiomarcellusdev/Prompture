import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import { cleanCommand } from '../../src/commands/clean';
import { logger } from '../../src/utils/logger';
import { CLEAN_COMMAND_SUCCESS_MESSAGES, CLEAN_COMMAND_FAILURE_MESSAGES } from '../../src/utils/constants';
vi.mock('../../src/utils/logger', () => ({
  logger: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

import fs from 'fs-extra';

const mockCwd = path.join(__dirname, '..', '..', 'test');
const mockAiDocsPath = path.join(mockCwd, 'ai-docs');

async function createMockAiDocs() {
  await fs.ensureDir(mockAiDocsPath);
  
  await fs.copy(path.join(__dirname, '..', '..', 'templates'), mockAiDocsPath, {
    overwrite: true, 
    errorOnExist: false, 
  });
}
async function removeMockProjectCwd() {
  await fs.remove(mockCwd);
}

describe('clean command', async () => {

  beforeEach(async () => {
    await removeMockProjectCwd();
    vi.clearAllMocks();
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    vi.spyOn(fs, 'pathExists');
    vi.spyOn(fs, 'remove');
    vi.spyOn(fs, 'move');
    vi.spyOn(fs, 'ensureDir');
    vi.spyOn(fs, 'writeFile');
  });

  afterEach(async () => {
    vi.clearAllMocks();
  });

  describe('successful cleanup', () => {
    it('should clean ai-docs directory and create new active-context.md', async () => {
      
      await createMockAiDocs();

      await cleanCommand.parseAsync(['clean', '--archive-older-than', '0', '-f']);

      expect(fs.ensureDir).toHaveBeenCalledWith(path.join(mockAiDocsPath, 'docs', 'context', 'summaries', 'archived-summaries'));
      expect(fs.pathExists).toHaveBeenCalledWith(path.join(mockAiDocsPath, 'docs', 'context', 'summaries', 'recent-summaries'));
      
      expect(logger.success).toHaveBeenCalledWith(CLEAN_COMMAND_SUCCESS_MESSAGES.CLEAN_UP_SUCCESS);
    });

    it('should create all necessary directories', async () => {

      const mockDocsPath = path.join(mockAiDocsPath, 'docs');

      // await createMockAiDocs();
      await fs.ensureDir(mockAiDocsPath);
  
      await cleanCommand.parseAsync(['clean', '--organize', '-f']);

      const expectedDirs = [
        path.join(mockDocsPath, 'context'),
        path.join(mockDocsPath, 'context', 'summaries'),
        path.join(mockDocsPath, 'context', 'summaries', 'recent-summaries'),
        path.join(mockDocsPath, 'context', 'summaries', 'archived-summaries'),
        path.join(mockDocsPath, 'requirements'),
        path.join(mockDocsPath, 'technical'),
        path.join(mockDocsPath, 'technical', 'fixes')
      ];

      expect(logger.info).not.toHaveBeenCalledWith(CLEAN_COMMAND_SUCCESS_MESSAGES.SKIPPED_ORGANIZING_DOCS);
      // fs.existsSync
      expectedDirs.forEach(dir => {
        expect(fs.existsSync(dir)).toBe(true);
      });
    });
  });

  describe('error handling', () => {
    it('should handle missing ai-docs directory', async () => {
      
      await expect(cleanCommand.parseAsync(['clean'])).rejects.toThrow();

      expect(logger.error).toHaveBeenCalledWith(
        CLEAN_COMMAND_FAILURE_MESSAGES.AI_DOCS_DIR_NOT_FOUND
      );
      vi.clearAllMocks();
    });


    it('should handle file write errors', async () => {
    
      await expect(cleanCommand.parseAsync(['clean'])).rejects.toThrow();

      expect(logger.error).toHaveBeenCalledWith(CLEAN_COMMAND_FAILURE_MESSAGES.FAILED_TO_CLEAN_UP, expect.any(Error));
    });
  });

  describe('file content', () => {
    it('should create active-context.md with correct content', async () => {

      await cleanCommand.parseAsync(['clean']);

      const writeFileCalls = (fs.writeFile as any).mock.calls;
      const lastCall = writeFileCalls[writeFileCalls.length - 1];
      const content = lastCall[1];

      expect(content).toContain('Active Context');
      expect(content).toContain('## Current Task');
      expect(content).toContain('## Summary');
    });
  });
}); 