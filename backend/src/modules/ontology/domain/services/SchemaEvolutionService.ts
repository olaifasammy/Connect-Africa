import { Ontology } from '../entities/Ontology';
import { OntologyVersion } from '../entities/OntologyVersion';
import { DomainError } from '../errors/DomainError';

export class SchemaEvolutionService {
  public evolve(ontology: Ontology, newVersion: number): OntologyVersion {
    if (newVersion <= ontology.version) {
      throw new DomainError('New version must be greater than current version.');
    }
    // Logic to create a new OntologyVersion based on the current Ontology state
    return OntologyVersion.create({
      version: newVersion,
      isPublished: false,
      createdAt: new Date(),
    });
  }
}
