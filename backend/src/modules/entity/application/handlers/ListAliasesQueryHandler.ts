import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListAliasesQuery } from '@modules/entity/application/queries/ListAliasesQuery';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

export class ListAliasesQueryHandler implements IQueryHandler<ListAliasesQuery, any[]> {
  constructor(private readonly entityAliasRepository: IEntityAliasRepository) {}
  async handle(query: ListAliasesQuery): Promise<any[]> {
    return await this.entityAliasRepository.findByEntityId(EntityId.create(query.entityId));
  }
}
