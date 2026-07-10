import { IEntityTypeRepository } from '../repositories/IEntityTypeRepository';
import { DomainError } from '../errors/DomainError';

export class UniqueEntityTypePolicy {
  constructor(private readonly entityTypeRepository: IEntityTypeRepository) {}

  public async validate(name: string): Promise<void> {
    const entityType = await this.entityTypeRepository.findByName(name);
    if (entityType) {
      throw new DomainError(`Entity type with name '${name}' already exists.`);
    }
  }
}
