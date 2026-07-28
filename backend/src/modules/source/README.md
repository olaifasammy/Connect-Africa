# Source Bounded Context

The Source bounded context manages provenance, citations, and metadata for external information used within the platform.

## Architecture

- **Domain:** Contains Aggregate Roots (`Source`), Value Objects (`SourceId`, `Provenance`), and Domain Events.
- **Application:** Handles Commands (`CreateSourceCommand`) and Queries for source management.
- **Infrastructure:** Implements persistent storage (PostgreSQL) and external integration services (Graph integration).
- **Interfaces:** Exposes RESTful API endpoints.

## API Documentation

- `POST /api/sources`: Creates a new source. Requires authentication and RBAC (`source:create`).

## Compliance
- All write operations are audited.
- All operations are tracked via Prometheus metrics.
- Enforces strict input validation and rate limiting.
