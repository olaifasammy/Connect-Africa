import { ArticleUpdatedEvent } from '@modules/article/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

export class ArticleUpdatedHandler {
  constructor(private readonly repository: IGraphRepository) {}

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
