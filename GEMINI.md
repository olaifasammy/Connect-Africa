# GEMINI.md

# Connect Africa Engineering Constitution

**Version:** 2.0

This document is the highest engineering authority for every Gemini CLI session.

Every task, edit, refactor, implementation, audit, bug fix, optimization, review, migration, and code generation MUST follow this document.

Failure to follow these rules is considered an invalid implementation.

---

# FIRST ACTION (MANDATORY)

Before performing ANY task, ALWAYS read the following documents completely.

```
EngineV2/

01-PlatformArchitecture.md
02-DomainArchitecture.md
03-BoundedContexts.md
04-FolderArchitecture.md
05-DependencyRules.md
06-CodingStandards.md
07-DOD.md
08-ProjectConventions.md
09-DevelopmentWorkflow.md
10-Roadmap.md
```

If any of these files cannot be read,

STOP.

Never continue with assumptions.

---

# Architecture Is Law

EngineV2 is the single source of truth.

Never invent architecture.

Never bypass architecture.

Never replace architecture.

Never simplify architecture.

If implementation conflicts with EngineV2,

EngineV2 wins.

---

# Enterprise First

This repository is NOT

- MVP
- Prototype
- Demo
- Hackathon project
- Tutorial
- Boilerplate

Everything must be written as production-grade enterprise software.

---

# Never Generate Placeholders

Forbidden:

```
TODO
Coming Soon
Placeholder
Dummy
Stub
Mock Implementation
Fake Service
Temporary Fix
Will Implement Later
```

Never generate incomplete implementations.

If implementation cannot be completed,

STOP

Explain exactly what dependency is missing.

---

# Never Delete Working Code

This is one of the highest priority rules.

Never delete

- Services
- Controllers
- Repositories
- Validators
- Events
- DTOs
- Routes
- Tests
- Utilities

unless ALL of the following are true:

1. the implementation is genuinely obsolete

AND

2. a better implementation replaces it immediately

AND

3. no functionality is lost

AND

4. all callers are updated

AND

5. no specification is violated

If unsure,

DO NOT DELETE.

Improve instead.

---

# Improve Before Replace

If a service already exists

DO NOT create another one.

Instead

- improve it
- extend it
- optimize it
- refactor internally

without changing public behavior.

Avoid duplicate implementations.

---

# Preserve Existing Business Logic

Never remove business rules.

Never simplify workflows.

Never remove validation.

Never remove permissions.

Never remove audit logging.

Never remove event publishing.

Never remove metrics.

---

# Refactoring Rules

Refactoring MUST

preserve

- behavior
- APIs
- validations
- permissions
- tests
- events
- metrics

Refactoring is allowed only to improve

- readability
- maintainability
- modularity
- architecture
- performance

Never refactor merely for preference.

---

# Prefer Green Diffs

The repository history should mostly show

Green

instead of

Red.

Prefer

- moving
- improving
- extracting
- reorganizing

instead of deleting.

Large red deletions require explicit justification.

---

# Before Removing Anything

Produce a Removal Report.

Example

```
Reason

What is being removed

Why it is obsolete

Replacement

Files affected

Specification reference

Risk assessment

Migration impact
```

Wait for approval.

Never remove first.

---

# No Silent Changes

Never silently

rename

move

merge

split

delete

public interfaces.

Always explain why.

---

# Every TODO Is Critical

If a TODO exists,

highlight it.

Produce

```
Location

Reason

Priority

Dependency

Suggested implementation
```

Never ignore TODOs.

Never hide TODOs.

---

# No Dead Code

Remove dead code ONLY IF

verified unused

verified unreferenced

verified replaced

Otherwise leave it.

---

# Architecture Over Convenience

Never introduce shortcuts.

Never collapse layers.

Never bypass repositories.

Never bypass services.

Never place business logic inside controllers.

Never place persistence inside controllers.

---

# Follow Clean Architecture

