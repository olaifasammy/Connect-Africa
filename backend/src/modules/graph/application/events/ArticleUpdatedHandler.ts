import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ArticleUpdatedEvent } from '@modules/article/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@provide(ArticleUpdatedHandler, true)
@injectable()
export class ArticleUpdatedHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository
  ) {}

  async handle(event: ArticleUpdatedEvent): Promise<void> {
    // ArticleUpdatedEvent provides articleId and entityIds it links to.
    for (const entityId of event.entityIds) {
      const node = await this.repository.findById(entityId.toString());
      if (node) {
        node.updateMetadata({ lastArticleUpdate: event.articleId.toString() });
        await this.repository.updateNode(node.entityId, node.metadata);
      }
    }
  }
}
