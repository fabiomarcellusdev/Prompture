# Contributing to Prompture

Thank you for your interest in contributing to Prompture! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/your-username/prompture.git
   cd prompture
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link the package for local development:
   ```bash
   npm link
   ```

## Project Structure

```
prompture/
├── src/               # Source code
│   ├── commands/     # CLI commands
│   └── utils/        # Utility functions
├── templates/        # Project templates
├── docs/            # Documentation
└── tests/           # Test files
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Write meaningful commit messages
- Include tests for new features

### Adding New Commands

1. Create a new file in `src/commands/`
2. Export a function that implements the command
3. Add the command to `src/cli.ts`
4. Add tests in `tests/`
5. Update documentation in `docs/`

### Adding New Templates

1. Add new template files to `templates/`
2. Update the `init.ts` command to copy the new templates
3. Update documentation to reflect the new templates

## Testing

Run the test suite:
```bash
npm test
```

## Pull Request Process

1. Create a new branch for your feature/fix
2. Make your changes
3. Add/update tests
4. Update documentation
5. Submit a pull request

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a new release on GitHub
4. Publish to npm:
   ```bash
   npm publish
   ```

## Questions?

Feel free to open an issue or reach out to the maintainers. 