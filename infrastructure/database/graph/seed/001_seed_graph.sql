-- Seed data for Graph bounded context
-- Nodes (placeholder UUIDs for linked Entity IDs)
INSERT INTO graph_nodes (id, entity_id, labels, metadata, created_at, updated_at)
VALUES
    (uuid_generate_v4(), uuid_generate_v4(), ARRAY['Person'], '{"name":"John Doe"}'::jsonb, now(), now()),
    (uuid_generate_v4(), uuid_generate_v4(), ARRAY['Organization'], '{"name":"Acme Corp"}'::jsonb, now(), now());

-- Edges linking the nodes inserted above
INSERT INTO graph_edges (id, source_node_id, target_node_id, relationship_type_id, metadata, properties, created_at, updated_at)
SELECT
    uuid_generate_v4(),
    src.id,
    tgt.id,
    uuid_generate_v4(),
    '{"description":"Employment"}'::jsonb,
    '{"confidence":0.96}'::jsonb,
    now(),
    now()
FROM graph_nodes src
JOIN graph_nodes tgt ON src.labels @> ARRAY['Person'] AND tgt.labels @> ARRAY['Organization'];
