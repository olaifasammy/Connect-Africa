import { IEntityMergeService } from './IEntityMergeService';
import { IEntityRepository } from '../repositories/IEntityRepository';
import { EntityId } from '../value-objects/EntityId';
import { Entity } from '../entities/Entity';

export class EntityMergeService implements IEntityMergeService {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async merge(sourceEntityId: string, targetEntityId: string): Promise<Entity> {
    const sourceEntity = await this.entityRepository.findById(EntityId.create(sourceEntityId));
    const targetEntity = await this.entityRepository.findById(EntityId.create(targetEntityId));

    if (!sourceEntity || !targetEntity) {
      throw new Error('Entity not found.');
    }

    // Perform merge
    targetEntity.merge(sourceEntity);
    
    // Save the merged target entity
    await this.entityRepository.save(targetEntity);

    return targetEntity;
  }
}
