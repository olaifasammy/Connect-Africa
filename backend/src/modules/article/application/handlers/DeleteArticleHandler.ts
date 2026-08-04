import { DeleteArticleCommand } from '../commands/DeleteArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { ArticleDeletedEvent } from '../../domain/events/ArticleDeletedEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class DeleteArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    await this.repository.delete(command.articleId);
    await this.eventBus.publish(new ArticleDeletedEvent(article.id));
  }
}
