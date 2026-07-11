import { SubmitForReviewCommand } from '../commands/SubmitForReviewCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';

export class SubmitForReviewHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(command: SubmitForReviewCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.submitForReview();
    await this.repository.save(article);
  }
}
