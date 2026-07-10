import { IRelationshipVersionRepository } from '../../domain/repositories/IRelationshipVersionRepository';
import { RelationshipVersion } from '../../domain/entities/RelationshipVersion';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
/**
 * PostgreSQL implementation of Relationship Version Repository.
 */
export declare class PostgresRelationshipVersionRepository implements IRelationshipVersionRepository {
    private readonly provider;
    constructor(provider: PostgresProvider);
    save(version: RelationshipVersion): Promise<void>;
    findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipVersion[]>;
}
