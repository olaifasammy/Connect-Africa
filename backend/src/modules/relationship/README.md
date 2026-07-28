# Relationship Bounded Context

The Relationship bounded context is responsible for creating, managing, validating, versioning, and querying semantic relationships between entities within the Connect-Africa Knowledge Graph.

## Key Features
- Relationship Lifecycle Management
- Versioning and Evidence Tracking
- Business Rule Validation (Policies)
- Graph Consistency Maintenance

## Architecture
- **DDD:** Aggregate Root, Value Objects, Domain Policies.
- **Clean Architecture:** Domain and Application layers isolated from Infrastructure.
- **Infrastructure:** PostgreSQL for persistence.

## API Documentation
See `docs/api/openapi.yaml`.
