import { Pool } from 'pg';
import { IOutboxRepository } from '../../domain/repositories/IOutboxRepository';
import { OutboxEntry } from '../../domain/entities/OutboxEntry';
import { UniqueEntityId } from '../../domain/UniqueEntityId';

export class PostgresOutboxRepository implements IOutboxRepository {
  constructor(private readonly pool: Pool) {}

  async save(entry: OutboxEntry): Promise<void> {
    await this.pool.query(
      'INSERT INTO outbox (id, event_type, payload, created_at, processed) VALUES ($1, $2, $3, $4, $5)',
      [entry.id.toString(), entry.eventType, JSON.stringify(entry.payload), entry.createdAt, entry.processed]
    );
  }

  async getPending(limit: number): Promise<OutboxEntry[]> {
    const { rows } = await this.pool.query(
      'SELECT id, event_type, payload, created_at FROM outbox WHERE processed = false ORDER BY created_at ASC LIMIT $1',
      [limit]
    );
    return rows.map(row => new OutboxEntry(
      new UniqueEntityId(row.id),
      row.event_type,
      row.payload,
      row.created_at
    ));
  }

  async markProcessed(id: string): Promise<void> {
    await this.pool.query('UPDATE outbox SET processed = true WHERE id = $1', [id]);
  }
}
