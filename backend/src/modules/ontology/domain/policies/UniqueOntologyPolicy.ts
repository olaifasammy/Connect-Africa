import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Ontology } from '../entities/Ontology';
import { IOntologyRepository } from '../repositories/IOntologyRepository';
import { DomainError } from '../errors/DomainError';

@provide(UniqueOntologyPolicy, true)
@injectable()
export class UniqueOntologyPolicy {
  constructor(@inject('IOntologyRepository') private readonly ontologyRepository: IOntologyRepository) {}

  public async validate(name: string): Promise<void> {
    const exists = await this.ontologyRepository.exists(name);
    if (exists) {
      throw new DomainError(`Ontology with name '${name}' already exists.`);
    }
  }
}
