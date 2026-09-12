import {
  inject,
  injectable,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  IEntityRepository,
} from '@modules/entity/domain/repositories/IEntityRepository';

import {
  Entity,
} from '@modules/entity/domain/entities/Entity';

import {
  EntityId,
} from '@modules/entity/domain/value-objects/EntityId';

import {
  IEntityService,
} from '../../domain/interfaces/IEntityService';

@provide(EntityService, true)
@injectable()
export class EntityService
  implements IEntityService
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository:
      IEntityRepository,
  ) {}

  async findById(
    id: string,
  ): Promise<Entity | null> {
    return await this.entityRepository.findById(
      EntityId.create(id),
    );
  }

  async save(
    entity: Entity,
  ): Promise<void> {
    await this.entityRepository.save(
      entity,
    );
  }
}