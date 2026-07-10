import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetEntityBySlugQuery } from '../../../entity/application/queries/GetEntityBySlugQuery';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
export declare class GetEntityBySlugQueryHandler implements IQueryHandler<GetEntityBySlugQuery, any> {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    handle(query: GetEntityBySlugQuery): Promise<any>;
}
