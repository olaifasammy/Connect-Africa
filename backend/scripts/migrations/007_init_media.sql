CREATE TABLE media (
    id UUID PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    size BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE entity_media (
    entity_id UUID NOT NULL,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    PRIMARY KEY (entity_id, media_id)
);

CREATE TABLE article_media (
    article_id UUID NOT NULL,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, media_id)
);

CREATE TABLE media_usage (
    id UUID PRIMARY KEY,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_file_name ON media(file_name);
CREATE INDEX idx_media_status ON media(status);
CREATE INDEX idx_media_usage_media_id ON media_usage(media_id);
