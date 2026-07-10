import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetEntityVersionQuery } from '../../../entity/application/queries/GetEntityVersionQuery';
import { IEntityVersionRepository } from '../../../entity/domain/repositories/IEntityVersionRepository';
export declare class GetEntityVersionQueryHandler implements IQueryHandler<GetEntityVersionQuery, any> {
    private readonly entityVersionRepository;
    constructor(entityVersionRepository: IEntityVersionRepository);
    handle(query: GetEntityVersionQuery): Promise<any>;
}
