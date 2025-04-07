import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import { cleanCommand } from '../../src/commands/clean';

// Mock dependencies
vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn(),
    remove: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
  }
}));

vi.mock('../../src/utils/logger', () => ({
  logger: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import fs from 'fs-extra';
import { logger } from '../../src/utils/logger';

const { default: fsMock } = fs as unknown as {
  default: {
    pathExists: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
    ensureDir: ReturnType<typeof vi.fn>;
    writeFile: ReturnType<typeof vi.fn>;
  };
};

describe('clean command', () => {
  const mockCwd = '/test/project';
  const mockAiDocsPath = path.join(mockCwd, 'ai-docs');
  const mockContextPath = path.join(mockAiDocsPath, 'context', 'active-context.md');


  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should clean ai-docs directory and create new active-context.md', async () => {

    fsMock.pathExists.mockResolvedValue(true);
    fsMock.remove.mockResolvedValue(undefined);
    fsMock.ensureDir.mockResolvedValue(undefined);
    fsMock.writeFile.mockResolvedValue(undefined);

    await cleanCommand.parseAsync(['clean']);

    expect(fsMock.remove).toHaveBeenCalledWith(mockAiDocsPath);
    expect(fsMock.ensureDir).toHaveBeenCalledWith(path.join(mockAiDocsPath, 'context'));
    expect(fsMock.writeFile).toHaveBeenCalledWith(
      mockContextPath,
      expect.stringContaining('# Active Context')
    );
    expect(logger.success).toHaveBeenCalledWith('Project cleaned successfully!');
  });


  

  it('should handle missing ai-docs directory', async () => {
    // Mock fs-extra methods
    (fs.pathExists as any).mockResolvedValue(false);

    // Execute the command and expect it to throw
    await expect(cleanCommand.parseAsync(['clean'])).rejects.toThrow();

    // Verify error logging
    expect(logger.error).toHaveBeenCalledWith(
      'ai-docs directory not found. Run "prompture init" first.'
    );
  });




  it('should handle directory removal errors', async () => {
    // Mock fs-extra methods
    (fs.pathExists as any).mockResolvedValue(true);
    (fs.remove as any).mockRejectedValue(new Error('Remove error'));

    // Execute the command and expect it to throw
    await expect(cleanCommand.parseAsync(['clean'])).rejects.toThrow();

    // Verify error logging
    expect(logger.error).toHaveBeenCalledWith("Failed to clean documentation:", expect.any(Error));
  });
}); 