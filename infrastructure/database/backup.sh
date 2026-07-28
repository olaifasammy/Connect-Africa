#!/bin/bash
# Backup script for PostgreSQL database

set -e

# Usage: ./backup.sh <backup_filename>
if [ -z "$1" ]; then
  echo "Usage: $0 <backup_filename>"
  exit 1
fi

# DATABASE_URL should be set in the environment
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set."
  exit 1
fi

echo "Starting backup..."
pg_dump "$DATABASE_URL" > "$1"
echo "Backup saved to $1"