Dependency direction is mandatory.

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Never reverse this dependency.

---

# DDD Rules

Business logic belongs inside Domain.

Application orchestrates.

Infrastructure implements.

Controllers coordinate.

Repositories persist.

Validators validate.

Events notify.

---

# Dependency Injection

Never instantiate dependencies directly inside business logic.

Use dependency injection.

Factories belong inside bootstrap.

---

# Single Responsibility

One class

One responsibility.

Avoid God classes.

Avoid God services.

---

# Reuse Before Creating

Before creating

Controller

Repository

Validator

DTO

Service

Search the repository.

If one exists,

reuse it.

---

# No Duplicate Logic

Never copy code.

Extract shared behavior.

---

# Naming

Names must describe intent.

Avoid abbreviations.

Avoid vague names.

---

# Tests

Never reduce test coverage.

Never delete tests without replacement.

Every feature should have

Unit tests

Integration tests

where applicable.

---

# Audit Logging

Every write operation should be auditable.

Never remove audit logging.

---

# Event System

Domain events are mandatory.

Never bypass events.

Never remove event publishing.

---

# Validation

Validation belongs before business execution.

Never bypass validators.

---

# API Rules

Controllers

↓

Services

↓

Repositories

Never

Controller

↓

Repository

directly.

---

# Performance

Optimize only after correctness.

Never sacrifice maintainability.

---

# Security

Never weaken

RBAC

Authentication

Authorization

Permissions

Validation

Rate Limiting

Audit

Encryption

---

# Documentation

When architecture changes,

update documentation immediately.

Never allow documentation drift.

---

# Folder Structure

Always follow

EngineV2/04-FolderArchitecture.md

Do not invent folders.

Do not invent module layouts.

---

# Completion

A task is complete ONLY IF

Implementation finished

Build succeeds

Lint succeeds

Tests pass

Architecture preserved

Documentation updated

DOD satisfied

---

# Before Every Response

Internally verify

✓ Architecture respected

✓ No duplicated code

✓ No unnecessary deletion

✓ No placeholder

✓ No stub

✓ No broken dependency

✓ No architecture violation

✓ Existing services reused

✓ Tests preserved

✓ Documentation updated if needed

---

# If Unsure

Never guess.

Search the repository.

Read EngineV2 again.

Then decide.

---

# Final Principle

The objective is NOT merely to make the code work.

The objective is to build one of the cleanest, most maintainable, enterprise-grade software platforms possible.

Every change must leave the repository in a better state than it was found.

Quality is mandatory.

Architecture is mandatory.

Maintainability is mandatory.

Production readiness is mandatory.


## Repository Structure Authority

The project structure is defined exclusively by:

EngineV2/
- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md
- 03-BoundedContexts.md
- 04-FolderArchitecture.md
- 05-DependencyRules.md
- 06-CodingStandards.md
- 07-DOD.md
- 08-DevelopmentWorkflow.md
- 09-Roadmap.md
- 10-Roadmap.md

Never invent a new folder structure.

Never reorganize folders unless explicitly instructed.

Never create parallel architectures.

Never create duplicate modules.

Every new file must belong to an existing bounded context.

Every new file must conform to FolderArchitecture.md.

If an implementation does not fit the architecture, stop and report the conflict instead of inventing a solution.

## Completion Rule

An implementation is NEVER complete if the response contains any of the following:

- Remaining Work
- Future Work
- Next Steps
- Recommended Backlog
- Could Be Improved
- Should Implement
- Missing Feature
- Not Yet Implemented
- Partial Implementation
- Placeholder
- Stub
- TODO

The implementation must continue automatically until every requirement for the current ticket or bounded context is fully implemented.

The model must not stop after identifying deficiencies.

It must resolve them unless an external dependency (human approval, unavailable credential, unavailable infrastructure, or legal restriction) makes completion impossible.

The default behavior is IMPLEMENT, not REPORT.