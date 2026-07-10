import { IRelationshipTypeRepository } from '../repositories/IRelationshipTypeRepository';
import { DomainError } from '../errors/DomainError';

export class UniqueRelationshipTypePolicy {
  constructor(private readonly relationshipTypeRepository: IRelationshipTypeRepository) {}

  public async validate(name: string): Promise<void> {
    const relationshipType = await this.relationshipTypeRepository.findByName(name);
    if (relationshipType) {
      throw new DomainError(`Relationship type with name '${name}' already exists.`);
    }
  }
}
