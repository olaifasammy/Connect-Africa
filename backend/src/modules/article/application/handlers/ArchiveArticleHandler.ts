import { ArchiveArticleCommand } from '../commands/ArchiveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';

export class ArchiveArticleHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(command: ArchiveArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.archive();
    await this.repository.save(article);
  }
}
