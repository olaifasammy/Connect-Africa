/*
  Seed data for the Ontology bounded context.
  Place this file in infrastructure/database/ontology/seed/001_seed_ontology.sql
*/

-- Insert a sample Ontology
INSERT INTO ontologies (id, name, description, version, is_published, is_archived, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Sample Ontology',
  'A demonstration ontology used for initial seed data.',
  1,
  TRUE,
  FALSE,
  NOW(),
  NOW()
)
RETURNING id INTO TEMP TABLE tmp_ontology_id;

-- Insert a version for the created ontology (immutable published version)
INSERT INTO ontology_versions (id, ontology_id, version_number, is_published, created_at)
SELECT
  gen_random_uuid(),
  id,
  1,
  TRUE,
  NOW()
FROM tmp_ontology_id;

-- Insert Entity Types linked to the ontology
INSERT INTO entity_types (id, ontology_id, name, description, created_at)
SELECT
  gen_random_uuid(),
  id,
  et.name,
  et.description,
  NOW()
FROM (
  VALUES
    ('Person', 'Represents a person entity.'),
    ('Organization', 'Represents an organization entity.'),
    ('Location', 'Represents a geographical location.')
) AS et(name, description), tmp_ontology_id;

-- Capture Entity Type IDs for relationship seeding
CREATE TEMP TABLE tmp_entity_ids AS
SELECT id, name FROM entity_types WHERE ontology_id = (SELECT id FROM tmp_ontology_id);

-- Insert Relationship Types linking the entity types
INSERT INTO relationship_types (
  id,
  ontology_id,
  name,
  description,
  source_entity_type_id,
  target_entity_type_id,
  created_at
)
SELECT
  gen_random_uuid(),
  (SELECT id FROM tmp_ontology_id),
  rt.name,
  rt.description,
  src.id,
  tgt.id,
  NOW()
FROM (
  VALUES
    ('WorksAt', 'Person works at an Organization'),
    ('LocatedIn', 'Entity is located in a Location')
) AS rt(name, description)
JOIN tmp_entity_ids src ON src.name = CASE WHEN rt.name = 'WorksAt' THEN 'Person' ELSE 'Organization' END
JOIN tmp_entity_ids tgt ON tgt.name = CASE WHEN rt.name = 'WorksAt' THEN 'Organization' ELSE 'Location' END;

-- Clean up temporary tables
DROP TABLE IF EXISTS tmp_ontology_id, tmp_entity_ids;
