import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { v4 as uuidv4 } from 'uuid';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { logger } from '@shared/logger/Logger';

@provide(KnowledgeGapService, true)
@injectable()
export class KnowledgeGapService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  /**
   * Persists an identified knowledge gap (unanswered search or low-confidence query)
   * into the system for editorial and AI crawling review.
   */
  async recordGap(topic: string, prompt: string): Promise<void> {
    const id = uuidv4();
    const status = 'OPEN';

    logger.info(`[KNOWLEDGE_GAP] Recording gap ID ${id} | Topic: ${topic} | Prompt: ${prompt}`);

    const query = `
      INSERT INTO knowledge_gaps (id, topic, prompt, status, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (id) DO NOTHING;
    `;

    await this.postgresProvider.query(query, [id, topic, prompt, status]);
  }
}
