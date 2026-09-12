import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';

import { ListEntityTypesQuery } from '../queries/ListEntityTypesQuery';
import { EntityTypeDto } from '../dto/OntologyDtos';

import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

@provide(ListEntityTypesQueryHandler, true)
@injectable()
export class ListEntityTypesQueryHandler
  implements
    IQueryHandler<
      ListEntityTypesQuery,
      EntityTypeDto[]
    >
{
  constructor(
    @inject('IEntityTypeRepository')
    private readonly entityTypeRepository: IEntityTypeRepository,
  ) {}

  async handle(
    query: ListEntityTypesQuery,
  ): Promise<EntityTypeDto[]> {
    const ontologyId =
      OntologyId.create(query.ontologyId);

    const entityTypes =
      await this.entityTypeRepository.findByOntologyId(
        ontologyId,
      );

    return entityTypes.map(
      (entityType): EntityTypeDto => ({
        id: entityType.id.toString(),
        name: entityType.name,
        description: entityType.description,
      }),
    );
  }
}