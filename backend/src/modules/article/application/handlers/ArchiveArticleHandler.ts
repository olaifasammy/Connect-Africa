import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { ArchiveArticleCommand } from '../commands/ArchiveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticleArchivedEvent } from '../../domain/events/ArticleArchivedEvent';

@provide(ArchiveArticleHandler, true)
@injectable()
export class ArchiveArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: ArchiveArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.archive();
    await this.repository.save(article);

    await this.eventBus.publish(new ArticleArchivedEvent(article.id));

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_ARCHIVED',
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
