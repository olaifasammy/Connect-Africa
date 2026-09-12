import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Article } from '../../domain/entities/Article';

export interface ArticleSearchDocument {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  categories: string[];
  status: string;
}

@provide(ArticleSearchIndexer, true)
@injectable()
export class ArticleSearchIndexer {
  public static toDocument(article: Article): ArticleSearchDocument {
    return {
      id: article.id.toString(),
      title: article.title,
      summary: article.summary,
      content: article.content,
      tags: article.tags.map(t => t.value),
      categories: article.categories.map(c => c.name),
      status: article.status,
    };
  }
}
