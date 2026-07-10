import { Pool } from 'pg';
import { IAuditRepository, AuditEntry } from '../../domain/repositories/IAuditRepository';

export { AuditEntry } from '../../domain/repositories/IAuditRepository';

export class PostgresAuditRepository implements IAuditRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
    console.log('PostgresAuditRepository constructor, pool:', !!this.pool);
  }

  async log(entry: AuditEntry): Promise<void> {
    const query = `
      INSERT INTO audit_logs (user_id, action, resource, status, ip_address, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
    `;
    await this.pool.query(query, [entry.user, entry.action, entry.resource, entry.status, entry.ipAddress]);
  }
}
