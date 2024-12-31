# EVIL (**E**nhanced **V**erification and **I**mprovement for accessibi**L**ity) Detector

A security tool for detecting potentially malicious accessibility implementations that could be used to create hidden content or functionality accessible only to specific user groups.

## Overview

This tool helps identify accessibility implementations that might be exploited for malicious purposes, such as:
- Elements hidden from visual users but accessible via screen readers
- Interactive elements accessible only through keyboard
- Misleading or deceptive content differences between visual and assistive technology presentations

## Rules

### evil-a-keyboard-only
Detects elements hidden from mouse users while remaining keyboard accessible.

**Targets:**
- Links with onclick handlers
- Buttons with onclick handlers
- Input elements with onclick handlers
- Custom button roles with onclick handlers

**Detection:**
- Checks for pointer-events: none
- Verifies visual invisibility (display: none, visibility: hidden)
- Identifies offscreen positioning
- Confirms keyboard accessibility (tabindex ≥ 0)

### evil-b-hidden-field
Identifies form fields hidden from visual users while remaining accessible to screen readers.

**Targets:**
- Input fields
- Custom textbox roles
- Contenteditable elements
- Text input areas

**Detection:**
- Verifies visual hiding techniques
- Checks form field accessibility
- Analyzes potential sensitive field attributes

### evil-c-hidden-describedby
Detects hidden elements referenced by aria-describedby that could contain malicious content.

**Detection:**
- Validates visibility of referenced elements
- Analyzes content in hidden descriptions
- Checks for suspicious content patterns

### evil-d-offscreen
Identifies interactive elements positioned far outside the viewport.

**Detection:**
- Analyzes absolute/fixed positioning
- Checks for extreme coordinate values
- Verifies element interactivity

### evil-e-aria-label-mismatch
Finds significant differences between visible text and aria-label content.

**Detection:**
- Compares visible text with aria-label content
- Calculates text similarity scores
- Flags suspicious discrepancies

### evil-f-transparent-overlay
Detects transparent interactive overlays that could capture user interactions.

**Detection:**
- Checks opacity and transparency
- Verifies overlay positioning
- Analyzes interaction capabilities

### evil-g-small-font
Identifies text with extremely small font sizes used to hide content.

**Detection:**
- Measures font sizes
- Checks for content visibility
- Analyzes text content significance

## Installation

```bash
git clone https://github.com/potapuff/evil-detector.git
npm install 
```

## Usage

### Command Line Interface
```bash
# Analyze a site
node bin/cli.js -u https://example.com/ -v
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new detection rule'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create Pull Request

## License

MIT License - see LICENSE file for details.

## Security

For security issues, please email security@example.com instead of using the issue tracker.

## Citation

If you use this tool in your research, please cite:
```
@article{evil2025,
  title={},
  author={Kuzikov Borys, Shovkoplias Oksana, Tytov Pavlo, Lavryk Tetiana, Koval Vitlyi},
  journal={Detection and Prevention of Accessibility Cloaking Attacks},
  year={2025}
}
```