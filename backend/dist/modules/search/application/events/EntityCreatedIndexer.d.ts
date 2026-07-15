import { EntityCreatedEvent } from '../../../entity/domain/events/EntityCreatedEvent';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
export interface IDomainEventHandler<T> {
    handle(event: T): Promise<void>;
}
export declare class EntityCreatedIndexer implements IDomainEventHandler<EntityCreatedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: EntityCreatedEvent): Promise<void>;
}
