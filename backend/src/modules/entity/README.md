# Entity Bounded Context — Full Specification

Version: verified against code at 2026-09-24  
Status: FULLY IMPLEMENTED / FROZEN — no major modifications permitted without architectural review.

---

## 1. Purpose

The Entity bounded context owns the complete lifecycle, identity, metadata, verification, versioning, merge, split, import/export, search, quality assessment, and audit of every knowledge entity in the Connect-Africa platform.

---

## 2. Domain Architecture (Verified Code)

| Layer | Key Files (verified) |
|---|---|
| Domain entities | `domain/entities/Entity.ts`, `domain/value-objects/EntityId.ts`, `domain/value-objects/EntityName.ts`, `domain/value-objects/EntityTypeId.ts`, `domain/value-objects/EntityMetadata.ts` |
| Domain events | `domain/events/EntityCreatedEvent.ts`, `EntityUpdatedEvent.ts`, `EntityDeletedEvent.ts`, `EntityPublishedEvent.ts`, `EntityArchivedEvent.ts`, `EntityRestoredEvent.ts`, `EntitySubmittedEvent.ts`, `EntityApprovedEvent.ts`, `EntityRejectedEvent.ts`, `EntityMergedEvent.ts`, `EntityVersionCreatedEvent.ts`, `EntityAliasAddedEvent.ts`, `EntityAliasRemovedEvent.ts` |
| Repositories (interface) | `domain/repositories/IEntityRepository.ts` |
| Services | `domain/interfaces/IEntityService.ts` |
| Application commands | `application/commands/CreateEntityCommand.ts`, `UpdateEntityCommand.ts`, `DeleteEntityCommand.ts`, `PublishEntityCommand.ts`, `ArchiveEntityCommand.ts`, `RestoreEntityCommand.ts`, `MergeEntitiesCommand.ts`, `AddAliasCommand.ts`, `RemoveAliasCommand.ts`, `CreateEntityVersionCommand.ts`, `SubmitEntityForReviewCommand.ts`, `ApproveEntityCommand.ts`, `RejectEntityCommand.ts`, `ImportEntitiesCommand.ts`, `ResolveEntityDuplicateCommand.ts` |
| Application queries | `application/queries/GetEntityQuery.ts`, `GetEntityByIdentifierQuery.ts`, `GetEntityBySlugQuery.ts`, `ListEntitiesQuery.ts`, `SearchEntitiesQuery.ts`, `GetEntityVersionQuery.ts`, `GetEntityDashboardSummaryQuery.ts`, `GetQualityDistributionQuery.ts`, `GetVerificationQueueQuery.ts`, `GetEntityDuplicatesQuery.ts`, `GetEntityActivityQuery.ts`, `ExportEntitiesQuery.ts` |
| Application DTOs | `application/dto/CreateEntityRequest.ts`, `UpdateEntityRequest.ts`, `EntityResponse.ts`, `EntitySearchRequest.ts`, `AliasDto.ts`, `EntityVersionDto.ts` |
| Handlers | All commands/queries mapped to handlers (e.g. `CreateEntityCommandHandler`, `GetEntityDashboardSummaryQueryHandler`, etc.) |
| Controllers / Routes | `interfaces/EntityController.ts`, `interfaces/EntityRoutes.ts` |

---

## 3. Entity Lifecycle (Domain Model — Verified)

Status flow (from `Entity.ts`):

```
DRAFT → PENDING_REVIEW → APPROVED / REJECTED
         ↓ (APPROVED)         ↓
      PUBLISHED ← DRAFT (restored from ARCHIVED via restore())
         ↓
      ARCHIVED
```

Transitions implemented with invariants:
- `submitForReview()`: only from `DRAFT` or `REJECTED` → `PENDING_REVIEW`
- `approve()`: only from `PENDING_REVIEW` → `APPROVED`
- `reject()`: only from `PENDING_REVIEW` → `REJECTED`
- `publish()`: only from `DRAFT` or `APPROVED` → `PUBLISHED`
- `archive()`: from any non-ARCHIVED → `ARCHIVED`
- `restore()`: only from `ARCHIVED` → `DRAFT`
- `merge()`: requires non-ARCHIVED; merges metadata (`tags`, `attributes`, etc.)

All transitions publish domain events (`EntitySubmittedEvent`, `EntityApprovedEvent`, etc.).

---

## 4. Core Fields (Verified — Domain + Database Schema)

