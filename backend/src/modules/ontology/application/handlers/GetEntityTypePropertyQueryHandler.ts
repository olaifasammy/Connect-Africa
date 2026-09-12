import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { EntityTypePropertyDto } from '../dto/EntityTypePropertyDtos';
import { EntityTypePropertyService } from '../services/EntityTypePropertyService';

export interface GetEntityTypePropertyQuery {
  id: string;
}

@provide(GetEntityTypePropertyQueryHandler, true)
@injectable()
export class GetEntityTypePropertyQueryHandler
  implements
    ICommandHandler<
      GetEntityTypePropertyQuery,
      EntityTypePropertyDto
    >
{
  constructor(
    private readonly entityTypePropertyService: EntityTypePropertyService,
  ) {}

  async handle(
    query: GetEntityTypePropertyQuery,
  ): Promise<EntityTypePropertyDto> {
    const property =
      await this.entityTypePropertyService.getProperty(
        query.id,
      );

    return {
      id: property.id.toString(),
      entityTypeId: property.entityTypeId.toString(),
      ontologyId: property.ontologyId.toString(),
      name: property.name,
      dataType: property.definition.dataType,
      minCardinality: property.cardinality.min,
      maxCardinality: property.cardinality.max,
      required: property.required,
    };
  }
}