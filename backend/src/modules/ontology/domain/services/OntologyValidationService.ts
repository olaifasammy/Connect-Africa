import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Ontology } from '../entities/Ontology';
import { DomainError } from '../errors/DomainError';

@provide(OntologyValidationService, true)
@injectable()
export class OntologyValidationService {
  public validate(ontology: Ontology): void {
    if (!ontology.name || ontology.name.trim() === '') {
      throw new DomainError('Ontology name is required.');
    }
    // Additional domain-level validation rules can be added here.
  }
}
