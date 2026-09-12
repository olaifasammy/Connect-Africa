import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityByIdentifierQuery } from '@modules/entity/application/queries/GetEntityByIdentifierQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityResponse } from '@modules/entity/application/dto/EntityResponse';

@provide(GetEntityByIdentifierQueryHandler, true)
@injectable()
export class GetEntityByIdentifierQueryHandler
  implements
    IQueryHandler<GetEntityByIdentifierQuery, EntityResponse | null>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
  ) {}

  async handle(
    query: GetEntityByIdentifierQuery,
  ): Promise<EntityResponse | null> {
    const entity =
      await this.entityRepository.findByIdentifier(
        query.identifier,
      );

    if (!entity) {
      return null;
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