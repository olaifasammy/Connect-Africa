---
name: bounded-context-generator
description: Generates scaffolding for new Bounded Contexts. Use when creating a new module to ensure compliance with the Connect Africa Folder Architecture.
---

# Bounded Context Generator

## Overview

This skill automates the creation of a new Bounded Context, ensuring the resulting structure strictly adheres to the standards defined in `EngineV2/04-FolderArchitecture.md`. It guarantees that all mandatory components—Domain, Application, Infrastructure, and Tests—are correctly scaffolded with proper dependency injection.

## Usage

When creating a new bounded context, trigger this skill to:
1. Generate the mandatory directory structure.
2. Scaffold the required files within each layer.
3. Apply standard project conventions (naming, dependency injection patterns).

## Workflow

### 1. Identify Context Name
Decide on a unique, descriptive name for the new bounded context (e.g., `inventory`, `billing`).

### 2. Trigger Generator
Run the generator script with the context name:
`node scripts/generate_context.cjs <context-name>`

### 3. Verify
Check the generated directory structure against the checklist in the [Architectural Compliance Check](/architectural-compliance-check/SKILL.md) skill.

## Resources
- [04-FolderArchitecture.md](/Docs/EngineV2/04-FolderArchitecture.md)
