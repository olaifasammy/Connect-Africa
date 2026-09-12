import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Pool } from 'pg';
import { IKnowledgeGapRepository } from '../../domain/repositories/IKnowledgeGapRepository';
import { KnowledgeGap } from '../../domain/entities/KnowledgeGap';

@provide('IKnowledgeGapRepository', true)
@injectable()
export class PostgresKnowledgeGapRepository implements IKnowledgeGapRepository {
  constructor(@inject('PostgresPool') private readonly pool: Pool) {}

  async save(gap: KnowledgeGap): Promise<void> {
    const query = `
      INSERT INTO knowledge_gaps (id, topic, prompt, status, created_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        topic = EXCLUDED.topic,
        prompt = EXCLUDED.prompt,
        status = EXCLUDED.status;
    `;
    await this.pool.query(query, [gap.id, gap.topic, gap.requestedPrompt, gap.status, gap.createdAt]);
  }

  async findById(id: string): Promise<KnowledgeGap | null> {
    const query = 'SELECT * FROM knowledge_gaps WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new KnowledgeGap(row.id, row.topic, row.prompt, row.status, row.created_at);
  }

  async findAllOpen(): Promise<KnowledgeGap[]> {
    const query = 'SELECT * FROM knowledge_gaps WHERE status = $1';
    const result = await this.pool.query(query, ['OPEN']);
    return result.rows.map(row => new KnowledgeGap(row.id, row.topic, row.prompt, row.status, row.created_at));
  }
}
