-- Seed data for Relationship bounded context

-- Insert sample entities (assume they exist in the Entity table)
-- In a real environment you would reference actual UUIDs from the Entity table.

INSERT INTO relationships (id, source_entity_id, target_entity_id, relationship_type_id, status, confidence_score, metadata, valid_from, valid_to, created_at, updated_at)
VALUES
    (uuid_generate_v4(), uuid_generate_v4(), uuid_generate_v4(), uuid_generate_v4(), 'active', 0.95, '{"description": "John works for Acme Corp"}'::jsonb, now() - interval '1 year', null, now(), now()),
    (uuid_generate_v4(), uuid_generate_v4(), uuid_generate_v4(), uuid_generate_v4(), 'active', 0.88, '{"description": "City located in Country"}'::jsonb, now() - interval '5 years', null, now(), now());

-- Relationship versions (one version per relationship for demo)
INSERT INTO relationship_versions (id, relationship_id, version_number, metadata, created_at)
SELECT uuid_generate_v4(), r.id, 1, r.metadata, now()
FROM relationships r;

-- Relationship evidences (sample textual evidence)
INSERT INTO relationship_evidences (id, relationship_id, evidence, source, created_at)
SELECT uuid_generate_v4(), r.id, 'Public record from company registry' AS evidence, 'registry' AS source, now()
FROM relationships r;
