import { SourceCreatedEvent } from '../../../source/domain/events/SourceCreatedEvent';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { IDomainEventHandler } from '../../../search/application/events/EntityCreatedIndexer';
export declare class SourceCreatedIndexer implements IDomainEventHandler<SourceCreatedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: SourceCreatedEvent): Promise<void>;
}
