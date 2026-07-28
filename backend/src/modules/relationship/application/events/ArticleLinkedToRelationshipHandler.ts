import { ArticleUpdatedEvent } from '@modules/article/public';

export class ArticleLinkedToRelationshipHandler {
  async handle(event: ArticleUpdatedEvent): Promise<void> {
    if (event.relationshipIds && event.relationshipIds.length > 0) {
      console.log(`Relationship linked to article: ${event.articleId.toString()} - Relationships: ${event.relationshipIds.map(id => id.toString()).join(', ')}`);
      // Future: Update relationship record to reflect the link
    }
  }
}
