import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { RejectArticleCommand } from '../commands/RejectArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticleRejectedEvent } from '../../domain/events/ArticleRejectedEvent';

@provide(RejectArticleHandler, true)
@injectable()
export class RejectArticleHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: RejectArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.reject();
    await this.repository.save(article);

    await this.eventBus.publish(new ArticleRejectedEvent(article.id));

    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_REJECTED',
      actorId: command.userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: article.id.toString(),
      resourceType: 'ARTICLE',
      metadata: [
        { key: 'status', value: 'SUCCESS' },
        { key: 'previousState', value: previousState },
        { key: 'newState', value: article.status },
        ...(command.reason ? [{ key: 'reason', value: command.reason }] : [])
      ]
    }));
  }
}
