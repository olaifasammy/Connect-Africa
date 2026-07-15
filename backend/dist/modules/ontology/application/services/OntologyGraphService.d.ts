import { IOntologyGraphService } from './IOntologyGraphService';
import { IEntityTypeRepository } from '../../../ontology/domain/repositories/IEntityTypeRepository';
import { IRelationshipTypeRepository } from '../../../ontology/domain/repositories/IRelationshipTypeRepository';
export declare class OntologyGraphService implements IOntologyGraphService {
    private readonly entityTypeRepository;
    private readonly relationshipTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository, relationshipTypeRepository: IRelationshipTypeRepository);
    validateEntityType(entityTypeId: string): Promise<boolean>;
    validateRelationshipType(relationshipTypeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<boolean>;
    validateCardinality(relationshipTypeId: string, sourceEntityTypeId: string): Promise<boolean>;
    validateMetadataSchema(entityTypeId: string, metadata: Record<string, any>): Promise<boolean>;
}
