-- Migration for Entity bounded context
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: entities
CREATE TABLE IF NOT EXISTS entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: entity_versions
CREATE TABLE IF NOT EXISTS entity_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    name VARCHAR,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: entity_aliases
CREATE TABLE IF NOT EXISTS entity_aliases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    alias VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: entity_identifiers
CREATE TABLE IF NOT EXISTS entity_identifiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    external_id VARCHAR NOT NULL,
    source VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(type);
CREATE INDEX IF NOT EXISTS idx_entity_versions_entity_id ON entity_versions(entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_aliases_entity_id ON entity_aliases(entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_identifiers_entity_id ON entity_identifiers(entity_id);
