BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- AUTH
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    account_status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION',
    email_verified_at TIMESTAMPTZ,

    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,

    role TEXT NOT NULL DEFAULT 'USER',
    mfa_secret TEXT,

    CONSTRAINT users_account_status_check
        CHECK (
            account_status IN (
                'PENDING_VERIFICATION',
                'ACTIVE',
                'DISABLED',
                'SUSPENDED',
                'BANNED'
            )
        ),

    CONSTRAINT users_failed_login_attempts_check
        CHECK (failed_login_attempts >= 0),

    CONSTRAINT users_role_check
        CHECK (
            role IN (
                'USER',
                'EDITOR',
                'MODERATOR',
                'ADMIN'
            )
        )
);

-- Canonical lifecycle columns for databases created from an older
-- version of the schema.
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS account_status TEXT
        NOT NULL DEFAULT 'PENDING_VERIFICATION';

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role TEXT
        NOT NULL DEFAULT 'USER';

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS mfa_secret TEXT;

ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_account_status_check;

ALTER TABLE users
    ADD CONSTRAINT users_account_status_check
    CHECK (
        account_status IN (
            'PENDING_VERIFICATION',
            'ACTIVE',
            'DISABLED',
            'SUSPENDED',
            'BANNED'
        )
    );

ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE users
    ADD CONSTRAINT users_role_check
    CHECK (
        role IN (
            'USER',
            'EDITOR',
            'MODERATOR',
            'ADMIN'
        )
    );

ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_failed_login_attempts_check;

ALTER TABLE users
    ADD CONSTRAINT users_failed_login_attempts_check
    CHECK (failed_login_attempts >= 0);

CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);

CREATE INDEX IF NOT EXISTS idx_users_account_status
    ON users(account_status);

CREATE INDEX IF NOT EXISTS idx_users_role
    ON users(role);

CREATE TABLE IF NOT EXISTS user_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE
        REFERENCES users(id) ON DELETE CASCADE,

    display_name TEXT,
    avatar_url TEXT,
    cover_image_url TEXT,
    bio TEXT,

    website TEXT,
    social_links JSONB,
    country TEXT,
    languages JSONB,

    expertise JSONB,
    research_interests JSONB
);

-- Canonical profile fields for databases created from an older
-- version of the schema.
ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS website TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS social_links JSONB;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS country TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS languages JSONB;

-- ============================================================
-- ONTOLOGY
-- ============================================================

CREATE TABLE IF NOT EXISTS ontologies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    version INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT ontologies_version_check
        CHECK (version >= 1),

    CONSTRAINT ontologies_archived_published_check
        CHECK (
            NOT (is_archived = TRUE AND is_published = TRUE)
        )
);

CREATE INDEX IF NOT EXISTS idx_ontologies_name
    ON ontologies(name);

CREATE INDEX IF NOT EXISTS idx_ontologies_published
    ON ontologies(is_published);

CREATE INDEX IF NOT EXISTS idx_ontologies_archived
    ON ontologies(is_archived);


