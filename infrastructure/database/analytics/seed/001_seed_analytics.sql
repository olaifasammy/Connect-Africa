-- Seed data for Analytics bounded context
INSERT INTO analytics_events (id, event_type, payload, occurred_at)
VALUES
    (uuid_generate_v4(), 'AI_REQUEST', '{"provider":"OpenAI","status":"completed"}'::jsonb, now()),
    (uuid_generate_v4(), 'PROMPT_CREATED', '{"prompt":"Summarize"}'::jsonb, now());
