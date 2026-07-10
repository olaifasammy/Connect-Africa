import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityTypeQuery } from '../queries/GetEntityTypeQuery';
import { EntityTypeDto } from '../dto/OntologyDtos';
import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetEntityTypeQueryHandler implements IQueryHandler<GetEntityTypeQuery, EntityTypeDto> {
  constructor(private readonly entityTypeRepository: IEntityTypeRepository) {}

  async handle(query: GetEntityTypeQuery): Promise<EntityTypeDto> {
    const entityType = await this.entityTypeRepository.findById(new UniqueEntityId(query.id));
    if (!entityType) {
        throw new Error('Entity Type not found');
    }
    return {
      id: entityType.id.toString(),
      name: entityType.name,
      description: entityType.description
    };
  }
}
