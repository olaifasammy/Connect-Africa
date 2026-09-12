# Connect-Africa AI Architecture

Version: 1.0

Status: Authoritative

---

# Purpose

This document defines the Artificial Intelligence architecture of Connect-Africa.

AI is implemented as an independent bounded context.

It provides intelligence to other bounded contexts while never owning business data.

The AI Context never replaces Domain logic.

It augments it.

---

# Principles

The AI Context shall:

- Never modify domain data directly.
- Never bypass domain services.
- Never publish content automatically.
- Never create entities automatically.
- Never create relationships automatically.
- Never modify ontology automatically.
- Never bypass authorization.
- Never bypass audit logging.

Every AI action must pass through Application Services.

---

# AI Bounded Context

AI consists of the following services:

- Research Assistant
- Topic Intelligence Indexer
- Article Expansion Engine
- Prompt Library
- AI Gateway
- Provider Manager
- Knowledge Gap Engine
- Token Usage Tracker
- AI Analytics
- AI Audit

---

# AI Gateway

Every AI request passes through the AI Gateway.

Responsibilities

- Provider abstraction
- Retry
- Fallback
- Timeout
- Prompt logging
- Cost tracking
- Token tracking
- Rate limiting

No bounded context may communicate directly with OpenAI, Gemini, Claude, or any LLM provider.

---

# Supported Providers

Examples

- Gemini
- OpenAI
- Anthropic
- Azure OpenAI
- Local LLM

Providers are interchangeable.

---

# Provider Selection

The gateway decides:

- Primary provider
- Fallback provider
- Timeout
- Retry policy

---

# Research Assistant

Purpose

Assist researchers while creating knowledge.

Available to

- Researchers
- Editors
- Administrators

Capabilities

- Summarize
- Explain
- Compare
- Suggest sources
- Suggest entities
- Suggest relationships
- Suggest ontology
- Suggest article structure
- Detect conflicts

Restrictions

- Never publish
- Never edit articles
- Never create entities
- Never modify ontology

Human approval required.

---

# Topic Intelligence Indexer

Purpose

Continuously discover knowledge from trusted sources.

Administrator only.

Capabilities

- Crawl websites
- Discover entities
- Discover relationships
- Suggest ontology
- Detect duplicates
- Discover missing articles
- Detect trending topics

Outputs

Everything enters approval queues.

Nothing is published automatically.

---

# Article Expansion Engine

Purpose

Temporarily expand articles for readers.

This is NOT a chatbot.

This is NOT conversational AI.

The expansion is rendered inside the article.

---

Workflow

Reader opens article

↓

Reader types

Example

Expand the impact of fermented foods.

↓

AI searches Connect-Africa first.

↓

If found

Generate contextual expansion.

↓

If not found

Generate temporary expansion.

↓

Log Knowledge Gap.

---

Rules

The canonical article NEVER changes.

Generated text is NOT saved into the database.

Generated text exists only during the user's session.

---

Save Reading

Users may save generated expansions into their private reading collection.

Saved expansions never become published articles.

---

Knowledge Gap Engine

Whenever AI cannot find sufficient knowledge it creates:

- Topic
- Requested prompt
- Suggested entities
- Suggested relationships
- Suggested ontology
- Confidence
- Frequency

This becomes an Editorial Task.

---

Prompt Library

All prompts are versioned.

Examples

- Research Prompt
- Expansion Prompt
- Entity Extraction Prompt
- Relationship Extraction Prompt
- Ontology Suggestion Prompt

Prompts are editable by administrators.

---

AI Analytics

Track

- Requests
- Cost
- Tokens
- Latency
- Success rate
- Failure rate
- Popular topics
- Missing knowledge
- Provider usage

---

AI Audit

Every request records

- User
- Provider
- Prompt
- Tokens
- Cost
- Latency
- Timestamp
- Status

---

Architecture Rules

AI may consume

- Entity
- Relationship
- Ontology
- Article
- Search

AI may never own

- Entity
- Relationship
- Ontology
- Article

The Knowledge Graph remains the single source of truth.