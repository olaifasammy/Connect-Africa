# Frontend Architecture

Version: 1.0

Status: Authoritative

---

# 1. Purpose

This document defines the architecture for the Connect-Africa frontend.

The frontend SHALL mirror the backend bounded contexts.

The frontend SHALL NOT be organized by technical layers.

Business domains are the primary organizational unit.

---

# 2. Architecture Principles

The frontend follows:

- Domain-Driven Design
- Feature-Based Architecture
- Clean Architecture (adapted for UI)
- SOLID
- Composition over inheritance
- Single Responsibility Principle

---

# 3. Bounded Contexts

Every backend bounded context SHALL have a corresponding frontend bounded context.

Required contexts:

- Identity
- Ontology
- Entity
- Relationship
- Article
- Source
- Media
- Search
- Analytics
- Settings
- Notification
- Admin

---

# 4. Folder Structure

Example:

src/

    app/

    shared/

    identity/

    ontology/

    entity/

    relationship/

    article/

    source/

    media/

    search/

    analytics/

    settings/

    admin/

Each context owns:

- pages
- components
- hooks
- api
- store
- types
- utils

---

# 5. Shared Folder

Shared contains ONLY reusable code.

Allowed:

- Button
- Modal
- Avatar
- Table
- Loading Spinner
- Toast
- Layout
- Theme
- HTTP Client
- Design System

Forbidden:

Business-specific UI.

---

# 6. Routing

Routes SHALL follow business domains.

Examples:

/login

/profile

/profile/settings

/entities

/entity/:id

/relationships

/articles

/search

/admin

---

# 7. API Layer

Every context owns its own API client.

Example:

entity/api/

article/api/

relationship/api/

Forbidden:

Single global api.ts containing every endpoint.

---

# 8. State Management

Every context owns its own state.

Example:

entity/store

article/store

identity/store

Shared state only for:

- Theme
- Authentication session
- Global notifications

---

# 9. Components

Components belong to their domain.

Entity components never live inside Article.

---

# 10. Hooks

Hooks belong to their owning context.

Example:

entity/hooks/useEntity.ts

article/hooks/useArticle.ts

---

# 11. DTOs

Frontend DTOs SHALL match backend contracts.

No frontend-specific mutations of backend responses.

---

# 12. Authorization

RBAC SHALL match backend permissions.

UI permissions SHALL NOT replace backend authorization.

---

# 13. Error Handling

Centralized.

Consistent.

Typed.

---

# 14. Testing

Every bounded context includes:

- Unit tests
- Component tests
- Integration tests

Critical workflows require E2E tests.

---

# 15. Performance

Required:

- Lazy loading
- Route splitting
- Memoization
- Virtualization
- Image optimization
- Request caching

---

# 16. Accessibility

Required:

- WCAG AA
- Keyboard navigation
- Screen readers
- Semantic HTML

---

# 17. Security

Required:

- CSP
- XSS prevention
- Sanitization
- Secure token handling
- No secrets in frontend

---

# 18. Folder Compliance

No technical-layer architecture.

Everything belongs to a bounded context.

---

# 19. Dependency Rules

Dependencies point inward.

Shared never imports business contexts.

Contexts never depend on each other directly.

Communication occurs through APIs.

---

# 20. Final Rule

The frontend SHALL mirror the backend architecture.

A developer should immediately know where any feature belongs.