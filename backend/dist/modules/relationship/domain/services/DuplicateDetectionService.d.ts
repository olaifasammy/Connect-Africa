import { Relationship } from '../entities/Relationship';
import { IRelationshipRepository } from '../repositories/IRelationshipRepository';
/**
 * Service responsible for detecting duplicate relationship instances.
 */
export declare class DuplicateDetectionService {
    private readonly repository;
    constructor(repository: IRelationshipRepository);
    exists(relationship: Relationship): Promise<boolean>;
}
