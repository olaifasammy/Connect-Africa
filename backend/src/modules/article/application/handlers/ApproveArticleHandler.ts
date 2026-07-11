import { ApproveArticleCommand } from '../commands/ApproveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';

export class ApproveArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly auditLogger: IAuditLogger
  ) {}

  async handle(command: ApproveArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.approve();
    await this.repository.save(article);
    await this.auditLogger.log('ARTICLE_APPROVED', { articleId: command.articleId.toString() });
  }
}
