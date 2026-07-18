import { ArticlePublishedEvent } from '../../../article/public';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { IDomainEventHandler } from '../../../search/application/events/EntityCreatedIndexer';
export declare class ArticlePublishedIndexer implements IDomainEventHandler<ArticlePublishedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: ArticlePublishedEvent): Promise<void>;
}
