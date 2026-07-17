# AI Bounded Context

## Architectural Overview
The AI Bounded Context provides an enterprise-grade gateway to various AI providers (e.g., Gemini) for research, content expansion, and Knowledge Graph enrichment, following Clean Architecture principles.

## Features
- **AI Gateway:** Provider-agnostic gateway for AI request orchestration.
- **Provider Management:** Support for multiple providers with priority-based selection and health monitoring.
- **Knowledge Gap Engine:** Automated detection of content gaps and editorial queue integration.
- **Prompt Library:** Versioned prompt management, auditing, and rollback support.
- **Observability:** Full integration with audit logs and metrics tracking.
- **Security:** RBAC-enforced endpoints, rate limiting, and prompt injection protection.

## API Endpoints
- `POST /api/v1/ai/process`: Submit an AI research or expansion request (Authenticated, Admin).
- `GET /api/v1/ai/providers/{id}/health`: Check provider health status.
- `POST /api/v1/ai/admin/knowledge-gaps`: Record a new knowledge gap.
- `POST /api/v1/ai/admin/crawl/start`: Start a new crawl job.
