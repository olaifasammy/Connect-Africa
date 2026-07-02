import { Pool } from 'pg';

export interface AuditEntry {
  user: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'FAILURE';
  ipAddress?: string;
}

export class PostgresAuditRepository {
  constructor(private pool: Pool) {}

  async log(entry: AuditEntry): Promise<void> {
    const query = `
      INSERT INTO audit_logs (user_id, action, resource, status, ip_address, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
    `;
    await this.pool.query(query, [entry.user, entry.action, entry.resource, entry.status, entry.ipAddress]);
  }
}
