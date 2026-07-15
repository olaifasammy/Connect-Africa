import { UserCreatedEvent } from '../../../auth/domain/events/UserCreatedEvent';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { IDomainEventHandler } from '../../../search/application/events/EntityCreatedIndexer';
export declare class UserCreatedIndexer implements IDomainEventHandler<UserCreatedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: UserCreatedEvent): Promise<void>;
}
