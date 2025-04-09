# Prompture CLI API Documentation

## Commands

### `prompture init`

Initialize a new AI-assisted project.

```bash
prompture init [options]
```

#### Options:
- `-d, --dir <directory>`: Project directory (default: ".")

#### Example:
```bash
prompture init -d my-project
```

### `prompture context`

Update AI context files with current task information.

```bash
prompture context [options]
```

#### Options:
- `-t, --task <task>`: Current task description

#### Example:
```bash
prompture context --task "Implementing user authentication"
```

### `prompture ai-docs`

Generate AI documentation templates.

```bash
prompture ai-docs [options]
```

#### Options:
- `-t, --type <type>`: Document type (PRD, SRS, TECHNICAL, etc.)

#### Example:
```bash
prompture ai-docs --type PRD
```

## Project Structure

When you initialize a new project, the following structure is created:

```
├── src/               # Application code
├── utils/             # Helpers
└── ai-docs/           # AI documentation templates
```

## Configuration

The CLI tool uses the following configuration files:

- `package.json`: Project configuration
- `ai-docs/*.md`: Various documentation templates

## Error Handling

The CLI tool provides clear error messages and exits with appropriate status codes:

- `0`: Success
- `1`: General error
- `2`: Invalid command or option
- `3`: File system error 