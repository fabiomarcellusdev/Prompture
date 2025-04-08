export const CLEAN_COMMAND_SUCCESS_MESSAGES = {
    CLEAN_UP_SUCCESS: 'Cleanup completed successfully!',
    SKIPPED_ARCHIVING_ACTIVE_CONTEXT: 'Skipping archiving of active context',
    archivedContextTo: (archiveName: string) => `Archived old context to ${archiveName}`,
    SKIPPED_ORGANIZING_DOCS: 'Skipping documentation organization',
}

export const CLEAN_COMMAND_FAILURE_MESSAGES = {
    AI_DOCS_DIR_NOT_FOUND: 'ai-docs directory not found. Run "prompture init" first.',
    FAILED_TO_CLEAN_UP: 'Failed to clean documentation:',
    CONTEXT_DIR_NOT_FOUND: 'context directory not found, skipping archiving',
    SUMMARIES_DIR_NOT_FOUND: 'summaries directory not found, skipping archiving',
    TEMP_FILES_DIR_NOT_FOUND: 'temp-files directory not found, skipping cleanup',
    DOCS_DIR_NOT_FOUND: 'docs directory not found, skipping organization',
}
