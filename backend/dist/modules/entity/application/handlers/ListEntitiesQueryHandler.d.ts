import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { ListEntitiesQuery } from '../../../entity/application/queries/ListEntitiesQuery';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
export declare class ListEntitiesQueryHandler implements IQueryHandler<ListEntitiesQuery, any[]> {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    handle(query: ListEntitiesQuery): Promise<any[]>;
}
