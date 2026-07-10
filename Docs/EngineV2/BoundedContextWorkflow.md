# Skill: Bounded Context Implementation Workflow

This skill outlines the production-grade, checklist-driven workflow used for implementing bounded contexts within the Connect-Africa platform, ensuring strict adherence to `EngineV2` and `GEMINI.md`.

## Workflow Phases

### 1. Discovery & Alignment
- **Locate Documentation:** Identify the module's authoritative `BuildChecks/<Context>CV.md` checklist.
- **Audit Current State:** Map existing files against the checklist to identify gaps.
- **Plan Scope:** Define the implementation order based on the checklist.

### 2. Implementation Lifecycle (Iterative)
For each item in the checklist:

#### A. Domain Layer (The Core)
- **Entities/Value Objects:** Implement using strict DDD. Enforce invariants immediately.
- **Policies:** Implement business rules as decoupled `IRelationshipPolicy` implementations.
- **Services:** Implement domain services to orchestrate policies and entities.
- **Events:** Define and publish domain events using the project's event bus.

#### B. Application Layer (CQRS)
- **Commands/Queries:** Create strongly-typed DTOs and commands/queries extending `ICommand`/`IQuery`.
- **DTOs:** Define request/response DTOs with corresponding `Zod` validation schemas.
- **Services:** Implement application services to orchestrate domain services and infrastructure.

#### C. Infrastructure Layer (Implementation)
- **Repositories:** Implement concrete infrastructure repositories (e.g., `PostgresRepository`) against domain interfaces.
- **Persistence:** Create SQL migrations (`init` and `rollback`) with appropriate indexing for performance.

#### D. Interfaces (HTTP)
- **Controllers:** Handle requests, perform validation, and orchestrate application services.
- **Routes:** Define API routes with mandatory middleware (Auth, RBAC, Validation).

#### E. Observability & Security
- **Audit:** Integrate `AuditLogger` for write operations.
- **Logging:** Use project-standard structured logger.
- **Security:** Ensure RBAC and Input Validation are enforced.

### 3. Hardening & Verification
- **Production Readiness:** Replace all placeholders/stubs with functional, secure code.
- **Checklist Update:** Mark completed items in `RelationshipCV.md`.
- **Documentation:** Maintain `README.md` and ensure `OpenAPI` is consistent.

## Guiding Principles for Reuse
1. **API Preservation:** Never break public method signatures or DTO structures during refactoring.
2. **Reuse First:** Search for existing utilities (logging, events, shared domain logic) before creating new ones.
3. **Checklist Compliance:** If an item is not 100% compliant with DOD, it is not "Done".
4. **No Placeholders:** If a feature cannot be implemented to production standard, stop and explain the dependency/missing requirement.
