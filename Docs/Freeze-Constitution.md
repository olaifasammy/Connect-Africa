Connect Africa — Engine V2 Master Freeze Constitution

Purpose

The objective of the Freeze Audit is not to redesign, refactor, optimize, or modernize a bounded context.

Its sole purpose is to determine whether an existing bounded context is production-ready based on objective evidence.

A bounded context is considered FREEZE READY when every public application capability that currently exists is completely exposed, secured, validated, registered, and functional.

---

Fundamental Rule

Never invent work.

Audit only what actually exists inside the codebase.

Never recommend implementing new business logic simply because it "would be nice."

Never assume missing features.

Never redesign the architecture.

---

Evidence First

Every conclusion MUST be supported by evidence.

Every blocker MUST include:

- File
- Class
- Method
- Handler
- Route
- Reason
- Evidence

Never speculate.

---

Handler Classification

Every handler discovered must be classified.

Category A — Public Application Capability

Handlers representing real business capabilities intended to be accessible through an application interface.

Examples:

- CreateEntity
- UpdateEntity
- DeleteEntity
- Search
- Login
- Register
- UpdateSettings
- PublishArticle
- RestoreArticle

Category A handlers MUST be audited for exposure.

---

Category B — Internal Infrastructure

Handlers intended for internal execution only.

Examples:

- Event handlers
- Domain event consumers
- Integration handlers
- Cache refresh
- Audit listeners
- Projection rebuilders
- Outbox processors

These DO NOT require HTTP exposure.

They NEVER block freeze.

---

Category C — Wrong Bounded Context

Handlers physically located inside a bounded context but belonging to another domain.

Examples:

- Bookmark logic inside Auth
- Reading History inside Auth
- Avatar upload inside Auth if Media owns avatars

Category C handlers:

- MUST be documented
- MUST NOT block freeze
- MUST be recorded as Technical Debt

---

Freeze Requirements

A bounded context is Freeze Ready only if every Category A capability satisfies all of the following.

1. Inventory Complete

Every:

- Command
- Query
- Handler
- Controller
- Route

must be identified.

---

2. Capability Mapping

Every Category A handler must map to

Route

↓

Controller

↓

Handler

↓

Application

↓

Domain

No orphan handlers.

---

3. HTTP Exposure

Every Category A handler intended for external use must be reachable.

No hidden handlers.

No unreachable endpoints.

No dead public capabilities.

---

4. Validation

Every write endpoint must perform validation.

Examples:

- Zod
- DTO Validation
- Schema Validation

Validation must exist before business logic executes.

---

5. Authentication

Protected endpoints must require authentication.

Anonymous endpoints must be intentionally anonymous.

---

6. Authorization

Protected endpoints must enforce permissions.

Examples:

- ENTITY_READ
- ENTITY_WRITE
- USER_ADMIN
- AUDIT_READ

Missing RBAC is a Freeze Blocker.

---

7. Dependency Injection

Every controller

Every handler

Every repository

must be correctly registered.

No missing bindings.

---

8. Build

The module must compile successfully.

---

9. Dead Code

Identify:

- unreachable handlers
- unused controllers
- unused routes

Dead code does not automatically block freeze.

Document it separately.

---

10. Hidden Capabilities

If a Category A handler exists but is not exposed,

Freeze = NOT READY.

---

What DOES NOT Block Freeze

These are Technical Debt only.

They do NOT block freeze.

Examples:

- God Controller
- Large Controller
- Large Route File
- Long Methods
- SRP violations
- Code duplication
- Naming inconsistencies
- Refactoring opportunities
- Folder organization
- Better abstractions
- CQRS purity
- Clean Architecture improvements
- Event-driven recommendations
- Microservice recommendations

These must appear under

Technical Debt

NOT

Freeze Blockers

---

Architectural Opinions

Never fail a bounded context because:

"This should be event-driven."

"This should be asynchronous."

"This belongs in another service."

"This endpoint should not exist."

"This should use Kafka."

"This should use Domain Events."

Unless documented by the project architecture,

these are opinions,

NOT blockers.

---

Freeze Blockers

Only objective issues block freeze.

Examples:

Missing Category A handler exposure

Missing controller mapping

Missing routes

Missing validation

Missing RBAC

Missing authentication

Broken DI

Broken compilation

Broken route registration

Broken controller delegation

Broken handler wiring

Missing repository binding

Broken application flow

---

Required Audit Output

Every audit MUST produce:

1. Context Summary

---

2. Complete Inventory

Commands

Queries

Handlers

Controllers

Routes

---

3. Handler Classification

Category A

Category B

Category C

---

4. Endpoint Inventory

Method

Route

Permission

Validation

Controller

Handler

---

5. Route Mapping

Route

↓

Controller

↓

Handler

---

6. Security Verification

Authentication

Authorization

Permissions

---

7. Validation Verification

Schemas

DTOs

Validators

---

8. Dependency Injection Verification

Controller bindings

Handler bindings

Repository bindings

---

9. Dead Code Report

---

10. Hidden Capability Report

---

11. Technical Debt

Only non-blocking observations.

---

12. Freeze Decision

Exactly one of:

STATUS: FREEZE READY

or

STATUS: NOT FREEZE READY

If NOT READY:

List ONLY objective blockers.

Never include architectural opinions as blockers.

---

Ranking Rule

When recommending the next bounded context,

rank ONLY by:

1. Existing implementation maturity

2. Remaining objective blockers

3. Amount of interface work remaining

Never prioritize based on personal preference.

Never invent missing functionality.

---

Final Principle

The auditor is an investigator, not a designer.

Its responsibility is to verify whether the implementation satisfies production requirements.

It must not redesign the system.

It must distinguish clearly between:

- Objective production blockers
- Technical debt
- Architectural opinions

Only objective production blockers may prevent a bounded context from being declared FREEZE READY.