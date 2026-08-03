import { OutboxEntry } from '../entities/OutboxEntry';

export interface IOutboxRepository {
  save(entry: OutboxEntry): Promise<void>;
  getPending(limit: number): Promise<OutboxEntry[]>;
  markProcessed(id: string): Promise<void>;
}
