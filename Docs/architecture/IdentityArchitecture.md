# Identity Context Architecture

## Purpose
The Identity context manages authentication, authorization, user profiles, and security settings for the Connect-Africa platform. It is the central authority for user identity.

## Domain Architecture
The Identity context is structured according to Domain-Driven Design (DDD):
- **Domain Layer:** Contains core entities (`User`, `UserProfile`, `UserSettings`), value objects (`Email`, `UserId`, `PasswordHash`), and policies (`AdminPolicy`).
- **Application Layer:** Orchestrates business processes using Commands (`RegisterUserCommand`, `BanUserCommand`) and Queries (`GetProfileQuery`).
- **Infrastructure Layer:** Implements persistence (`PostgresUserRepository`, `PostgresUserProfileRepository`, `RedisSessionRepository`) and cross-cutting concerns (`BcryptPasswordHasher`, `JwtProvider`).
- **Interfaces Layer:** Exposes RESTful API endpoints via `AuthController`.

## Inter-Module Interactions
- **Events:** Publishes domain events (`UserCreatedEvent`, `UserBannedEvent`) that other modules (e.g., `audit`, `notification`) consume.
- **Dependencies:** Consumes `IAuditRepository` for security logging and `EventBus` for cross-context notification.

## Persistence Strategy
- **Users & Profiles:** Stored in PostgreSQL.
- **Sessions:** Cached/Persisted in Redis.
- **Security:** Bcrypt hashing for passwords, JWT for token-based authentication.
