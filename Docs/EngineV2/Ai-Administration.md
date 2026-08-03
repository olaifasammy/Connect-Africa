# AI Administration

Version: 1.0

Status: Authoritative

---

# Purpose

This document defines every administrative capability required for managing the Connect-Africa AI Platform.

---

# AI Dashboard

Display

- Total Requests
- Active Provider
- Provider Health
- Average Latency
- Total Tokens
- Estimated Cost
- Queue Size
- Failed Requests
- Cached Responses

---

# Provider Management

Administrators can

- Add Provider
- Remove Provider
- Enable Provider
- Disable Provider
- Change Priority
- Configure Timeout
- Configure Retry
- Configure Token Limits

Supported Providers

- Gemini
- OpenAI
- Anthropic
- Azure
- Local Models

---

# Prompt Management

Administrators manage

- Research Prompt
- Topic Indexer Prompt
- Expansion Prompt
- Entity Extraction Prompt
- Relationship Extraction Prompt
- Ontology Prompt

Every prompt contains

- Version
- Description
- Author
- Last Modified
- Rollback History

---

# Topic Intelligence

Administrators configure

Trusted Websites

Examples

- WHO
- African Union
- UNESCO
- BBC Africa

Capabilities

- Crawl Website
- Schedule Crawl
- Manual Crawl
- Pause Crawl
- Resume Crawl

---

# Crawl Analytics

Display

- Pages Crawled
- Topics Found
- Entities Suggested
- Relationships Suggested
- Ontologies Suggested
- Articles Suggested
- Crawl Errors

---

# Knowledge Gap Queue

Display

- Topic
- Number of Requests
- Confidence
- Suggested Ontology
- Suggested Entities
- Suggested Relationships
- Status
- Assigned Researcher

Actions

- Assign
- Merge
- Reject
- Archive
- Convert to Research Task

---

# Research Assistant Settings

Configure

- Enabled
- Allowed Roles
- Maximum Context
- Temperature
- Token Limit
- Citation Requirement

---

# Article Expansion Settings

Configure

- Enabled
- Maximum Expansion Length
- Search Knowledge Graph First
- Allow External Knowledge
- Save Expansion
- Session Lifetime

Rules

Generated content is never persisted as canonical content.

---

# AI Policies

Configure

- Default Provider
- Maximum Tokens
- Retry Count
- Timeout
- Cache Duration
- Hallucination Policy
- Citation Requirement
- External Search Policy

---

# AI Audit

Display

- User
- Provider
- Prompt
- Tokens
- Cost
- Status
- Timestamp

Search

- By User
- By Provider
- By Feature
- By Date

---

# AI Analytics

Reports

- Most Requested Topics
- Most Expanded Articles
- Most Used Providers
- Most Expensive Requests
- Average Response Time
- Knowledge Gaps
- Trending Topics

---

# Permissions

Researchers

- Use Research Assistant

Editors

- Use Research Assistant
- View Knowledge Gaps

Administrators

- Full AI Management
- Prompt Management
- Provider Management
- Policy Management
- Crawl Management
- Analytics
- Audit

---

# Enterprise Rules

No AI-generated content becomes published automatically.

No AI-generated entity becomes canonical automatically.

No AI-generated relationship becomes canonical automatically.

All AI suggestions require human approval before entering the Knowledge Graph.

The Knowledge Graph remains the authoritative source of truth.