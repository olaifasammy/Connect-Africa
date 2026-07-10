# Connect-Africa Administration Console Specification

Version: 1.0

Status: Authoritative

Depends On:

- FrontendArchitecture.md
- FrontendDefinitionOfDone.md
  Connect-Africa/Docs/Buildcheck/
- Identity Bounded Context
- Ontology Bounded Context
- Entity Bounded Context
- Relationship Bounded Context
- Article Bounded Context
- Search Bounded Context

---

# 1. Purpose

The Administration Console is the operational control center of Connect-Africa.

It allows authorized administrators to govern the platform, manage users, moderate content, maintain the knowledge graph, monitor system health, configure platform behavior, and audit every significant action.

The Admin Console MUST NOT expose functionality unavailable through backend authorization.

Every action must be protected by RBAC.

---

# 2. Dashboard

The dashboard shall display:

- Total Users
- Active Users
- New Users Today
- Verified Users
- Banned Users
- Pending Reports
- Pending Entity Reviews
- Pending Relationship Reviews
- Pending Article Reviews
- Published Articles
- Draft Articles
- Knowledge Graph Statistics
- Ontology Statistics
- Search Statistics
- AI Usage Statistics
- Queue Health
- Database Health
- Redis Health
- Storage Health
- Background Workers
- System Alerts
- Recent Audit Events

---

# 3. User Management

Administrators shall be able to:

✓ Search users

✓ Filter users

✓ View profiles

✓ View activity

✓ Verify email

✓ Reset password

✓ Disable MFA

✓ Require password reset

✓ Suspend account

✓ Ban account

✓ Unban account

✓ Soft delete

✓ Restore account

✓ Permanently delete account

✓ Assign roles

✓ Remove roles

✓ Manage permissions

✓ View login history

✓ View security events

✓ View active sessions

✓ Terminate sessions

✓ View saved research

✓ View bookmarks

✓ View reading history

✓ View authored articles

✓ View uploaded media

✓ View analytics

---

# 4. Roles & Permissions

Support:

- RBAC
- Permission Groups
- Custom Roles

Manage:

- Create Role
- Edit Role
- Delete Role
- Assign Permissions
- Remove Permissions
- Clone Role
- Role Audit

---

# 5. Identity Administration

Manage:

- MFA
- Email Verification
- Account Verification
- Password Policies
- Session Policies
- Login Policies
- JWT Configuration
- Token Revocation

---

# 6. Ontology Administration

Manage:

- Ontologies
- Ontology Versions
- Entity Types
- Relationship Types
- Metadata Definitions
- Cardinality Rules
- Validation Rules
- Ontology Imports
- Ontology Exports

Approve ontology changes before publication.

---

# 7. Entity Administration

Manage:

- Entities
- Draft Entities
- Published Entities
- Archived Entities

Capabilities:

Create

Edit

Merge

Split

Archive

Delete

Restore

Approve

Reject

View History

Compare Versions

Lock Editing

Resolve Conflicts

---

# 8. Relationship Administration

Manage:

- Relationships

Capabilities:

Create

Edit

Delete

Approve

Reject

Merge

Restore

Resolve Conflicts

Visualize Connections

Inspect Integrity

Repair Broken References

---

# 9. Article Administration

Manage:

Drafts

Published

Scheduled

Archived

Deleted

Capabilities:

Review

Approve

Reject

Feature

Unfeature

Pin

Unpin

Lock

Archive

Restore

Delete

Version History

Moderation

---

# 10. Source Administration

Manage:

Academic Sources

Government Sources

News Sources

Books

Research Papers

External Links

Verify sources

Reject sources

Merge duplicates

---

# 11. Media Administration

Manage:

Images

Documents

Videos

Audio

Storage Usage

Duplicate Detection

Virus Scan Results

Broken Files

Unused Media

---

# 12. Search Administration

Manage:

Indexes

Reindex

Search Boost Rules

Ranking

Synonyms

Stop Words

Query Analytics

Popular Searches

Failed Searches

---

# 13. Knowledge Graph Administration

Graph Statistics

