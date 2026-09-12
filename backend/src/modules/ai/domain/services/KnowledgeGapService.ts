import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { logger } from '@shared/logger/Logger';

@provide(KnowledgeGapService, true)
@injectable()
export class KnowledgeGapService {
  async recordGap(topic: string, prompt: string): Promise<void> {
    // Logic to record a knowledge gap in the system
    logger.info(`[KNOWLEDGE_GAP] Topic: ${topic}, Prompt: ${prompt}`);
  }
}
