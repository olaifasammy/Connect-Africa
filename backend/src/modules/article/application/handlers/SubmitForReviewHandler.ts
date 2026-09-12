import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { SubmitForReviewCommand } from '../commands/SubmitForReviewCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ArticleSubmittedEvent } from '../../domain/events/ArticleSubmittedEvent';

@provide(SubmitForReviewHandler, true)
@injectable()
export class SubmitForReviewHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: SubmitForReviewCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const previousState = article.status;
    article.submitForReview();
    await this.repository.save(article);

    await this.eventBus.publish(new ArticleSubmittedEvent(article.id));

    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARTICLE_SUBMITTED',
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
