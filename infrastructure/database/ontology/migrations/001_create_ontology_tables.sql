/*
  Migration: Create tables for the Ontology bounded context.
  Place this file in infrastructure/database/ontology/migrations/001_create_ontology_tables.sql
*/

-- Ontologies table
CREATE TABLE IF NOT EXISTS ontologies (
  id               UUID PRIMARY KEY,
  name             TEXT NOT NULL UNIQUE,
  description      TEXT,
  version          INTEGER NOT NULL CHECK (version >= 1),
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ontology versions table (immutable published versions)
CREATE TABLE IF NOT EXISTS ontology_versions (
  id               UUID PRIMARY KEY,
  ontology_id      UUID NOT NULL REFERENCES ontologies(id) ON DELETE CASCADE,
  version_number   INTEGER NOT NULL CHECK (version_number >= 1),
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (ontology_id, version_number)
);

-- Entity Types table
CREATE TABLE IF NOT EXISTS entity_types (
  id               UUID PRIMARY KEY,
  ontology_id      UUID NOT NULL REFERENCES ontologies(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  description      TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (ontology_id, name)
);

-- Relationship Types table
CREATE TABLE IF NOT EXISTS relationship_types (
  id                     UUID PRIMARY KEY,
  ontology_id            UUID NOT NULL REFERENCES ontologies(id) ON DELETE CASCADE,
  name                   TEXT NOT NULL,
  description            TEXT,
  source_entity_type_id  UUID NOT NULL REFERENCES entity_types(id),
  target_entity_type_id  UUID NOT NULL REFERENCES entity_types(id),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (ontology_id, name)
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_ontologies_name ON ontologies(name);
CREATE INDEX IF NOT EXISTS idx_entity_types_ontology_id ON entity_types(ontology_id);
CREATE INDEX IF NOT EXISTS idx_relationship_types_ontology_id ON relationship_types(ontology_id);