-- ============================================================
-- ONTOLOGY VERSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS ontology_versions (
    id TEXT PRIMARY KEY,

    ontology_id TEXT NOT NULL
        REFERENCES ontologies(id)
        ON DELETE CASCADE,

    version_number INTEGER NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT ontology_versions_version_check
        CHECK (version_number >= 1),

    CONSTRAINT ontology_versions_unique_version
        UNIQUE (ontology_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_ontology_versions_ontology
    ON ontology_versions(ontology_id);

CREATE INDEX IF NOT EXISTS idx_ontology_versions_ontology_version
    ON ontology_versions(ontology_id, version_number DESC);

CREATE INDEX IF NOT EXISTS idx_ontology_versions_published
    ON ontology_versions(ontology_id, is_published);


-- ============================================================
-- ENTITY TYPES
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_types (
    id TEXT PRIMARY KEY,

    ontology_id TEXT NOT NULL
        REFERENCES ontologies(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,

    CONSTRAINT entity_types_name_not_empty
        CHECK (length(btrim(name)) > 0),

    CONSTRAINT entity_types_name_length
        CHECK (length(btrim(name)) <= 255),

    CONSTRAINT entity_types_unique_name
        UNIQUE (ontology_id, name),

    CONSTRAINT entity_types_id_ontology_unique
        UNIQUE (id, ontology_id)
);

CREATE INDEX IF NOT EXISTS idx_entity_types_ontology
    ON entity_types(ontology_id);

CREATE INDEX IF NOT EXISTS idx_entity_types_name
    ON entity_types(name);


-- ============================================================
-- EXISTING DATABASE COMPATIBILITY:
-- ENTITY TYPE COMPOSITE OWNERSHIP KEY
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'entity_types_id_ontology_unique'
          AND conrelid = 'entity_types'::regclass
    ) THEN
        ALTER TABLE entity_types
            ADD CONSTRAINT entity_types_id_ontology_unique
            UNIQUE (id, ontology_id);
    END IF;
END
$$;


-- ============================================================
-- ENTITY TYPE PROPERTIES
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_type_properties (
    id TEXT PRIMARY KEY,

    entity_type_id TEXT NOT NULL,
    ontology_id TEXT NOT NULL,

    name TEXT NOT NULL,
    data_type TEXT NOT NULL,

    min_cardinality INTEGER NOT NULL DEFAULT 0,
    max_cardinality INTEGER,

    required BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT entity_type_properties_name_not_empty
        CHECK (length(btrim(name)) > 0),

    CONSTRAINT entity_type_properties_name_length
        CHECK (length(btrim(name)) <= 255),

    CONSTRAINT entity_type_properties_data_type_check
        CHECK (
            data_type IN (
                'STRING',
                'TEXT',
                'INTEGER',
                'NUMBER',
                'BOOLEAN',
                'DATE',
                'DATETIME',
                'JSON'
            )
        ),

    CONSTRAINT entity_type_properties_cardinality_min_check
        CHECK (min_cardinality >= 0),

    CONSTRAINT entity_type_properties_cardinality_max_check
        CHECK (
            max_cardinality IS NULL
            OR max_cardinality >= min_cardinality
        ),

    CONSTRAINT entity_type_properties_required_check
        CHECK (
            required = FALSE
            OR min_cardinality >= 1
        ),

    CONSTRAINT entity_type_properties_unique_name
        UNIQUE (entity_type_id, name),

    CONSTRAINT entity_type_properties_entity_type_ontology_fk
        FOREIGN KEY (entity_type_id, ontology_id)
        REFERENCES entity_types(id, ontology_id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_entity_type_properties_entity_type
    ON entity_type_properties(entity_type_id);

CREATE INDEX IF NOT EXISTS idx_entity_type_properties_ontology
    ON entity_type_properties(ontology_id);

CREATE INDEX IF NOT EXISTS idx_entity_type_properties_name
    ON entity_type_properties(name);


-- ============================================================
-- EXISTING DATABASE COMPATIBILITY:
-- PROPERTY OWNERSHIP INTEGRITY
-- ============================================================

DO $$
BEGIN
    /*
     * If an older version of the table already exists with
     * independent ontology/entity-type foreign keys, retain
     * those constraints and add the stronger composite FK.
     *
     * The composite FK is intentionally additive. Existing
     * constraints continue protecting referenced rows while
     * this constraint guarantees that the ontology ownership
     * matches the Entity Type ownership.
     */
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname =
            'entity_type_properties_entity_type_ontology_fk'
          AND conrelid = 'entity_type_properties'::regclass
    ) THEN
        ALTER TABLE entity_type_properties
            ADD CONSTRAINT entity_type_properties_entity_type_ontology_fk
            FOREIGN KEY (entity_type_id, ontology_id)
            REFERENCES entity_types(id, ontology_id)
            ON DELETE CASCADE;
    END IF;
END
$$;


-- ============================================================
-- RELATIONSHIP TYPES
-- ============================================================

CREATE TABLE IF NOT EXISTS relationship_types (
    id TEXT PRIMARY KEY,

    ontology_id TEXT NOT NULL
        REFERENCES ontologies(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,

    source_entity_type_id TEXT NOT NULL,
    target_entity_type_id TEXT NOT NULL,

    CONSTRAINT relationship_types_name_not_empty
        CHECK (length(btrim(name)) > 0),

    CONSTRAINT relationship_types_name_length
        CHECK (length(btrim(name)) <= 255),

    CONSTRAINT relationship_types_unique_name
        UNIQUE (ontology_id, name),

    CONSTRAINT relationship_types_source_entity_type_ontology_fk
        FOREIGN KEY (source_entity_type_id, ontology_id)
        REFERENCES entity_types(id, ontology_id)
        ON DELETE RESTRICT,

    CONSTRAINT relationship_types_target_entity_type_ontology_fk
        FOREIGN KEY (target_entity_type_id, ontology_id)
        REFERENCES entity_types(id, ontology_id)
        ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_relationship_types_ontology
    ON relationship_types(ontology_id);

CREATE INDEX IF NOT EXISTS idx_relationship_types_name
    ON relationship_types(name);

CREATE INDEX IF NOT EXISTS idx_relationship_types_source
    ON relationship_types(source_entity_type_id);

CREATE INDEX IF NOT EXISTS idx_relationship_types_target
    ON relationship_types(target_entity_type_id);


-- ============================================================
-- EXISTING DATABASE COMPATIBILITY:
-- RELATIONSHIP TYPE OWNERSHIP INTEGRITY
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname =
            'relationship_types_source_entity_type_ontology_fk'
          AND conrelid = 'relationship_types'::regclass
    ) THEN
        ALTER TABLE relationship_types
            ADD CONSTRAINT
                relationship_types_source_entity_type_ontology_fk
            FOREIGN KEY (source_entity_type_id, ontology_id)
            REFERENCES entity_types(id, ontology_id)
            ON DELETE RESTRICT;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname =
            'relationship_types_target_entity_type_ontology_fk'
          AND conrelid = 'relationship_types'::regclass
    ) THEN
        ALTER TABLE relationship_types
            ADD CONSTRAINT
                relationship_types_target_entity_type_ontology_fk
            FOREIGN KEY (target_entity_type_id, ontology_id)
            REFERENCES entity_types(id, ontology_id)
            ON DELETE RESTRICT;
    END IF;
END
$$;


-- ============================================================
-- ENTITIES
-- ============================================================

CREATE TABLE IF NOT EXISTS entities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,

    type TEXT NOT NULL,

    description TEXT,
    source TEXT,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT entities_status_check
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),

    CONSTRAINT entities_attributes_object_check
        CHECK (jsonb_typeof(attributes) = 'object'),

    CONSTRAINT entities_type_fk
        FOREIGN KEY (type)
        REFERENCES entity_types(id)
        ON DELETE RESTRICT
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'entities'
          AND column_name = 'status'
    ) THEN
        ALTER TABLE entities
            ADD COLUMN status TEXT
            NOT NULL DEFAULT 'DRAFT';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'entities_status_check'
          AND conrelid = 'entities'::regclass
    ) THEN
        ALTER TABLE entities
            ADD CONSTRAINT entities_status_check
            CHECK (
                status IN (
                    'DRAFT',
                    'PUBLISHED',
                    'ARCHIVED'
                )
            );
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'entities'
          AND column_name = 'attributes'
    ) THEN
        ALTER TABLE entities
            ADD COLUMN attributes JSONB
            NOT NULL DEFAULT '{}'::jsonb;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'entities_attributes_object_check'
          AND conrelid = 'entities'::regclass
    ) THEN
        ALTER TABLE entities
            ADD CONSTRAINT entities_attributes_object_check
            CHECK (
                jsonb_typeof(attributes) = 'object'
            );
    END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_entities_name
    ON entities(name);

