import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { SearchEntitiesQuery } from '@modules/entity/application/queries/SearchEntitiesQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';

@provide(SearchEntitiesQueryHandler, true)
@injectable()
export class SearchEntitiesQueryHandler
  implements IQueryHandler<SearchEntitiesQuery, EntityResponse[]>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
  ) {}

  async handle(
    query: SearchEntitiesQuery,
  ): Promise<EntityResponse[]> {
    const entities =
      await this.entityRepository.search(query.term);

    return entities.map((entity) => ({
      id: entity.entityId.value,
      name: entity.name.value,
      type: entity.type,
      slug: entity.metadata.slug!,
      description: entity.metadata.description,
      source: entity.metadata.source,
      tags: entity.metadata.tags,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }
}