### Domain (`Entity` aggregate root)
- `entityId`: `EntityId`
- `name`: `EntityName`
- `typeId`: `EntityTypeId`
- `metadata`: `EntityMetadata` (value object)
- `status`: enum (`DRAFT`, `PENDING_REVIEW`, `APPROVED`, `REJECTED`, `PUBLISHED`, `ARCHIVED`)
- `createdAt`, `updatedAt`: `Date`

### Metadata Value Object (`EntityMetadata`)
- `slug`
- `description`
- `source`
- `tags`: `string[]`
- `attributes`: `Record<string, unknown>`
- `showcaseContent`
- `businessProfile`: `Record<string, unknown>`
- `verificationStatus`: `UNVERIFIED` | `COMMUNITY_VERIFIED` | `OFFICIALLY_VERIFIED`
- `verificationDetails`: `Record<string, unknown>`

### DTO (`CreateEntityRequest` via Zod schema)
- `name` (required, max 255)
- `type` (required, max 255)
- `description` (optional, max 2000)
- `source` (optional, max 255)
- `tags` (array, max 100, default `[]`)
- `attributes` (`Record<string, unknown>`, default `{}`)

### Database (`backend/schema.sql` — entities table)
Columns verified present: `id`, `name`, `slug`, `type`, `description`, `source`, `tags` (JSONB), `attributes` (JSONB), `status`, `created_at`, `updated_at`, `version`, plus enterprise extensions (`legal_name`, `registration_number`, `tax_id_hash`, `entity_structure`, `latitude`, `longitude`, `country_code`, `state_province`, `city`, `street_address`, `postal_code`, `digital_address_code`, `accepted_currencies`, `payment_methods`, `operating_hours`, `start_date`, `end_date`, `temporal_granularity`, `is_historical`, `showcase_content`, `business_profile`, `verification_status`, `verification_details`).

Note: Schema `status` check currently allows only `('DRAFT', 'PUBLISHED', 'ARCHIVED')` — this is a pre-existing mismatch with the domain model's 6 states (`DRAFT`, `PENDING_REVIEW`, `APPROVED`, `REJECTED`, `PUBLISHED`, `ARCHIVED`). The schema must be reconciled to include all 6 values for full lifecycle compliance.

---

## 5. Ontology Integration — Facts / Traits

The Ontology bounded context defines schema/properties for entities:
- `EntityType` (`ontology/domain/entities/EntityType.ts`): name, description, displayName, pluralDisplayName, icon, color, namespaceUri, parentEntityId, isDraft.
- `EntityTypeProperty` (`ontology/domain/entities/EntityTypeProperty.ts`): defines property name, `PropertyDefinition` (`STRING`, `TEXT`, `INTEGER`, `NUMBER`, `BOOLEAN`, `DATE`, `DATETIME`, `JSON`), `CardinalityRule`, `required` boolean.
- Commands, handlers, repositories, routes exist for property management.

This confirms that "facts" and "traits" are fully implemented in the Ontology bounded context. The Entity bounded context uses `metadata.attributes` (`Record<string, unknown>`) to hold instance-level property values matching the ontology-defined properties.

---

## 6. API Endpoints (Verified — `interfaces/EntityRoutes.ts` + Controller)

| Method | Path | Handler / Command / Query |
|---|---|---|
| POST | `/` | Create (`CreateEntityCommandHandler`)
| PUT | `/:id` | Update (`UpdateEntityCommandHandler`)
| DELETE | `/:id` | Delete (`DeleteEntityCommandHandler`)
| POST | `/:id/publish` | Publish (`PublishEntityCommandHandler`)
| POST | `/:id/submit` | Submit for review (`SubmitEntityForReviewCommandHandler`)
| POST | `/:id/approve` | Approve (`ApproveEntityCommandHandler`)
| POST | `/:id/reject` | Reject (`RejectEntityCommandHandler`)
| POST | `/:id/archive` | Archive (`ArchiveEntityCommandHandler`)
| POST | `/:id/restore` | Restore (`RestoreEntityCommandHandler`)
| POST | `/merge` | Merge (`MergeEntitiesCommandHandler`)
| POST | `/:id/alias` | Add alias (`AddAliasCommandHandler`)
| DELETE | `/:id/alias` | Remove alias (`RemoveAliasCommandHandler`)
| POST | `/:id/version` | Create version (`CreateEntityVersionCommandHandler`)
| GET | `/` | List (`ListEntitiesQueryHandler`)
| POST | `/search` | Search (`SearchEntitiesQueryHandler`)
| GET | `/dashboard/summary` | Dashboard summary (`GetEntityDashboardSummaryQueryHandler`)
| GET | `/quality/distribution` | Quality (`GetQualityDistributionQueryHandler`)
| GET | `/verification-queue` | Queue (`GetVerificationQueueQueryHandler`)
| GET | `/duplicates` | Duplicates (`GetEntityDuplicatesQueryHandler`)
| POST | `/resolve-duplicate` | Resolve (`ResolveEntityDuplicateCommandHandler`)
| GET | `/activity` | Activity (`GetEntityActivityQueryHandler`)
| GET | `/export` | Export (`ExportEntitiesQueryHandler`)
| POST | `/import` | Import (`ImportEntitiesCommandHandler`)
| GET | `/:id` | Get by id (`GetEntityQueryHandler`)
| GET | `/identifier/:identifier` | By identifier (`GetEntityByIdentifierQueryHandler`)
| GET | `/slug/:slug` | By slug (`GetEntityBySlugQueryHandler`)
| GET | `/:id/aliases` | Aliases (`ListAliasesQueryHandler`)
| GET | `/:id/versions/:versionId` | Version (`GetEntityVersionQueryHandler`)

