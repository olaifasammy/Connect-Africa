INSERT INTO "user_profiles" (id, user_id, display_name) 
VALUES (gen_random_uuid(), gen_random_uuid(), 'Admin User');
INSERT INTO "ontologies" (id, name, description) 
VALUES (gen_random_uuid(), 'Base Ontology', 'Standard platform ontology');
