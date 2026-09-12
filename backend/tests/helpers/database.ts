import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

/**
 * Resets the database by truncating all tables and restarting identities.
 * Used for cleanup between individual tests.
 */
export async function cleanupDatabase(pool: Pool) {
  const tables = [
    'article_media',
    'articles',
    'audit_entries',
    'audit_logs',
    'audit_metadata',
    'entities',
    'entity_media',
    'entity_types',
    'media',
    'media_usage',
    'notification_deliveries',
    'notification_preferences',
    'notification_templates',
    'notifications',
    'ontologies',
    'ontology_versions',
    'relationship_evidence',
    'relationship_types',
    'relationship_versions',
    'relationships',
    'settings',
    'user_preferences',
    'user_profiles',
    'users'
  ];
  
  for (const table of tables) {
    // Check if table exists before truncating to avoid errors during initial test runs
    const exists = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', [table]);
    if (exists.rows[0].exists) {
        await pool.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
    }
  }
}

/**
 * Updates a user role directly in the database.
 */
export async function updateUserRole(pool: Pool, userId: string, role: string) {
  await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, userId]);
}

/**
 * Ensures the database schema is in a clean, migrated state.
 * If schema drift is detected, it could re-run migrations.
 */
export async function ensureCleanSchema(pool: Pool) {
  // For now, this just calls cleanup. 
  // In a more complex scenario, this could check for schema hash consistency.
  await cleanupDatabase(pool);
}
