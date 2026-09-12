import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

@provide(EntityAliasService, true)
@injectable()
export class EntityAliasService {
  constructor(private readonly aliasRepository: IEntityAliasRepository) {}

  async findByEntityId(entityId: string): Promise<EntityAlias[]> {
    return await this.aliasRepository.findByEntityId(EntityId.create(entityId));
  }
}
