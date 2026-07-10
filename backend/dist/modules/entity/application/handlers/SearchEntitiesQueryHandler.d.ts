import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { SearchEntitiesQuery } from '../../../entity/application/queries/SearchEntitiesQuery';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
export declare class SearchEntitiesQueryHandler implements IQueryHandler<SearchEntitiesQuery, any[]> {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    handle(query: SearchEntitiesQuery): Promise<any[]>;
}
