# Archived AI Session Summaries

This directory contains summaries of past AI-assisted development sessions. These summaries help maintain context and track progress over time.

## Purpose
- Maintain historical context of AI-assisted development
- Track project decisions and their rationale
- Document token usage patterns
- Reference important documentation sections
- Track open items and next steps

## File Naming
Summaries should be added to a file using this naming format:
```
MM-DD-YYYY.md
```
Example: `04-05-2025.md`

## Summary Format
Each summary should include:

1. **Session Overview**
   - Brief description of the session's focus
   - Duration and participants

2. **Major Decisions**
   - Key technical or architectural decisions
   - Rationale for decisions

3. **Code/Features Created**
   - New features implemented
   - Code structure changes
   - Database schema updates

4. **Open Items**
   - Unresolved issues
   - Known limitations
   - Future considerations

5. **Next Steps**
   - Immediate action items
   - Short-term goals
   - Long-term plans

6. **Token Usage**
   - Session start/end token counts
   - Peak usage
   - Efficiency notes

7. **Context References**
   - Relevant documentation sections
   - Related code files
   - External resources

## Example
See `2024-04-05_example-summary.md` for a complete example. 

# AI Session Summaries

This directory contains all AI session summaries organized by recency and date.

## Directory Structure

```
summaries/
├── recent-summaries/           # Last 2 weeks of summaries
│   └── MM-DD-YYYY to MM-DD-YYYY/
│       └── MM-DD-YYYY.md
└── archived-summaries/         # Summaries older than 2 weeks
    └── MM-DD-YYYY to MM-DD-YYYY/
        └── MM-DD-YYYY.md
```

## Recent Summaries

The `recent-summaries` folder contains summaries from the last 2 weeks. These are your most recent AI sessions and are easily accessible for quick reference.

## Archived Summaries

The `archived-summaries` folder contains summaries older than 2 weeks. These are automatically moved from `recent-summaries` when you run the `prompture clean` command.

## Weekly Organization

Summaries are organized into weekly folders with the format:
- Folder name: `MM-DD-YYYY to MM-DD-YYYY`
- Summary file: `MM-DD-YYYY.md`

## Creating Summaries

To create a new summary, use:
```bash
prompture summary --create "Description of the session"
```

This will:
1. Create a new summary in the appropriate weekly folder
2. Append to an existing day's summary if one exists
3. Use the current week's folder in `recent-summaries`

## Cleaning and Archiving

The `prompture clean` command will:
1. Move summaries older than 2 weeks to `archived-summaries`
2. Maintain the weekly folder structure
3. Keep your recent summaries easily accessible 