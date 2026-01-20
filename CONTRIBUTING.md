# Contributing to Plagiarism Split Checker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Quick Start for Contributors

### Prerequisites
- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Setup Development Environment

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/plagiarism-split-checker.git
cd plagiarism-split-checker

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Run tests
npm test
```

## 📝 Development Workflow

### Before Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Ensure tests pass:**
   ```bash
   npm test
   ```

### Making Changes

1. **Write your code** following the existing code style
2. **Add tests** for new features
3. **Update documentation** if needed
4. **Test thoroughly** in both light and dark modes

### Code Style Guidelines

- Use functional components with Hooks
- Follow existing naming conventions
- Add JSDoc comments for utility functions
- Keep components focused and single-purpose
- Use meaningful variable names

### Testing Guidelines

- Write unit tests for all utility functions
- Ensure tests pass before committing
- Aim for high test coverage
- Test edge cases and error conditions

### Committing Changes

```bash
# 1. Stage your changes
git add .

# 2. Commit with a descriptive message
git commit -m "feat: add new feature description"

# 3. Push to your fork
git push origin feature/your-feature-name

# 4. Create a Pull Request on GitHub
```

### Commit Message Format

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add export to CSV functionality
fix: correct weighted average calculation
docs: update installation instructions
test: add tests for shareUtils
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Test Specific File
```bash
npm test -- fileProcessing.test.js
```

## 🎨 UI/UX Guidelines

- Maintain consistency with existing design
- Support both light and dark modes
- Ensure responsive design (mobile, tablet, desktop)
- Use emojis sparingly and meaningfully
- Follow the purple gradient theme

## 📦 Adding Dependencies

Before adding new dependencies:
1. Check if the functionality can be achieved with existing dependencies
2. Verify the package is actively maintained
3. Consider bundle size impact
4. Document why the dependency is needed

## 🐛 Reporting Bugs

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information
- Console errors if any

## 💡 Suggesting Features

For feature suggestions:
- Describe the use case clearly
- Explain how it benefits users
- Consider implementation complexity
- Check if similar feature requests exist

## 📂 Project Structure

Key directories and their purposes:

```
src/
├── components/     # React UI components
├── contexts/       # React Context providers
├── utils/          # Business logic and utilities
└── App.js         # Main application entry

.github/
├── workflows/      # CI/CD automation
└── copilot-instructions.md  # AI coding guidelines
```

## 🔍 Code Review Process

1. **Automated Checks**: All PRs must pass automated tests
2. **Code Review**: At least one approval required
3. **Documentation**: Update docs for significant changes
4. **Testing**: New features must include tests

## 🎯 Priority Areas for Contribution

Current priorities:
- [ ] Backend API integration for automatic checking
- [ ] Additional export formats (CSV, JSON)
- [ ] More plagiarism checker integrations
- [ ] Internationalization (i18n)
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 📞 Getting Help

- Open an issue for bugs or questions
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!
