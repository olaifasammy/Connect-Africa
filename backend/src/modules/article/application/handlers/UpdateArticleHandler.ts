import { UpdateArticleCommand } from '../commands/UpdateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';

export class UpdateArticleHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(command: UpdateArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.update(command.title, command.summary, command.content);
    await this.repository.save(article);
  }
}
