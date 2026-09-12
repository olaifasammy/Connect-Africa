import {
  CreateOntologyDto,
  UpdateOntologyDto,
} from '@modules/ontology/application/dto/OntologyDtos';

import { Ontology } from '@modules/ontology/domain/entities/Ontology';

export interface IOntologyService {
  create(
    dto: CreateOntologyDto,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology>;

  getById(
    id: string,
  ): Promise<Ontology>;

  update(
    id: string,
    dto: UpdateOntologyDto,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology>;

  archive(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology>;

  publish(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology>;
}