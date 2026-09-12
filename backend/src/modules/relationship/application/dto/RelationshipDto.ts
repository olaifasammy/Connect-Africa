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
 * DTO for representing persisted relationship data.
 *
 * Only fields that are authoritative in the current
 * relationships table are exposed here.
 */
export interface RelationshipDto {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationshipTypeId: string;
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