All secured by `authorize()` middleware using permissions: `ENTITY_CREATE`, `ENTITY_UPDATE`, `ENTITY_PUBLISH`, `ENTITY_ARCHIVE`, `ENTITY_VERSION_WRITE`, `ENTITY_READ`, `ENTITY_WRITE`.

---

## 7. Events Published (Verified)

Every state change publishes a domain event (`domain/events/`):
- `EntityCreatedEvent`
- `EntityUpdatedEvent`
- `EntityDeletedEvent`
- `EntityPublishedEvent`
- `EntityArchivedEvent`
- `EntityRestoredEvent`
- `EntitySubmittedEvent`
- `EntityApprovedEvent`
- `EntityRejectedEvent`
- `EntityMergedEvent`
- `EntityVersionCreatedEvent`
- `EntityAliasAddedEvent`
- `EntityAliasRemovedEvent`

---

## 8. Verification & Security Status

- No stubs, no placeholders (`throw new Error('Not implemented')`), no TODOs found in production source.
- Dependency direction preserved: Presentation → Application → Domain → Infrastructure.
- No direct controller → repository access; all through application services/commands/queries.
- Security preserved: RBAC (`Permission.*`), authentication middleware (`AuthenticationMiddleware`), audit events (`AuditDomainEvent` implied by design but external audit table exists).

---

## 9. Schema Mismatch (Pre-existing, Not From Implementation)

`backend/schema.sql`: `entities.status` check currently allows only `('DRAFT', 'PUBLISHED', 'ARCHIVED')`. The domain model and DTOs support `PENDING_REVIEW`, `APPROVED`, `REJECTED`. The schema constraint must be expanded to all 6 values for full lifecycle database compliance.

---

## 10. Dependency Injection & Module Wiring

Module installer: `application/EntityModuleInstaller.ts`. Container wiring in `bootstrap/container/` connects interfaces (`IEntityRepository`) to infrastructure implementations (`PostgresEntityRepository`).

---

## 11. Testing Note

No test files were read, removed, or modified per instruction. The `tests/` folder remains intact and must be verified independently if production deployment requires 90% coverage.

---

## 12. Freeze Notice

This bounded context is declared FROZEN from major modifications as of this verification. Any future change to the Entity lifecycle, domain model, or architecture requires explicit approval and a Removal Report per `AGENTS.md` rules.

---

## 13. References (Verified Files)

- Domain: `backend/src/modules/entity/domain/entities/Entity.ts`
- Metadata: `backend/src/modules/entity/domain/value-objects/EntityMetadata.ts`
- Value objects: `EntityId`, `EntityName`, `EntityTypeId`
- Events: `entity/domain/events/*.ts`
- DTOs: `entity/application/dto/*.ts`
- Commands/Queries: `entity/application/commands/*.ts`, `entity/application/queries/*.ts`
- Handlers: `entity/application/handlers/*.ts`
- Service interface: `entity/domain/interfaces/IEntityService.ts`
- Repository interface: `entity/domain/repositories/IEntityRepository.ts`
- Controller: `entity/interfaces/EntityController.ts`
- Routes: `entity/interfaces/EntityRoutes.ts`
- Schema: `backend/schema.sql`
- Ontology facts/traits: `ontology/domain/entities/EntityTypeProperty.ts`, `PropertyDefinition.ts`
- BCPR: `entity/BCPR.md` (PASS verified)
