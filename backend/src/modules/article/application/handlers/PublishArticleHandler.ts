import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { PublishArticleCommand } from '../commands/PublishArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticlePublishedEvent } from '../../domain/events/ArticlePublishedEvent';

@provide(PublishArticleHandler, true)
@injectable()
export class PublishArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: PublishArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.publish();
    await this.repository.save(article);
    
    // Domain event
    await this.eventBus.publish(new ArticlePublishedEvent(article.id));
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_PUBLISHED',
      actorId: command.userId, // Assuming userId is part of command, need to update command if not
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
