# 🧩 Prompture

A CLI tool for efficient AI-assisted development. Prompture helps you maintain context and documentation while working with AI assistants.

## Features

- 🚀 Initialize new AI-assisted projects with proper structure
- 📝 Generate AI documentation templates
- 🔄 Manage AI context files
- 🎯 Track development tasks
- 📚 Maintain project documentation
- 🔒 Manage .gitignore entries for AI-related files
- 📋 Create and manage AI session summaries

## Installation

```bash
npm install -g prompture
```

## Usage

### Initialize a new project

```bash
prompture init
```

This will create a new project with:
- Standard directory structure
- AI documentation templates
- AI context management files

### Generate AI documentation

```bash
prompture docs --type <type>
```

Available document types:
- Root level:
  - `START-HERE.md` - Getting started guide
  - `GLOSSARY.md` - Project glossary
- Technical:
  - `SYSTEM-ARCHITECTURE.md` - System architecture documentation
  - `TECHNICAL.md` - Technical documentation
  - `CLEAN-AI-CODE.md` - AI coding guidelines
  - `fixes/` - Directory for tracking fixes
- Requirements:
  - `PRD.md` - Product Requirements Document
  - `SRS.md` - Software Requirements Specification
  - `TASKS.md` - Task Breakdown
- Context:
  - `CONTEXT.md` - Project context
  - `active-context.md` - Current AI session context
  - `summaries/` - AI session summaries

### Update AI context

```bash
prompture context --task "Your current task description"
```

### Manage .gitignore entries

```bash
prompture gitignore
```

This will:
- Create a .gitignore file if it doesn't exist
- Add AI-related entries if they're missing
- Preserve existing entries

### Manage AI session summaries

```bash
# Create a new summary
prompture summary --create "Session about authentication implementation"
```

This will:
- Create a new summary in the appropriate weekly folder under `ai-docs/context/summaries/recent-summaries/`
- Append to an existing day's summary if one exists
- Use the current week's folder (MM-DD-YYYY to MM-DD-YYYY)
- Automatically archive summaries older than 2 weeks to `ai-docs/context/summaries/archived-summaries/`

## Project Structure

```
project/
├── ai-docs/
│   ├── START-HERE.md
│   ├── GLOSSARY.md
│   ├── technical/
│   │   ├── SYSTEM-ARCHITECTURE.md
│   │   ├── TECHNICAL.md
│   │   ├── CLEAN-AI-CODE.md
│   │   └── fixes/
│   ├── requirements/
│   │   ├── PRD.md
│   │   ├── SRS.md
│   │   └── TASKS.md
│   └── context/
│       ├── CONTEXT.md
│       ├── active-context.md
│       └── summaries/
│           ├── README.md
│           ├── recent-summaries/
│           │   └── MM-DD-YYYY to MM-DD-YYYY/
│           │       └── MM-DD-YYYY.md
│           └── archived-summaries/
│               └── MM-DD-YYYY to MM-DD-YYYY/
│                   └── MM-DD-YYYY.md
├── README.md
├── CHANGELOG.md
└── AI-PROMPTS.md
```

## Documentation

The tool generates and maintains several key documentation files:

- `PRD.md` - Product Requirements Document
- `SRS.md` - Software Requirements Specification
- `TECHNICAL.md` - Technical Documentation
- `TASKS.md` - Task Breakdown
- `CONTEXT.md` - Project Context
- `GLOSSARY.md` - Project Glossary
- `active-context.md` - Current AI Session Context
- `summaries/*.md` - AI Session Summaries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - feel free to use, improve, and contribute.

