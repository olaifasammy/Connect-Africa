export interface EntityTypePropertyDto {
  id: string;
  entityTypeId: string;
  ontologyId: string;
  name: string;
  dataType: string;
  minCardinality: number;
  maxCardinality: number | null;
  required: boolean;
}