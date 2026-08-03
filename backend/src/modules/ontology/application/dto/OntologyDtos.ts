export interface CreateOntologyDto {
  name: string;
  description: string;
}

export interface UpdateOntologyDto {
  name?: string;
  description?: string;
}

export interface EntityTypeDto {
  id: string;
  name: string;
  description: string;
}

export interface RelationshipTypeDto {
  id: string;
  name: string;
  description: string;
  sourceEntityTypeId: string;
  targetEntityTypeId: string;
}

export interface OntologyVersionDto {
  id: string;
  version: number;
  isPublished: boolean;
}
