CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    author TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL,
    url TEXT,
    publisher TEXT,
    created_at TIMESTAMP NOT NULL
);
