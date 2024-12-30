# **E**nhanced **V**erification and **I**mprovement for accessibi**L**ity Accessibility Detector

A tool for detecting potentially malicious accessibility techniques that could be used to create hidden content accessible only to screen readers or keyboard users.

## Overview

This tool helps identify accessibility implementations that might be used maliciously to hide content from some users while keeping it accessible to others. It checks for:

- Elements hidden from mouse users but accessible via keyboard
- Form fields hidden from visual users but accessible to screen readers
- Other suspicious accessibility patterns

## Rules

### evil-base

Base rule that provides common functionality for detecting malicious accessibility techniques.

- Checks visibility status
- Analyzes ARIA attributes
- Evaluates styling patterns
- Detects sensitive content

### evil-a-keyboard-only

Detects elements that are hidden from mouse users while remaining keyboard accessible.

Targets:
- Links with onclick handlers
- Buttons with onclick handlers
- Input elements with onclick handlers
- Custom button roles with onclick handlers

### evil-b-hidden-field

Identifies form fields that are hidden from visual users while remaining accessible to screen readers.

Targets:
- Input fields
- Custom textbox roles
- Contenteditable elements

## Usage

### Command Line Interface

The tool can be run from the command line:

```bash
# Analyze a single file
evil-detector analyze path/to/file.html

# Analyze multiple files
evil-detector analyze path/to/*.html

# Run specific rule
evil-detector analyze --rule evil-a-keyboard-only path/to/file.html

# Output format options
evil-detector analyze --format json path/to/file.html
evil-detector analyze --format html path/to/file.html
```

### Programmatic Usage

```javascript
const { analyze, runRule } = require('evil-detector');

# Run all checks
const results = analyze('path/to/file.html');

# Run specific rule
const ruleResults = runRule('evil-a-keyboard-only', 'path/to/file.html');
```

## Configuration

Rules can be configured through JSON files in:
- `lib/rules/rules/` - Rule definitions
- `lib/rules/checks/` - Check implementations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

If you discover any security-related issues, please email security@example.com instead of using the issue tracker.
