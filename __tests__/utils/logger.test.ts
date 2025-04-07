import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '../../src/utils/logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  it('should log success messages', () => {
    const message = 'Test success message';
    logger.success(message);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should log error messages', () => {
    const message = 'Test error message';
    logger.error(message);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should log info messages', () => {
    const message = 'Test info message';
    logger.info(message);
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining(message));
  });

}); 