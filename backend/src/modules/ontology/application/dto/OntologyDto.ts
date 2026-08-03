export interface CreateOntologyDto {
  name: string;
  description: string;
  version: number;
}

export interface OntologyResponseDto {
  id: string;
  name: string;
  description: string;
  version: number;
}

export interface OntologyDto {
  id: string;
  name: string;
  description: string;
  version: number;
}
