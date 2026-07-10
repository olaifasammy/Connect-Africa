import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

export class EntityService {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async findById(id: string): Promise<Entity | null> {
    return await this.entityRepository.findById(EntityId.create(id));
  }
  
  async save(entity: Entity): Promise<void> {
    await this.entityRepository.save(entity);
  }
}
