# Context Dependency Matrix

This matrix evaluates compliance with the architectural rule that all inter-module dependencies MUST pass exclusively through approved `public` interfaces (`@modules/<module>/public`).

Following the architectural hardening of all bounded contexts, all inter-module dependencies have been refactored to utilize these contracts.

| Source Module | Target Module | Dependency Path | Compliant? |
| :--- | :--- | :--- | :--- |
| `ai` | `auth` | `public` | ✅ Yes |
| `article` | `graph` | `public` | ✅ Yes |
| `article` | `ontology` | `public` | ✅ Yes |
| `media` | `ai` | `public` | ✅ Yes |
| `search` | `graph` | `public` | ✅ Yes |
| `search` | `ontology` | `public` | ✅ Yes |
| `source` | `graph` | `public` | ✅ Yes |
| `bootstrap` | `*` | `*` (DI Orchestration) | ⚠️ Special Case |

## Architectural Analysis

The `EngineV2` architecture mandates that inter-module dependencies must occur solely through `public` interfaces.

The Connect Africa backend codebase is now fully compliant with this mandate. Every cross-context import has been verified to target `@modules/<module>/public`.

The only exception remains the `bootstrap` module. As the system's Dependency Injection (DI) orchestrator, it requires visibility into the internal implementations of all modules to correctly wire the application container. This remains the authorized special case for architectural integrity.
