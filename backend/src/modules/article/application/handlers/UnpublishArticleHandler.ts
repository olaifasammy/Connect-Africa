import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UnpublishArticleCommand } from '../commands/UnpublishArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticleUnpublishedEvent } from '../../domain/events/ArticleUnpublishedEvent';

@provide(UnpublishArticleHandler, true)
@injectable()
export class UnpublishArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: UnpublishArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.unpublish();
    await this.repository.save(article);

    await this.eventBus.publish(new ArticleUnpublishedEvent(article.id));

    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_UNPUBLISHED',
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
