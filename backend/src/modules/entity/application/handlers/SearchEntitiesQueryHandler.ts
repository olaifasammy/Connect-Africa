import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { SearchEntitiesQuery } from '@modules/entity/application/queries/SearchEntitiesQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

export class SearchEntitiesQueryHandler implements IQueryHandler<SearchEntitiesQuery, any[]> {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async handle(query: SearchEntitiesQuery): Promise<any[]> {
    return await this.entityRepository.search(query.term);
  }
}
