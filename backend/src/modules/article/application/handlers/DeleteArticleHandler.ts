import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { DeleteArticleCommand } from '../commands/DeleteArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { ArticleDeletedEvent } from '../../domain/events/ArticleDeletedEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(DeleteArticleHandler, true)
@injectable()
export class DeleteArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    await this.repository.delete(command.articleId);
    await this.eventBus.publish(new ArticleDeletedEvent(article.id));
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'DELETE_ARTICLE',
      actorId: command.userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: article.id.toString(),
      resourceType: 'ARTICLE',
      metadata: [
        { key: 'status', value: 'SUCCESS' },
        { key: 'previousState', value: previousState },
        { key: 'newState', value: 'DELETED' }
      ]
    }));
  }
}
