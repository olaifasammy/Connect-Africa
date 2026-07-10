import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';
import { IRelationshipRepository } from '../repositories/IRelationshipRepository';
/**
 * Policy to detect duplicate relationships.
 */
export declare class DuplicateRelationshipPolicy implements IRelationshipPolicy {
    private readonly repository;
    constructor(repository: IRelationshipRepository);
    validate(relationship: Relationship): Promise<void>;
}
