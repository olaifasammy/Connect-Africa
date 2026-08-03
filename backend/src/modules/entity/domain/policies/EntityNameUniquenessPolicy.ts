import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';

export class EntityNameUniquenessPolicy implements IEntityPolicy {
  constructor(private readonly entityRepository: any) {} // Should be a repository interface

  async validate(entity: Entity): Promise<void> {
    // Implementation will use repository to check uniqueness
    const existing = await this.entityRepository.findByName(entity.name.value);
    if (existing && !existing.id.equals(entity.id)) {
      throw new Error('Entity name must be unique');
    }
  }
}
