import { IRelationshipEvidenceRepository } from '../../domain/repositories/IRelationshipEvidenceRepository';
import { RelationshipEvidence } from '../../domain/entities/RelationshipEvidence';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
/**
 * PostgreSQL implementation of Relationship Evidence Repository.
 */
export declare class PostgresRelationshipEvidenceRepository implements IRelationshipEvidenceRepository {
    private readonly provider;
    constructor(provider: PostgresProvider);
    save(evidence: RelationshipEvidence): Promise<void>;
    findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipEvidence[]>;
}
