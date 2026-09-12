import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

import { CreateEntityTypePropertyCommand } from '../commands/CreateEntityTypePropertyCommand';
import { EntityTypePropertyDto } from '../dto/EntityTypePropertyDtos';
import { EntityTypePropertyService } from '../services/EntityTypePropertyService';

@provide(CreateEntityTypePropertyCommandHandler, true)
@injectable()
export class CreateEntityTypePropertyCommandHandler
  implements
    ICommandHandler<
      CreateEntityTypePropertyCommand,
      EntityTypePropertyDto
    >
{
  constructor(
    private readonly entityTypePropertyService: EntityTypePropertyService,
  ) {}

  @Audit('CREATE_ENTITY_TYPE_PROPERTY', 'ENTITY_TYPE_PROPERTY')
  async handle(
    command: CreateEntityTypePropertyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<EntityTypePropertyDto> {
    const property =
      await this.entityTypePropertyService.createProperty(
        command.entityTypeId,
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