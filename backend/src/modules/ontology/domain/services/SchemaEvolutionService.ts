import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Ontology } from '../entities/Ontology';
import { OntologyVersion } from '../entities/OntologyVersion';
import { DomainError } from '../errors/DomainError';

@provide(SchemaEvolutionService, true)
@injectable()
export class SchemaEvolutionService {
  /**
   * Evolves an ontology to a new version increment while preserving backward compatibility checks.
   */
  public evolve(ontology: Ontology, newVersion: number): OntologyVersion {
    if (newVersion <= ontology.version) {
      throw new DomainError(
        `Schema Evolution Error: Target version (${newVersion}) must be strictly greater than current version (${ontology.version}).`,
      );
    }

    if (ontology.isArchived) {
      throw new DomainError(
        `Schema Evolution Error: Cannot evolve an archived ontology (${ontology.id.toString()}).`,
      );
    }

    return OntologyVersion.create({
      ontologyId: ontology.id,
      version: newVersion,
      isPublished: false,
      createdAt: new Date(),
    });
  }
}
