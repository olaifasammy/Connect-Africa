---
name: domain-event-orchestrator
description: Scaffolds mandatory Domain Events, publishers, and subscribers. Use whenever a new business event is required to ensure loose coupling and architectural compliance.
---

# Domain Event Orchestrator

## Overview

This skill automates the creation of Domain Events in accordance with `EngineV2/05-DependencyRules.md`. It ensures events follow the naming convention (`EntityCreatedEvent`) and scaffolds both the publisher within the service and the subscriber interface.

## Usage

When creating a new domain event, trigger this skill to:
1. Generate the event DTO with proper typing.
2. Scaffold the publisher logic within the owning Service.
3. Scaffold the subscriber interface for consuming modules.

## Workflow

### 1. Identify Event Details
Determine the name of the event (e.g., `ArticlePublished`) and the context that owns it.

### 2. Trigger Generator
Run the generator script with the event name and context:
`node scripts/generate_event.cjs <event-name> <context-name>`

### 3. Verify
Check the generated files against the mandatory event rules in `EngineV2/05-DependencyRules.md`.

## Resources
- [05-DependencyRules.md](/Docs/EngineV2/05-DependencyRules.md)
