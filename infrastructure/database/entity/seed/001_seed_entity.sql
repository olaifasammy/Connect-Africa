-- Seed data for Entity bounded context
INSERT INTO entities (id, name, type, metadata, created_at, updated_at)
VALUES
    (uuid_generate_v4(), 'John Doe', 'Person', '{"description": "Sample person"}'::jsonb, now(), now()),
    (uuid_generate_v4(), 'Acme Corp', 'Organization', '{"industry": "Manufacturing"}'::jsonb, now(), now());

-- Assuming the IDs generated above are known, we could insert versions and aliases.
-- For demonstration, we'll insert placeholder versions and aliases using subqueries.
INSERT INTO entity_versions (id, entity_id, version_number, name, metadata, created_at)
SELECT uuid_generate_v4(), e.id, 1, e.name, e.metadata, now()
FROM entities e;

INSERT INTO entity_aliases (id, entity_id, alias, created_at)
SELECT uuid_generate_v4(), e.id, e.name || ' Alias', now()
FROM entities e;

INSERT INTO entity_identifiers (id, entity_id, external_id, source, created_at)
SELECT uuid_generate_v4(), e.id, e.name || '-ext', 'external-system', now()
FROM entities e;
