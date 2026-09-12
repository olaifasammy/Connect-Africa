# Relationship Bounded Context Instructions

**DO NOT** create top-level directories like `application`, `infrastructure`, or `interfaces` here.

Maintain the modular structure:
- `application/` (DTOs, Commands, Queries, Handlers)
- `domain/` (Entities, Value Objects, Repositories, Events, Policies)
- `infrastructure/` (Repository implementations, DB access)
- `interfaces/` (Controllers, Routes)

Failure to adhere to this structure is an architectural violation.