CREATE INDEX IF NOT EXISTS idx_entities_type
    ON entities(type);

CREATE INDEX IF NOT EXISTS idx_entities_status
    ON entities(status);

CREATE INDEX IF NOT EXISTS idx_entities_tags
    ON entities USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_entities_created_at_id
    ON entities(created_at DESC, id ASC);

CREATE INDEX IF NOT EXISTS idx_entities_attributes
    ON entities USING GIN(attributes);

CREATE INDEX IF NOT EXISTS idx_entities_attributes
    ON entities USING GIN(attributes);

-- ============================================================
-- EXISTING DATABASE COMPATIBILITY:
-- ENTITY TYPE FK
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'entities_type_fk'
          AND conrelid = 'entities'::regclass
    ) THEN
        ALTER TABLE entities
            ADD CONSTRAINT entities_type_fk
            FOREIGN KEY (type)
            REFERENCES entity_types(id)
            ON DELETE RESTRICT;
    END IF;
END
$$;


-- ============================================================
-- ENTITY IDENTIFIERS
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_identifiers (
    id TEXT PRIMARY KEY,
    entity_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,
    external_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entity_identifiers_entity
    ON entity_identifiers(entity_id);

CREATE INDEX IF NOT EXISTS idx_entity_identifiers_external_id
    ON entity_identifiers(external_id);


-- ============================================================
-- ENTITY ALIASES
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_aliases (
    id TEXT PRIMARY KEY,
    entity_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,
    alias TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT entity_aliases_entity_alias_unique
        UNIQUE (entity_id, alias)
);

CREATE INDEX IF NOT EXISTS idx_entity_aliases_entity
    ON entity_aliases(entity_id);

CREATE INDEX IF NOT EXISTS idx_entity_aliases_alias
    ON entity_aliases(alias);


-- ============================================================
-- ENTITY VERSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_versions (
    id TEXT PRIMARY KEY,

    entity_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,

    version_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (entity_id, version_number),

    CONSTRAINT entity_versions_status_check
        CHECK (
            status IN (
                'DRAFT',
                'PUBLISHED',
                'ARCHIVED'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_entity_versions_entity
    ON entity_versions(entity_id);

CREATE INDEX IF NOT EXISTS idx_entity_versions_entity_version
    ON entity_versions(entity_id, version_number DESC);


-- ============================================================
-- RELATIONSHIPS / GRAPH
-- ============================================================

CREATE TABLE IF NOT EXISTS relationships (
    id TEXT PRIMARY KEY,

    source_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,

    target_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,

    type_id TEXT NOT NULL
        REFERENCES relationship_types(id)
        ON DELETE RESTRICT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (source_id, target_id, type_id)
);

CREATE INDEX IF NOT EXISTS idx_relationships_source
    ON relationships(source_id);

CREATE INDEX IF NOT EXISTS idx_relationships_target
    ON relationships(target_id);

CREATE INDEX IF NOT EXISTS idx_relationships_type
    ON relationships(type_id);

-- ============================================================
-- RELATIONSHIP EVIDENCE
-- ============================================================

CREATE TABLE IF NOT EXISTS relationship_evidence (
    id TEXT PRIMARY KEY,

    relationship_id TEXT NOT NULL
        REFERENCES relationships(id)
        ON DELETE CASCADE,

    source_uri TEXT NOT NULL,
    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_relationship_evidence_relationship
    ON relationship_evidence(relationship_id);


-- ============================================================
-- ARTICLES
-- ============================================================

CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT NOT NULL,
    author_id TEXT
        REFERENCES users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ,

    version INTEGER NOT NULL DEFAULT 1,

    entity_links JSONB NOT NULL DEFAULT '[]'::jsonb,
    relationship_links JSONB NOT NULL DEFAULT '[]'::jsonb,
    citations JSONB NOT NULL DEFAULT '[]'::jsonb,
    media_links JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    seo JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_articles_slug
    ON articles(slug);

CREATE INDEX IF NOT EXISTS idx_articles_author
    ON articles(author_id);

CREATE INDEX IF NOT EXISTS idx_articles_status
    ON articles(status);

CREATE INDEX IF NOT EXISTS idx_articles_created_at
    ON articles(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_articles_tags
    ON articles USING GIN(tags);


-- ============================================================
-- ARTICLE REVISIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS article_revisions (
    id TEXT PRIMARY KEY,

    article_id TEXT NOT NULL
        REFERENCES articles(id)
        ON DELETE CASCADE,

    version_number INTEGER NOT NULL,

    snapshot JSONB NOT NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (article_id, version_number),

    CONSTRAINT article_revisions_version_check
        CHECK (version_number >= 1),

    CONSTRAINT article_revisions_snapshot_object_check
        CHECK (jsonb_typeof(snapshot) = 'object'),

    CONSTRAINT article_revisions_metadata_object_check
        CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE INDEX IF NOT EXISTS idx_article_revisions_article
    ON article_revisions(article_id);

CREATE INDEX IF NOT EXISTS idx_article_revisions_article_version
    ON article_revisions(article_id, version_number DESC);


-- ============================================================
-- USER BOOKMARKS
-- ============================================================

CREATE TABLE IF NOT EXISTS user_bookmarks (
    user_id TEXT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    article_id TEXT NOT NULL
        REFERENCES articles(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user
    ON user_bookmarks(user_id, created_at DESC);


-- ============================================================
-- READING HISTORY
-- ============================================================

CREATE TABLE IF NOT EXISTS reading_history (
    id TEXT PRIMARY KEY,

    user_id TEXT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    article_id TEXT NOT NULL
        REFERENCES articles(id)
        ON DELETE CASCADE,

    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reading_history_user
    ON reading_history(user_id, timestamp DESC);


-- ============================================================
-- READING PROGRESS
-- ============================================================

CREATE TABLE IF NOT EXISTS reading_progress (
    user_id TEXT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    article_id TEXT NOT NULL
        REFERENCES articles(id)
        ON DELETE CASCADE,

    progress FLOAT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, article_id),

    CONSTRAINT reading_progress_percentage_check
        CHECK (progress >= 0 AND progress <= 100)
);

CREATE INDEX IF NOT EXISTS idx_reading_progress_user
    ON reading_progress(user_id);


-- ============================================================
-- RECENT SEARCHES
-- ============================================================

CREATE TABLE IF NOT EXISTS recent_searches (
    id TEXT PRIMARY KEY,

    user_id TEXT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    query TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recent_searches_user
    ON recent_searches(user_id, created_at DESC);


-- ============================================================
-- SOURCES
-- ============================================================

CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    author TEXT,
    published_at TIMESTAMPTZ,
    url TEXT,
    publisher TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sources_published_at
    ON sources(published_at DESC);


-- ============================================================
-- MEDIA
-- ============================================================

CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_path TEXT NOT NULL,
    size BIGINT NOT NULL,
    status TEXT NOT NULL,
    title TEXT,
    owner_id TEXT
        REFERENCES users(id)
        ON DELETE SET NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_owner
    ON media(owner_id);

CREATE INDEX IF NOT EXISTS idx_media_file_name
    ON media(file_name);


-- ============================================================
-- ENTITY MEDIA
-- ============================================================

CREATE TABLE IF NOT EXISTS entity_media (
    entity_id TEXT NOT NULL
        REFERENCES entities(id)
        ON DELETE CASCADE,

    media_id TEXT NOT NULL
        REFERENCES media(id)
        ON DELETE CASCADE,

    PRIMARY KEY (entity_id, media_id)
);

CREATE INDEX IF NOT EXISTS idx_entity_media_media
    ON entity_media(media_id);


-- ============================================================
-- ARTICLE MEDIA
-- ============================================================

CREATE TABLE IF NOT EXISTS article_media (
    article_id TEXT NOT NULL
        REFERENCES articles(id)
        ON DELETE CASCADE,

    media_id TEXT NOT NULL
        REFERENCES media(id)
        ON DELETE CASCADE,

    PRIMARY KEY (article_id, media_id)
);

CREATE INDEX IF NOT EXISTS idx_article_media_media
    ON article_media(media_id);


-- ============================================================
-- MEDIA USAGE
-- ============================================================

CREATE TABLE IF NOT EXISTS media_usage (
    id TEXT PRIMARY KEY,

    media_id TEXT NOT NULL
        REFERENCES media(id)
        ON DELETE CASCADE,

    resource_type TEXT NOT NULL,
    resource_id TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_usage_media
    ON media_usage(media_id);

CREATE INDEX IF NOT EXISTS idx_media_usage_resource
    ON media_usage(resource_type, resource_id);


-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    recipient_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    channel TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_read BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient
    ON notifications(recipient_id);

CREATE INDEX IF NOT EXISTS idx_notifications_created_at
    ON notifications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient_created
    ON notifications(recipient_id, created_at DESC);


-- ============================================================
-- SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS settings (
    user_id TEXT PRIMARY KEY
        REFERENCES users(id)
        ON DELETE CASCADE,

    theme TEXT NOT NULL,
    timezone TEXT NOT NULL,
    locale TEXT NOT NULL,
    notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    notification_preference TEXT NOT NULL,
    privacy_level TEXT NOT NULL,
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE
);


-- ============================================================
-- AI
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_prompts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    version INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_prompts_name_version
    ON ai_prompts(name, version DESC);


CREATE TABLE IF NOT EXISTS providers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    priority INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_providers_enabled
    ON providers(is_enabled);

CREATE INDEX IF NOT EXISTS idx_providers_priority
    ON providers(priority);


CREATE TABLE IF NOT EXISTS knowledge_gaps (
    id TEXT PRIMARY KEY,
    topic TEXT NOT NULL,
    prompt TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_gaps_status
    ON knowledge_gaps(status);


-- ============================================================
-- ANALYTICS
-- ============================================================

CREATE TABLE IF NOT EXISTS system_metrics (
    id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    source_context TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_system_metrics_context
    ON system_metrics(source_context);

CREATE INDEX IF NOT EXISTS idx_system_metrics_timestamp
    ON system_metrics(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_system_metrics_event
    ON system_metrics(event_name);


-- ============================================================
-- AUDIT
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_entries (
    id TEXT PRIMARY KEY,
    correlation_id TEXT NOT NULL,
    actor_id TEXT NOT NULL,
    actor_type TEXT NOT NULL,
    resource_id TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_entries_actor
    ON audit_entries(actor_id);

CREATE INDEX IF NOT EXISTS idx_audit_entries_resource
    ON audit_entries(resource_id);

CREATE INDEX IF NOT EXISTS idx_audit_entries_action
    ON audit_entries(action);

CREATE INDEX IF NOT EXISTS idx_audit_entries_timestamp
    ON audit_entries(timestamp DESC);


CREATE TABLE IF NOT EXISTS audit_metadata (
    id TEXT PRIMARY KEY,

    audit_entry_id TEXT NOT NULL
        REFERENCES audit_entries(id)
        ON DELETE CASCADE,

    key TEXT NOT NULL,
    value TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_metadata_entry
    ON audit_metadata(audit_entry_id);


-- ============================================================
-- SEARCH
-- ============================================================

CREATE TABLE IF NOT EXISTS search_documents (
    id TEXT PRIMARY KEY,
    resource_id TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    content JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_search_documents_resource
    ON search_documents(resource_type, resource_id);

CREATE INDEX IF NOT EXISTS idx_search_documents_content
    ON search_documents USING GIN(content);

CREATE INDEX IF NOT EXISTS idx_search_documents_content_trgm
    ON search_documents
    USING GIN ((content::text) gin_trgm_ops);


-- ============================================================
-- OUTBOX
-- ============================================================

CREATE TABLE IF NOT EXISTS outbox (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_outbox_pending
    ON outbox(processed, created_at)
    WHERE processed = FALSE;


COMMIT;