import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListEntitiesQuery } from '@modules/entity/application/queries/ListEntitiesQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

export class ListEntitiesQueryHandler implements IQueryHandler<ListEntitiesQuery, any[]> {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async handle(query: ListEntitiesQuery): Promise<any[]> {
    return await this.entityRepository.findAll(query.page, query.limit);
  }
}
