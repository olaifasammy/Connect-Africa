import { RelationshipDeletedEvent } from '../../../relationship/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { IRelationshipRepository } from '../../../relationship/public';
export declare class RelationshipDeletedHandler {
    private readonly repository;
    private readonly relationshipRepository;
    constructor(repository: IGraphRepository, relationshipRepository: IRelationshipRepository);
    handle(event: RelationshipDeletedEvent): Promise<void>;
}
