import { ExpansionRequestService, KnowledgeGapService } from '../../../../ai/public';
import { logger } from '@shared/logger/Logger';

export class ArticleExpansionService {
  constructor(
    private readonly expansionService: ExpansionRequestService,
    private readonly knowledgeGapService: KnowledgeGapService
  ) {}

  async expandArticle(content: string, articleId: string): Promise<string> {
    try {
      // 1. Request expansion from AI Bounded Context
      const expandedContent = await this.expansionService.requestExpansion(content);
      return expandedContent;
    } catch (error) {
      // 2. Log knowledge gap if expansion fails or indicates missing knowledge
      logger.error('Expansion failed', error);
      await this.knowledgeGapService.recordGap(`Article:${articleId}`, content);
      throw new Error('Expansion service unavailable');
    }
  }
}
