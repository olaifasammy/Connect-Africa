-- Migration 012_init_audit.sql

CREATE TABLE IF NOT EXISTS audit_entries (
    id UUID PRIMARY KEY,
    correlation_id UUID NOT NULL,
    actor_id UUID NOT NULL,
    actor_type VARCHAR(255) NOT NULL,
    resource_id UUID NOT NULL,
    resource_type VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_metadata (
    id UUID PRIMARY KEY,
    audit_entry_id UUID REFERENCES audit_entries(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_entries_actor ON audit_entries(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_entries_resource ON audit_entries(resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_entries_timestamp ON audit_entries(timestamp);
