import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListEntitiesQuery } from '@modules/entity/application/queries/ListEntitiesQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';
import { PaginatedResult } from '@shared/application/pagination/PaginationTypes';

export interface ListEntitiesResponse {
  items: EntityResponse[];
  pagination: PaginatedResult<EntityResponse>['pagination'];
}

@provide(ListEntitiesQueryHandler, true)
@injectable()
export class ListEntitiesQueryHandler
  implements IQueryHandler<ListEntitiesQuery, ListEntitiesResponse>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
  ) {}

  async handle(
    query: ListEntitiesQuery,
  ): Promise<ListEntitiesResponse> {
    const result =
      await this.entityRepository.findAll(
        query.pagination,
      );

    return {
      items: result.items.map((entity) => ({
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
      })),
      pagination: result.pagination,
    };
  }
}