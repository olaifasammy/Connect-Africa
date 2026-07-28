#!/bin/bash
# Restore script for PostgreSQL database

set -e

# Usage: ./restore.sh <backup_filename>
if [ -z "$1" ]; then
  echo "Usage: $0 <backup_filename>"
  exit 1
fi

# DATABASE_URL should be set in the environment
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set."
  exit 1
fi

echo "Warning: This will overwrite the current database!"
read -p "Are you sure? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi

echo "Starting restore..."
psql "$DATABASE_URL" < "$1"
echo "Restore completed."
