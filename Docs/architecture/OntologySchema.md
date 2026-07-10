# Ontology Domain Schema

This document details the database schema for the Ontology bounded context.

## Tables

### `ontologies`
Stores core ontology definitions.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Ontology name |
| `description`| TEXT | | Description |
| `version` | INTEGER | NOT NULL | Current version |
| `is_published` | BOOLEAN | DEFAULT FALSE | Publication status |
| `is_archived` | BOOLEAN | DEFAULT FALSE | Archived status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update time |

### `entity_types`
Stores definitions of entity types within an ontology.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `ontology_id` | UUID | REFERENCES ontologies | Owning ontology |
| `name` | VARCHAR(255) | NOT NULL | Entity type name |
| `description`| TEXT | | Description |

### `relationship_types`
Stores definitions of relationship types within an ontology.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `ontology_id` | UUID | REFERENCES ontologies | Owning ontology |
| `name` | VARCHAR(255) | NOT NULL | Relationship type name |
| `source_entity_type_id`| UUID | REFERENCES entity_types| Source entity type |
| `target_entity_type_id`| UUID | REFERENCES entity_types| Target entity type |

### `ontology_versions`
Stores historical versions of ontologies.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `ontology_id` | UUID | REFERENCES ontologies | Owning ontology |
| `version` | INTEGER | NOT NULL | Version number |
| `is_published` | BOOLEAN | DEFAULT FALSE | Publication status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |
