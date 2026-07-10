CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE ontologies (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    version INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

CREATE TABLE entity_types (
    id UUID PRIMARY KEY,
    ontology_id UUID NOT NULL REFERENCES ontologies(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE relationship_types (
    id UUID PRIMARY KEY,
    ontology_id UUID NOT NULL REFERENCES ontologies(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    source_entity_type_id UUID NOT NULL REFERENCES entity_types(id),
    target_entity_type_id UUID NOT NULL REFERENCES entity_types(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ontology_versions (
    id UUID PRIMARY KEY,
    ontology_id UUID NOT NULL REFERENCES ontologies(id),
    version INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_ontologies_updated_at
    BEFORE UPDATE ON ontologies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entity_types_updated_at
    BEFORE UPDATE ON entity_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_relationship_types_updated_at
    BEFORE UPDATE ON relationship_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_ontologies_name ON ontologies(name);
CREATE INDEX idx_entity_types_ontology_id ON entity_types(ontology_id);
CREATE INDEX idx_relationship_types_ontology_id ON relationship_types(ontology_id);
CREATE INDEX idx_ontology_versions_ontology_id ON ontology_versions(ontology_id);
