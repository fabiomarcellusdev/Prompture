# 🧩 Prompture

A CLI tool for efficient AI-assisted development. Prompture helps you maintain context and documentation while working with AI assistants.

## Features

- 🚀 Initialize new AI-assisted projects with proper structure
- 📝 Generate AI documentation templates
- 🔄 Manage AI context files
- 🎯 Track development tasks
- 📚 Maintain project documentation
- 🔒 Manage .gitignore entries for AI-related files

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

Available document types:
- Root level:
  - `start-here.md` - Getting started guide
  - `glossary.md` - Project glossary
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
  - `active-task-context.md` - Current AI session context

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


## Project Structure

```
project/
├── ai-docs/
│   ├── start-here.md
│   ├── glossary.md
│   ├── technical/
│   │   ├── SYSTEM-ARCHITECTURE.md
│   │   ├── TECHNICAL.md
│   │   └── CLEAN-AI-CODE.md
│   ├── requirements/
│   │   ├── PRD.md
│   │   ├── SRS.md
│   │   └── TASKS.md
│   └── context/
│       ├── CONTEXT.md
│       └── active-task-context.md
├── README.md
├── CHANGELOG.md
└── ai-prompts.md
```

## Documentation

The tool generates and maintains several key documentation files:

- `PRD.md` - Product Requirements Document
- `SRS.md` - Software Requirements Specification
- `TECHNICAL.md` - Technical Documentation
- `TASKS.md` - Task Breakdown
- `CONTEXT.md` - Project Context
- `glossary.md` - Project Glossary
- `active-task-context.md` - Current AI Session Context

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - feel free to use, improve, and contribute.

