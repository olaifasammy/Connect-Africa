import { RestoreArticleCommand } from '../commands/RestoreArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IRevisionRepository } from '../../domain/repositories/IRevisionRepository';

export class RestoreArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly revisionRepository: IRevisionRepository
  ) {}

  async handle(command: RestoreArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Assuming revision exists. In real app, need to fetch from repository
    // const revision = await this.revisionRepository.findById(command.revisionId);
    
    // For this implementation, we assume logic is in Revision entity
    // article.restoreFromRevision(revision);
    
    await this.repository.save(article);
  }
}
