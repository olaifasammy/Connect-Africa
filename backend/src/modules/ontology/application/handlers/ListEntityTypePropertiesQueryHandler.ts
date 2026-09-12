import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { EntityTypePropertyDto } from '../dto/EntityTypePropertyDtos';
import { EntityTypePropertyService } from '../services/EntityTypePropertyService';

export interface ListEntityTypePropertiesQuery {
  entityTypeId: string;
}

@provide(ListEntityTypePropertiesQueryHandler, true)
@injectable()
export class ListEntityTypePropertiesQueryHandler
  implements
    ICommandHandler<
      ListEntityTypePropertiesQuery,
      EntityTypePropertyDto[]
    >
{
  constructor(
    private readonly entityTypePropertyService: EntityTypePropertyService,
  ) {}

  async handle(
    query: ListEntityTypePropertiesQuery,
  ): Promise<EntityTypePropertyDto[]> {
    const properties =
      await this.entityTypePropertyService.listProperties(
        query.entityTypeId,
      );

    return properties.map((property) => ({
      id: property.id.toString(),
      entityTypeId: property.entityTypeId.toString(),
      ontologyId: property.ontologyId.toString(),
      name: property.name,
      dataType: property.definition.dataType,
      minCardinality: property.cardinality.min,
      maxCardinality: property.cardinality.max,
      required: property.required,
    }));
  }
}