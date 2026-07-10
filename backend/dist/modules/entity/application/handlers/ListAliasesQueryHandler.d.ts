import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { ListAliasesQuery } from '../../../entity/application/queries/ListAliasesQuery';
import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
export declare class ListAliasesQueryHandler implements IQueryHandler<ListAliasesQuery, any[]> {
    private readonly entityAliasRepository;
    constructor(entityAliasRepository: IEntityAliasRepository);
    handle(query: ListAliasesQuery): Promise<any[]>;
}
