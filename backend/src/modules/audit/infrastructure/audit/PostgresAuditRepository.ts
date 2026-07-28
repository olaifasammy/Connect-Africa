import { UserId, IPAddress, UserAgent, ResourceId } from '../../domain/value-objects/AuditValueObjects';
import { Pool } from 'pg';
import { IAuditRepository } from '../../domain/repositories/IAuditRepository';
import { AuditEntry } from '../../domain/aggregates/AuditEntry';
import { AuditSearchCriteria } from '../../domain/repositories/AuditSearchCriteria';
import { AuditId, CorrelationId, Timestamp } from '../../domain/value-objects/AuditValueObjects';
import { AuditActor } from '../../domain/entities/AuditActor';
import { AuditResource } from '../../domain/entities/AuditResource';
import { AuditMetadata } from '../../domain/entities/AuditMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PostgresAuditRepository implements IAuditRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async log(entry: AuditEntry): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query(`
        INSERT INTO audit_entries (id, correlation_id, actor_id, actor_type, resource_id, resource_type, action, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        entry.id.toString(),
        entry.correlationId.getProps().value,
        entry.actor.userId.toString(),
        entry.actor.actorType,
        entry.resource.resourceId.toString(),
        entry.resource.type,
        entry.action,
        entry.timestamp.getProps().value
      ]);

      for (const meta of entry.metadata) {
        await client.query(
          'INSERT INTO audit_metadata (id, audit_entry_id, key, value) VALUES ($1, $2, $3, $4)',
          [meta.id.toString(), entry.id.toString(), meta.key, meta.value]
        );
      }

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async search(criteria: AuditSearchCriteria): Promise<AuditEntry[]> {
    const params: any[] = [];
    let query = `
      SELECT e.*, m.id as m_id, m.key, m.value
      FROM audit_entries e
      LEFT JOIN audit_metadata m ON e.id = m.audit_entry_id
      WHERE 1=1
    `;
    
    if (criteria.userId) {
      params.push(criteria.userId);
      query += ` AND e.actor_id = $${params.length}`;
    }
    if (criteria.resourceId) {
      params.push(criteria.resourceId);
      query += ` AND e.resource_id = $${params.length}`;
    }
    
    query += ' ORDER BY e.timestamp DESC';
    
    const result = await this.pool.query(query, params);
    
    return this.mapRowsToEntries(result.rows);
  }

  async findById(id: string): Promise<AuditEntry | null> {
    const result = await this.pool.query(`
      SELECT e.*, m.id as m_id, m.key, m.value
      FROM audit_entries e
      LEFT JOIN audit_metadata m ON e.id = m.audit_entry_id
      WHERE e.id = $1
    `, [id]);
    
    if (result.rows.length === 0) return null;
    
    return this.mapRowsToEntries(result.rows)[0];
  }

  private mapRowsToEntries(rows: any[]): AuditEntry[] {
    const entriesMap = new Map<string, any>();
    
    for (const row of rows) {
      if (!entriesMap.has(row.id)) {
        entriesMap.set(row.id, {
          id: row.id,
          correlationId: row.correlation_id,
          actor: { id: row.actor_id, type: row.actor_type },
          resource: { id: row.resource_id, type: row.resource_type },
          action: row.action,
          timestamp: row.timestamp,
          metadata: []
        });
      }
      
      if (row.m_id) {
        entriesMap.get(row.id).metadata.push({
          id: row.m_id,
          key: row.key,
          value: row.value
        });
      }
    }
    
    return Array.from(entriesMap.values()).map(data => AuditEntry.create({
      action: data.action,
      actor: AuditActor.create({
        userId: new UserId(data.actor.id),
        actorType: data.actor.type,
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(data.resource.id),
        type: data.resource.type
      }),
      metadata: data.metadata.map((m: any) => AuditMetadata.create({ key: m.key, value: m.value }, new UniqueEntityId(m.id))),
      correlationId: new CorrelationId(data.correlationId),
      timestamp: new Timestamp(new Date(data.timestamp))
    }, new AuditId(data.id)));
  }
}
