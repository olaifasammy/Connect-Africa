import { RelationshipDeletedEvent } from '../../../relationship/domain/events/RelationshipEvents';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { IRelationshipRepository } from '../../../relationship/domain/repositories/IRelationshipRepository';
export declare class RelationshipDeletedHandler {
    private readonly repository;
    private readonly relationshipRepository;
    constructor(repository: IGraphRepository, relationshipRepository: IRelationshipRepository);
    handle(event: RelationshipDeletedEvent): Promise<void>;
}
