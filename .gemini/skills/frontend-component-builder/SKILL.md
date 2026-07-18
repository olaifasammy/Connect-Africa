---
name: frontend-component-builder
description: Builds React components from design images. Use to ensure generated code follows the frontend folder architecture, style system, and definition of done.
---

# Frontend Component Builder

## Overview

This skill transforms design images into production-grade React components. It enforces strict adherence to the Connect Africa frontend architecture, ensuring components are placed in the correct bounded context, utilize shared components, and meet all accessibility and performance standards.

## Usage

When building a new component or page from a design:
1. Upload the design image.
2. Trigger this skill to analyze the design and generate the component code.
3. Specify the target Bounded Context (e.g., `identity`, `article`, `admin`).
4. Validate the output against the Frontend Definition of Done.

## Workflow

### 1. Identify Context and Requirements
State the target Bounded Context and any specific functional requirements for the component.

### 2. Generate Component
Provide the design image and trigger the builder:
`node scripts/generate_component.cjs <component-name> <context-name>`

### 3. Verification Checklist
- [ ] Correct directory location based on `FrontendArchitecture.md`.
- [ ] Uses `shared/` components for buttons, modals, etc.
- [ ] Follows strict typing.
- [ ] Passes accessibility (ARIA, focus management).
- [ ] Handles loading, error, and empty states.

## Resources
- [FrontendArchitecture.md](/frontend/docs/FrontendArchitecture.md)
- [DOD.md](/frontend/docs/DOD.md)
- [DesignSystem.md](/frontend-component-builder/references/DesignSystem.md)
