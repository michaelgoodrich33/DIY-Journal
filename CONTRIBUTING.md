# Commit Guidelines

This project follows conventional commits. Here are the types:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or tooling

## Example Commits

```
feat: add gratitude module to journal
fix: resolve PDF page break issue
docs: update architecture guide
chore: add TypeScript configuration
```

## Pull Request Process

1. Update the README.md with any new features or changes
2. Update ARCHITECTURE.md if adding new modules or changing architecture
3. Ensure all types are correct (`npm run type-check`)
4. Format code (`npm run format`)
5. Test the application (`npm run dev`)

## Code Style

- Use TypeScript for all new code
- Use PascalCase for component names
- Use camelCase for functions and variables
- Use UPPER_SNAKE_CASE for constants
- Add JSDoc comments for public functions
- Keep functions small and focused

## Testing Requirements

- Core utilities should have unit tests
- New modules should be tested with sample generation
- API endpoints should handle error cases

## Questions?

Feel free to open an issue or discussion for any questions!
