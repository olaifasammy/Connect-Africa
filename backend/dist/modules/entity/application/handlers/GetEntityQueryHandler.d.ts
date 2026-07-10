import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetEntityQuery } from '../../../entity/application/queries/GetEntityQuery';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
export declare class GetEntityQueryHandler implements IQueryHandler<GetEntityQuery, any> {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    handle(query: GetEntityQuery): Promise<any>;
}
