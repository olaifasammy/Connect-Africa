ALTER TABLE media ADD COLUMN owner_id UUID NOT NULL REFERENCES users(id);
CREATE INDEX idx_media_owner_id ON media(owner_id);
