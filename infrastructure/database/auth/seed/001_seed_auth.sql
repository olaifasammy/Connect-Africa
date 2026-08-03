-- Seed data for Auth module
-- Insert admin user and profile
INSERT INTO users (id, email, password_hash, is_active)
VALUES (uuid_generate_v4(), 'admin@example.com', '$2b$10$7sY8x5p1v6FQ4OXG2Z8cV.6G0sKj9xZUIZ7bFdKx7EGuKxkW6N18K', TRUE);

-- Assuming the inserted user has the generated UUID, we retrieve it for profile insertion.
-- This statement works in PostgreSQL using WITH clause.
WITH admin_user AS (
  SELECT id FROM users WHERE email = 'admin@example.com'
)
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, expertise, research_interests)
SELECT uuid_generate_v4(), admin_user.id, 'Admin', NULL, 'System administrator', NULL, NULL FROM admin_user;
