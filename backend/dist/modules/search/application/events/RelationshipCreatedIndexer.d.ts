import { RelationshipCreatedEvent } from '../../../relationship/domain/events/RelationshipCreatedEvent';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { IDomainEventHandler } from '../../../search/application/events/EntityCreatedIndexer';
export declare class RelationshipCreatedIndexer implements IDomainEventHandler<RelationshipCreatedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: RelationshipCreatedEvent): Promise<void>;
}
