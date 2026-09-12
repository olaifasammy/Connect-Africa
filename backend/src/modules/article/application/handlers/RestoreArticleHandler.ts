import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { RestoreArticleCommand } from '../commands/RestoreArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IRevisionRepository } from '../../domain/repositories/IRevisionRepository';

@provide(RestoreArticleHandler, true)
@injectable()
export class RestoreArticleHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,

    @inject('IRevisionRepository')
    private readonly revisionRepository: IRevisionRepository,
  ) {}

  async handle(
    command: RestoreArticleCommand,
  ): Promise<void> {
    const article =
      await this.repository.findById(
        command.articleId,
      );

    if (!article) {
      throw new Error('Article not found');
    }

    const revision =
      await this.revisionRepository.findById(
        command.revisionId,
      );

    if (!revision) {
      throw new Error('Revision not found');
    }

    if (
      !revision.articleId.equals(
        command.articleId,
      )
    ) {
      throw new Error(
        'Revision does not belong to the requested article',
      );
    }

    article.restoreFromRevision(revision.contentSnapshot);

    await this.repository.save(article);
  }
}
