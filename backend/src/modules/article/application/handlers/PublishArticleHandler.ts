import { PublishArticleCommand } from '../commands/PublishArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';

export class PublishArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly auditLogger: IAuditLogger
  ) {}

  async handle(command: PublishArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.publish();
    await this.repository.save(article);
    await this.auditLogger.log('ARTICLE_PUBLISHED', { articleId: command.articleId.toString() });
  }
}
