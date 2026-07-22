-- Seed data for AI bounded context
INSERT INTO providers (id, name, type, health_status, config, created_at)
VALUES
    (uuid_generate_v4(), 'OpenAI', 'LLM', 'healthy', '{}'::jsonb, now()),
    (uuid_generate_v4(), 'Anthropic', 'LLM', 'healthy', '{}'::jsonb, now());

INSERT INTO prompts (id, name, content, version, metadata, created_at)
VALUES
    (uuid_generate_v4(), 'Summarize', 'Summarize the following text:', 1, '{}'::jsonb, now()),
    (uuid_generate_v4(), 'Translate', 'Translate to French:', 1, '{}'::jsonb, now());

INSERT INTO ai_requests (id, prompt_id, provider_id, status, response_text, created_at, updated_at)
SELECT uuid_generate_v4(), p.id, prov.id, 'completed', 'Sample response', now(), now()
FROM prompts p
JOIN providers prov ON prov.name = 'OpenAI';
