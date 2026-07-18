import { OntologyCreatedEvent } from '../../../ontology/public';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { IDomainEventHandler } from '../../../search/application/events/EntityCreatedIndexer';
export declare class OntologyCreatedIndexer implements IDomainEventHandler<OntologyCreatedEvent> {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(event: OntologyCreatedEvent): Promise<void>;
}
