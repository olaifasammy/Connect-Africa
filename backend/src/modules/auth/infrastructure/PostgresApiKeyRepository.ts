import { Pool } from 'pg';
import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IApiKeyRepository, ApiKeyRecord } from '../domain/repositories/IApiKeyRepository';

@provide('IApiKeyRepository', true)
@injectable()
export class PostgresApiKeyRepository implements IApiKeyRepository {
  constructor(@inject('PostgresPool') private readonly pool: Pool) {}

  async save(record: ApiKeyRecord): Promise<void> {
    const query = `
      INSERT INTO api_keys (
        id,
        user_id,
        name,
        prefix,
        key_hash,
        scopes,
        is_active,
        expires_at,
        created_at,
        last_used_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        scopes = EXCLUDED.scopes,
        is_active = EXCLUDED.is_active,
        expires_at = EXCLUDED.expires_at,
        last_used_at = EXCLUDED.last_used_at
    `;

    await this.pool.query(query, [
      record.id,
      record.userId,
      record.name,
      record.prefix,
      record.keyHash,
      record.scopes,
      record.isActive,
      record.expiresAt || null,
      record.createdAt,
      record.lastUsedAt || null,
    ]);
  }

  async findById(id: string): Promise<ApiKeyRecord | null> {
    const result = await this.pool.query(
      'SELECT id, user_id, name, prefix, key_hash, scopes, is_active, expires_at, created_at, last_used_at FROM api_keys WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async findByPrefix(prefix: string): Promise<ApiKeyRecord | null> {
    const result = await this.pool.query(
      'SELECT id, user_id, name, prefix, key_hash, scopes, is_active, expires_at, created_at, last_used_at FROM api_keys WHERE prefix = $1',
      [prefix]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async findByUserId(userId: string): Promise<ApiKeyRecord[]> {
    const result = await this.pool.query(
      'SELECT id, user_id, name, prefix, key_hash, scopes, is_active, expires_at, created_at, last_used_at FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows.map(row => this.mapRow(row));
  }

  async revoke(id: string): Promise<void> {
    await this.pool.query('UPDATE api_keys SET is_active = false WHERE id = $1', [id]);
  }

  async updateLastUsed(id: string): Promise<void> {
    await this.pool.query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1', [id]);
  }

  private mapRow(row: any): ApiKeyRecord {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      prefix: row.prefix,
      keyHash: row.key_hash,
      scopes: row.scopes || [],
      isActive: row.is_active,
      expiresAt: row.expires_at ? new Date(row.expires_at) : undefined,
      createdAt: new Date(row.created_at),
      lastUsedAt: row.last_used_at ? new Date(row.last_used_at) : undefined,
    };
  }
}
