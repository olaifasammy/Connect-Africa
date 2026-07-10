import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../domain/entities/Relationship';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
/**
 * PostgreSQL implementation of Relationship Repository.
 */
export declare class PostgresRelationshipRepository implements IRelationshipRepository {
    private readonly provider;
    constructor(provider: PostgresProvider);
    save(relationship: Relationship): Promise<void>;
    findById(id: RelationshipId): Promise<Relationship | null>;
    exists(relationship: Relationship): Promise<boolean>;
    delete(id: RelationshipId): Promise<void>;
    list(limit: number, offset: number): Promise<Relationship[]>;
}
