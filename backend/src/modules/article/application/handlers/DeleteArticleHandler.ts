import { DeleteArticleCommand } from '../commands/DeleteArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { ArticleDeletedEvent } from '../../domain/events/ArticleDeletedEvent';

export class DeleteArticleHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(command: DeleteArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    await this.repository.delete(command.articleId);
    // (article as any).addDomainEvent(new ArticleDeletedEvent(article.id));
  }
}
