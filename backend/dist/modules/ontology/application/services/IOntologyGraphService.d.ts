export interface IOntologyGraphService {
    validateEntityType(entityTypeId: string): Promise<boolean>;
    validateRelationshipType(relationshipTypeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<boolean>;
    validateCardinality(relationshipTypeId: string, sourceEntityTypeId: string): Promise<boolean>;
    validateMetadataSchema(entityTypeId: string, metadata: Record<string, any>): Promise<boolean>;
}
