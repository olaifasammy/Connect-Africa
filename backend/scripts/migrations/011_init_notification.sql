-- Migration 011_init_notification.sql

CREATE TABLE IF NOT EXISTS notification_templates (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY,
    recipient_id UUID NOT NULL,
    template_id UUID REFERENCES notification_templates(id),
    channel VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notification_deliveries (
    id UUID PRIMARY KEY,
    notification_id UUID REFERENCES notifications(id),
    channel VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    delivered_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS notification_preferences (
    recipient_id UUID PRIMARY KEY,
    channel VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);