Graph Integrity

Broken Nodes

Broken Edges

Duplicate Nodes

Duplicate Relationships

Merge Suggestions

Validation Reports

Graph Visualization

Graph Repair

---

# 14. Moderation

Manage reports for:

Users

Entities

Relationships

Articles

Media

Comments (future)

Actions:

Approve

Reject

Escalate

Suspend

Ban

Delete

Restore

---

# 15. Audit Center

Search audit logs

Filter

Export

View Details

Timeline

User Activity

Entity Activity

Relationship Activity

Administration Activity

Security Events

---

# 16. Analytics

Dashboard

Traffic

Growth

Knowledge Graph Metrics

Content Metrics

User Metrics

Search Metrics

AI Metrics

Performance Metrics

---

# 17. AI Administration

Manage:

Providers

Prompt Templates

Prompt Logs

Token Usage

Model Selection

Rate Limits

Failures

Cost Reports

---

# 18. Notification Administration

Email Templates

System Notifications

Broadcast Messages

Announcements

Maintenance Notices

---

# 19. Settings

Platform

Security

Storage

Search

Analytics

Email

AI

Media

Feature Flags

Maintenance Mode

Localization

---

# 20. Background Jobs

Queue Status

Retry Failed Jobs

Pause Queue

Resume Queue

Worker Health

Scheduled Jobs

Import Jobs

Export Jobs

AI Jobs

Indexing Jobs

---

# 21. Monitoring

CPU

Memory

Storage

Redis

PostgreSQL

Queue

API

Latency

Errors

Background Workers

Health Checks

---

# 22. Reports

Generate:

User Reports

Entity Reports

Relationship Reports

Article Reports

Search Reports

Moderation Reports

Analytics Reports

Export:

CSV

Excel

PDF

JSON

---

# 23. Security Center

Failed Logins

Suspicious Activity

Blocked IPs

Rate Limits

JWT Activity

Permission Changes

Role Changes

Session Monitoring

Audit Timeline

---

# 24. Developer Tools

Environment

Feature Flags

Queue Inspector

API Explorer

Metrics

Logs

Configuration Viewer

---

# 25. Administration UX

Required:

Advanced Tables

Filtering

Sorting

Pagination

Bulk Actions

Context Menus

Confirmation Dialogs

Undo

Keyboard Shortcuts

Command Palette

Responsive Layout

Dark Mode

Accessibility

---

# 26. Global Search

Search across:

Users

Entities

Relationships

Articles

Sources

Media

Ontology

Audit Logs

Settings

---

# 27. RBAC Requirements

Every page

Every action

Every button

Every API call

must be permission protected.

Hidden UI does NOT replace backend authorization.

---

# 28. Audit Requirements

Every write action performed by an administrator MUST generate an audit record.

Minimum:

Administrator

Timestamp

Action

Affected Resource

Previous State

New State

IP Address

Correlation ID

---

# 29. Production Readiness Checklist

The Admin Console is production ready only when:

☐ Dashboard complete

☐ User Management complete

☐ Role Management complete

☐ Identity Management complete

☐ Ontology Management complete

☐ Entity Management complete

☐ Relationship Management complete

☐ Article Management complete

☐ Source Management complete

☐ Media Management complete

☐ Search Management complete

☐ Knowledge Graph Management complete

☐ Moderation complete

☐ Audit Center complete

☐ Analytics complete

☐ AI Administration complete

☐ Notification Administration complete

☐ Settings complete

☐ Background Jobs complete

☐ Monitoring complete

☐ Reports complete

☐ Security Center complete

☐ Developer Tools complete

☐ Global Search complete

☐ RBAC verified

☐ Audit logging verified

☐ Tests passing

☐ Accessibility verified

☐ Performance verified

☐ Production deployment verified

---

# 30. Final Rule

The Administration Console SHALL be capable of operating the entire Connect-Africa platform without requiring direct database access or manual server intervention.

Every operational capability exposed to administrators must be discoverable, auditable, secure, and governed by role-based permissions.

No administrative action shall bypass backend business rules, validation, or authorization.