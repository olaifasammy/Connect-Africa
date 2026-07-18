import { RelationshipCreatedEvent } from '../../../relationship/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
export declare class RelationshipCreatedHandler {
    private readonly repository;
    private readonly ontologyValidator;
    constructor(repository: IGraphRepository, ontologyValidator: OntologyValidator);
    handle(event: RelationshipCreatedEvent): Promise<void>;
}
