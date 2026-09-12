import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ApproveArticleCommand } from '../commands/ApproveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticleApprovedEvent } from '../../domain/events/ArticleApprovedEvent';

@provide(ApproveArticleHandler, true)
@injectable()
export class ApproveArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: ApproveArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.approve();
    await this.repository.save(article);
    
    // Domain event
    await this.eventBus.publish(new ArticleApprovedEvent(article.id));
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_APPROVED',
      actorId: command.userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: article.id.toString(),
      resourceType: 'ARTICLE',
      metadata: [
        { key: 'status', value: 'SUCCESS' },
        { key: 'previousState', value: previousState },
        { key: 'newState', value: article.status }
      ]
    }));
  }
}
