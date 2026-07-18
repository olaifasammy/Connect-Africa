---
name: architectural-compliance-check
description: Enforces Connect Africa Engineering Constitution. Use before implementation and during code review to validate adherence to bounded context, dependency flow, and coding standards.
---

# Architectural Compliance Check

## Overview

This skill ensures that all changes to the codebase strictly adhere to the Connect Africa Engineering Constitution and the rules defined in `EngineV2/`. It provides a checklist and automated validation steps for ensuring architectural compliance.

## Compliance Checklist

Every implementation or change must be validated against the following:

### 1. Bounded Context & Architecture
- [ ] Does the change belong to a defined bounded context?
- [ ] Does the change bypass context boundaries (e.g., direct DB/Repository access)?
- [ ] Does the change adhere to the dependency flow: `Interfaces` → `Application` → `Domain` → `Infrastructure`?

### 2. Dependency Rules
- [ ] Are all dependencies injected?
- [ ] Are there any forbidden imports (e.g., `Domain` → `Express`, `Controller` → `Repository`)?
- [ ] Have circular dependencies been introduced?

### 3. Implementation Standards
- [ ] Are DTOs used for all API communication?
- [ ] Is validation using Zod schemas present?
- [ ] Is structured logging used, and are all write operations auditable?
- [ ] Are domain events published correctly?

## Usage

When starting a new task or reviewing code, trigger this skill to:
1. Verify architectural boundaries for the proposed change.
2. Check for mandatory files (DTOs, Validators, Events, Tests) for the target context.
3. Perform a dependency check on the modified files.

## References

For detailed rules, always reference the `EngineV2/` directory:
- [03-BoundedContexts.md](/Docs/EngineV2/03-BoundedContexts.md)
- [05-DependencyRules.md](/Docs/EngineV2/05-DependencyRules.md)
- [06-CodingStandards.md](/Docs/EngineV2/06-CodingStandards.md)
