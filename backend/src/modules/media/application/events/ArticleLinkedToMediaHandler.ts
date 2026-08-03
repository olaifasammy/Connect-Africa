import { ArticleUpdatedEvent } from '@modules/article/public';

export class ArticleLinkedToMediaHandler {
  async handle(event: ArticleUpdatedEvent): Promise<void> {
    // Media handling logic
    console.log(`Media linked to article: ${event.articleId.toString()}`);
    // Future: Update media record to reflect the link
  }
}
