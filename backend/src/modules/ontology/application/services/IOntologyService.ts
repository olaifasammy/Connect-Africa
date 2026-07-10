import { CreateOntologyDto, UpdateOntologyDto } from '@modules/ontology/application/dto/OntologyDtos';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';

export interface IOntologyService {
  create(dto: CreateOntologyDto): Promise<Ontology>;
  getById(id: string): Promise<Ontology>;
  update(id: string, dto: UpdateOntologyDto): Promise<Ontology>;
}
