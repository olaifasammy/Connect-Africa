import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityQuery } from '@modules/entity/application/queries/GetEntityQuery';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';

@provide(GetEntityQueryHandler, true)
@injectable()
export class GetEntityQueryHandler
  implements IQueryHandler<GetEntityQuery, EntityResponse>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
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

    return {
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
    };
  }
}