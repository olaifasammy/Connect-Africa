import { ApproveArticleCommand } from '../commands/ApproveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';
import { ArticleApprovedEvent } from '../../domain/events/ArticleApprovedEvent';

export class ApproveArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: ApproveArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.approve();
    await this.repository.save(article);
    
    // Domain event
    await this.eventBus.publish(new ArticleApprovedEvent(article.id));
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_APPROVED',
      actorId: 'SYSTEM',
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: article.id.toString(),
      resourceType: 'ARTICLE',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
