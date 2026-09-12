import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityVersionQuery } from '@modules/entity/application/queries/GetEntityVersionQuery';
import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityVersionDto } from '@modules/entity/application/dto/EntityVersionDto';

@provide(GetEntityVersionQueryHandler, true)
@injectable()
export class GetEntityVersionQueryHandler
  implements IQueryHandler<GetEntityVersionQuery, EntityVersionDto | null>
{
  constructor(
    @inject('IEntityVersionRepository')
    private readonly entityVersionRepository: IEntityVersionRepository,
  ) {}

  async handle(
    query: GetEntityVersionQuery,
  ): Promise<EntityVersionDto | null> {
    const version =
      await this.entityVersionRepository.findByEntityIdAndVersionId(
        EntityId.create(query.entityId),
        query.versionId,
      );

    if (!version) {
      return null;
    }

    return {
      versionId: version.id.toString(),
      entityId: version.entityId.value,
      versionNumber: version.versionNumber.value,
      name: version.name,
      type: version.type,
      slug: version.metadata.slug!,
      description: version.metadata.description,
      source: version.metadata.source,
      tags: version.metadata.tags,
      status: version.status.value,
      createdAt: version.createdAt,
    };
  }
}