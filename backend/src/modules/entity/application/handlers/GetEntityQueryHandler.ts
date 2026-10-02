import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityQuery } from '@modules/entity/application/queries/GetEntityQuery';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';
import { EntityResponseHelper } from '@modules/entity/application/services/EntityResponseHelper';

@provide(GetEntityQueryHandler, true)
@injectable()
export class GetEntityQueryHandler
  implements IQueryHandler<GetEntityQuery, EntityResponse>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
    @inject(EntityResponseHelper)
    private readonly responseHelper: EntityResponseHelper,
  ) {}

  async handle(
    query: GetEntityQuery,
  ): Promise<EntityResponse> {
    const entity = await this.entityRepository.findById(
      EntityId.create(query.entityId),
    );

    if (!entity) {
      throw new Error('Entity not found');
    }

    const enriched = await this.responseHelper.enrich([entity]);
    return enriched[0];
  }
}