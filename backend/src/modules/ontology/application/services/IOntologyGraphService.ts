export interface IOntologyGraphService {
  validateEntityType(entityTypeId: string): Promise<boolean>;
  validateRelationshipType(relationshipTypeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<boolean>;
}
