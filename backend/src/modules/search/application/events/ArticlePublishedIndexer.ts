import { injectable, inject } from 'inversify';
import { ArticlePublishedEvent } from '@modules/article/public';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IDomainEventHandler } from '@modules/search/application/events/EntityCreatedIndexer';

@injectable()
export class ArticlePublishedIndexer implements IDomainEventHandler<ArticlePublishedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: ArticlePublishedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'article',
      (event as any).article.id,
      { 
        title: (event as any).article.title,
        summary: (event as any).article.summary
      }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
