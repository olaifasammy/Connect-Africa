-- Add slug to entities
ALTER TABLE entities ADD COLUMN slug VARCHAR;
CREATE UNIQUE INDEX IF NOT EXISTS idx_entities_slug ON entities(slug);
