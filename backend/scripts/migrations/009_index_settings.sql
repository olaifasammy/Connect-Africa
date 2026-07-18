CREATE INDEX IF NOT EXISTS idx_settings_user_id ON settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id_key ON user_preferences(user_id, key);
