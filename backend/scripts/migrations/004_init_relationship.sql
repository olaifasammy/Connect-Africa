-- Relationships table
CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY,
    source_id UUID NOT NULL,
    target_id UUID NOT NULL,
    type_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relationship versions table
CREATE TABLE IF NOT EXISTS relationship_versions (
    id UUID PRIMARY KEY,
    relationship_id UUID NOT NULL REFERENCES relationships(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relationship evidence table
CREATE TABLE IF NOT EXISTS relationship_evidence (
    id UUID PRIMARY KEY,
    relationship_id UUID NOT NULL REFERENCES relationships(id) ON DELETE CASCADE,
    source_uri TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_relationships_source_target ON relationships(source_id, target_id);
CREATE INDEX IF NOT EXISTS idx_relationship_versions_relationship_id ON relationship_versions(relationship_id);
CREATE INDEX IF NOT EXISTS idx_relationship_evidence_relationship_id ON relationship_evidence(relationship_id);
