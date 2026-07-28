# Docker Infrastructure

This directory contains containerization configurations for the Connect-Africa platform.

## Files
- `Dockerfile`: Multi-stage build definition for the backend service.
- `docker-compose.yml`: Orchestrates the backend and required services (PostgreSQL, Redis).

## Usage
To build and run the services from the project root:

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```
