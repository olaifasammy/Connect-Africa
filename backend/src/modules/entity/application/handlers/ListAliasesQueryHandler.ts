import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListAliasesQuery } from '@modules/entity/application/queries/ListAliasesQuery';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { AliasDto } from '@modules/entity/application/dto/AliasDto';

@provide(ListAliasesQueryHandler, true)
@injectable()
export class ListAliasesQueryHandler
  implements IQueryHandler<ListAliasesQuery, AliasDto[]>
{
  constructor(
    @inject('IEntityAliasRepository')
    private readonly entityAliasRepository: IEntityAliasRepository,
  ) {}

  async handle(query: ListAliasesQuery): Promise<AliasDto[]> {
    const aliases =
      await this.entityAliasRepository.findByEntityId(
        EntityId.create(query.entityId),
      );

    return aliases.map((alias) => ({
      id: alias.id.toString(),
      alias: alias.name.value,
      entityId: alias.entityId.value,
      createdAt: alias.createdAt,
    }));
  }
}