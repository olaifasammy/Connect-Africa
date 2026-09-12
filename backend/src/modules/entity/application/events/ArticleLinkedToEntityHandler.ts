import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ArticleUpdatedEvent } from '@modules/article/public';

@provide(ArticleLinkedToEntityHandler, true)
@injectable()
export class ArticleLinkedToEntityHandler {
  async handle(event: ArticleUpdatedEvent): Promise<void> {
    if (event.entityIds && event.entityIds.length > 0) {
      console.log(`Entity linked to article: ${event.articleId.toString()} - Entities: ${event.entityIds.map(id => id.toString()).join(', ')}`);
      // Future: Update entity record to reflect the link
    }
  }
}
