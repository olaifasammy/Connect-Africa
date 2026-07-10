import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetEntityByIdentifierQuery } from '../../../entity/application/queries/GetEntityByIdentifierQuery';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
export declare class GetEntityByIdentifierQueryHandler implements IQueryHandler<GetEntityByIdentifierQuery, any> {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    handle(query: GetEntityByIdentifierQuery): Promise<any>;
}
