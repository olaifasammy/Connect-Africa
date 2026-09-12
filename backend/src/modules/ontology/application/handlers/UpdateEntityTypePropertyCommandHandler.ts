import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

import { UpdateEntityTypePropertyCommand } from '../commands/UpdateEntityTypePropertyCommand';
import { EntityTypePropertyDto } from '../dto/EntityTypePropertyDtos';
import { EntityTypePropertyService } from '../services/EntityTypePropertyService';

@provide(UpdateEntityTypePropertyCommandHandler, true)
@injectable()
export class UpdateEntityTypePropertyCommandHandler
  implements
    ICommandHandler<
      UpdateEntityTypePropertyCommand,
      EntityTypePropertyDto
    >
{
  constructor(
    private readonly entityTypePropertyService: EntityTypePropertyService,
  ) {}

  @Audit('UPDATE_ENTITY_TYPE_PROPERTY', 'ENTITY_TYPE_PROPERTY')
  async handle(
    command: UpdateEntityTypePropertyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<EntityTypePropertyDto> {
    const property =
      await this.entityTypePropertyService.updateProperty(
        command.id,
        {
          name: command.name,
          dataType: command.dataType,
          minCardinality: command.minCardinality,
          maxCardinality: command.maxCardinality,
          required: command.required,
        },
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