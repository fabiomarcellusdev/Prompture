# 🧩 Prompture

A CLI tool for efficient AI-assisted development. Prompture helps you maintain context and documentation while working with AI assistants.

## Features

- 🚀 Initialize new AI-assisted projects with proper structure
- 📝 Generate documentation templates (PRD, SRS, etc.)
- 🔄 Manage AI context files
- 🎯 Track development tasks
- 📚 Maintain project documentation

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
- Documentation templates
- AI context management files

### Update AI context

```bash
prompture context --task "Your current task description"
```

### Generate documentation

```bash
prompture docs --type PRD
```

Available document types:
- PRD (Product Requirements Document)
- SRS (Software Requirements Specification)
- TECHNICAL (Technical Documentation)
- TASKS (Task Breakdown)
- CONTEXT (Project Context)
- GLOSSARY (Project Glossary)

## Project Structure

```
├── src/               # Application code
├── services/          # External integrations
├── types/             # Global types
├── utils/             # Helpers
├── docs/              # Planning & architecture docs
├── .ai/               # AI memory/context helpers
└── scripts/           # Utility scripts
```

## Documentation

The tool generates and maintains several key documentation files:

- `PRD.md` - Product Requirements Document
- `SRS.md` - Software Requirements Specification
- `TECHNICAL.md` - Technical Documentation
- `TASKS.md` - Task Breakdown
- `CONTEXT.md` - Project Context
- `GLOSSARY.md` - Project Glossary
- `.ai/active-context.md` - Current AI Session Context

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - feel free to use, improve, and contribute.

