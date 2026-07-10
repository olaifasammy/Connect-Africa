/**
 * DTO for creating a new relationship.
 */
export interface CreateRelationshipRequest {
    sourceEntityId: string;
    targetEntityId: string;
    relationshipTypeId: string;
}
/**
 * DTO for updating an existing relationship.
 */
export interface UpdateRelationshipRequest {
    relationshipTypeId: string;
}
/**
 * Standard response DTO for a relationship.
 */
export interface RelationshipResponse {
    id: string;
    sourceEntityId: string;
    targetEntityId: string;
    relationshipTypeId: string;
    createdAt: Date;
}
/**
 * DTO for representing relationship data.
 */
export interface RelationshipDto {
    id: string;
    sourceEntityId: string;
    targetEntityId: string;
    relationshipTypeId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * DTO for representing a specific version of a relationship.
 */
export interface RelationshipVersionDto {
    id: string;
    relationshipId: string;
    versionNumber: number;
    data: Record<string, any>;
    createdAt: Date;
}
/**
 * DTO for representing evidence supporting a relationship.
 */
export interface RelationshipEvidenceDto {
    id: string;
    relationshipId: string;
    sourceUri: string;
    description: string;
    createdAt: Date;
}
