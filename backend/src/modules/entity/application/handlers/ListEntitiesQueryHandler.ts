import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListEntitiesQuery } from '@modules/entity/application/queries/ListEntitiesQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';
import { PaginatedResult } from '@shared/application/pagination/PaginationTypes';
import { EntityResponseHelper } from '@modules/entity/application/services/EntityResponseHelper';

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
    @inject(EntityResponseHelper)
    private readonly responseHelper: EntityResponseHelper,
  ) {}

  async handle(
    query: ListEntitiesQuery,
  ): Promise<ListEntitiesResponse> {
    const result =
      await this.entityRepository.findAll(
        query.pagination,
      );

    const enrichedItems = await this.responseHelper.enrich(result.items);

    return {
      items: enrichedItems,
      pagination: result.pagination,
    };
  }
}