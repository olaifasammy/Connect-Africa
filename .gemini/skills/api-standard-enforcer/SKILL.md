---
name: api-standard-enforcer
description: Scaffolds compliant API Controllers, DTOs, and Zod schemas. Use when creating new API endpoints to ensure consistent response structure and validation.
---

# API Standard Enforcer

## Overview

This skill ensures that all new API endpoints strictly adhere to the mandatory JSON response structure, Zod-based validation, and error handling patterns defined in `EngineV2/06-CodingStandards.md`.

## Usage

When creating a new API endpoint, trigger this skill to:
1. Generate the Controller, DTO, and Zod validation schema.
2. Enforce the required `{ "success": true, "data": ... }` response format.
3. Integrate typed error handling.

## Workflow

### 1. Identify Endpoint Details
Determine the resource, method (GET/POST/PUT/DELETE), and the context that owns it.

### 2. Trigger Generator
Run the generator script:
`node scripts/generate_endpoint.cjs <resource-name> <method> <context-name>`

### 3. Verify
Check the generated files against the standards in `EngineV2/06-CodingStandards.md`.

## Resources
- [06-CodingStandards.md](/Docs/EngineV2/06-CodingStandards.md)
