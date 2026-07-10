import { Relationship } from '../../domain/entities/Relationship';
import { IRelationshipVersionRepository } from '../../domain/repositories/IRelationshipVersionRepository';
/**
 * Application service managing relationship versioning.
 */
export declare class RelationshipVersionService {
    private readonly repository;
    constructor(repository: IRelationshipVersionRepository);
    createVersion(relationship: Relationship, data: Record<string, any>): Promise<void>;
}
