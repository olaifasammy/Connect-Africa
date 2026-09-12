# Authentication Bounded Context

The Authentication Bounded Context manages user identity, authentication, authorization, and profile maintenance in the Connect-Africa platform.

## Architecture
- **Layering:** Follows strict Clean Architecture (Domain -> Application -> Infrastructure -> Interfaces).
- **Security:** Implements JWT-based authentication, RBAC, and secure cookie management.
- **Persistence:** Uses repository pattern abstraction for user identity and security tokens.

## API
- Endpoints are secured via Authentication and Authorization middleware where applicable.
- Input validation is strictly enforced using Zod schemas for all request DTOs.
- Includes support for registration, login, logout, token refresh, password reset, email verification, profile updates, and administrative user banning.

## Audit & Observability
- Security-critical operations are logged with user context and IP addresses.
- Domain events are published to the `EventBus` for system-wide awareness.
