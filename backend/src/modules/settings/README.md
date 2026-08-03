# Settings Bounded Context

The Settings bounded context manages user-specific configurations, preferences, and system-wide settings within the Connect Africa platform.

## Architecture

This module follows the EngineV2 Domain-Driven Design (DDD) approach.

- **Domain Layer**: Contains Aggregates (`Settings`), Value Objects (`Theme`, `Locale`, etc.), Policies, and Validators.
- **Application Layer**: Contains Command Handlers and Query Handlers for managing settings.
- **Infrastructure Layer**: Implements persistence via `PostgresSettingsRepository` with Redis caching.
- **Interface Layer**: Exposes REST API endpoints for managing themes, languages, privacy, and notifications.

## Key Features

- User preference management (Theme, Language, Privacy).
- System-wide maintenance mode and registration control.
- Event-driven updates with domain events.
- Audit logging for all sensitive configuration changes.
