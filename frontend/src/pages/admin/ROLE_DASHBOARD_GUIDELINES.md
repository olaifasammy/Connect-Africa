# Connect Africa Administration & Role-Based Dashboard Architecture

## 1. Scout Analysis Report: `AdminmainDash.png`

The main administrative control center (`Connect-Africa Studio`) layout is structured into four primary zones:

### Zone 1: Left Sidebar Navigation
- **Brand Header:** "CONNECT-AFRICA STUDIO" with logo icon.
- **Main Menu:** Dashboard (active state).
- **Knowledge Section:** Entities, Relationships, Ontology, Knowledge Graph.
- **Content Section:** Articles, Media, Sources.
- **Governance Section:** Users, Roles, Permissions, Audit Logs.
- **Analytics Section:** Metrics, Monitoring.
- **Operations Section:** Import, Export, Backups, Settings.
- **Footer:** Collapse sidebar toggle.

### Zone 2: Top Header Bar
- **Global Search Bar:** "Search entities, articles, users..." with `Ctrl + K` shortcut.
- **Utility Icons:** Help, Notifications (badge count `12`), Theme toggle.
- **User Profile:** Avatar, Name, Role badge ("Super Admin").

### Zone 3: Main Content Area (Multi-Grid)
- **Welcome Banner:** Greeting, subtitle, and dynamic date range picker.
- **Top Metrics Grid (8 Cards):**
  1. Total Entities
  2. Relationships
  3. Articles
  4. Sources
  5. Users
  6. Active Sessions
  7. System Health
  8. Pending Tasks
- **Middle Row Dual Charts:**
  - *Knowledge Graph Overview:* Interactive network graph with node/edge topology.
  - *Knowledge Growth Chart:* Multi-series line chart tracking entities, relationships, articles, and sources over time.
- **Bottom Table (Recent Entities):** Entity list with status badges, quality progress bars, and metadata.

### Zone 4: Right Companion Sidebar
- **System Health Widget:** Circular progress gauge (`98%` operational).
- **Recent Activity Feed:** Chronological event stream with timestamps.
- **Quick Actions Grid:** 2x2 grid for rapid administrative actions (+ Entity, Add Article, Upload Media, Import Data).

---

## 2. Role-Based Dashboard Separation & Integration Plan

To prevent routing every privileged user to the top-level Administrator control center (`AdminmainDash`), management views are decoupled into dedicated workspaces per role while sharing a modular UI design system:

### Role-Tailored Workspaces
1. **`AUTHOR` (Content Author Workspace):**
   - Personal contribution stats, article drafting, entity record creation, source citations, media uploads.
2. **`EDITOR` (Editorial & Graph Management Dashboard):**
   - Editorial pipeline, knowledge graph topology editor, publishing/versioning tools, search index health.
   - *Constraint:* Can manage contents and entities, but **cannot** manage platform ontology.
3. **`REVIEWER` (Quality Control & Approval Dashboard):**
   - Review queue for submissions, entity verification and quality score inspection, audit log monitoring, approval/rejection workflows, submitting content/knowledge for archiving.
4. **`ADMINISTRATOR` & `SUPER_ADMINISTRATOR` (Global Platform Control Center):**
   - Full global metrics (`AdminmainDash`), governance (users, roles, permissions, sessions, API keys, banning/suspending/deleting users), intelligence/crawlers, observability, operations, system settings, and **Ontology management**.

---

## 3. Strict Authorization & Security Rules

1. **Deletion Rights:**
   - **Only** `ADMINISTRATOR` or `SUPER_ADMINISTRATOR` have permission to permanently delete resources (users, content, knowledge entities, relationships, etc.).
2. **Moderation & Archiving:**
   - Non-admin privileged roles (`EDITOR`, `REVIEWER`, etc.) may ban, suspend, unban, unsuspend users, and submit content or knowledge entities/articles for **archiving** rather than permanent deletion.
3. **Ontology Restrictions:**
   - Platform ontology management (schema, entity types, relationship types) is **strictly restricted to Admins** (`ADMINISTRATOR` / `SUPER_ADMINISTRATOR`). Other roles can create/update contents and entities within the existing ontology but cannot alter the ontology itself.
