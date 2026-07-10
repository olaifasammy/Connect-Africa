import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { ListEntityTypesQuery } from '../queries/ListEntityTypesQuery';
import { EntityTypeDto } from '../dto/OntologyDtos';
import { IEntityTypeRepository } from '../../../ontology/domain/repositories/IEntityTypeRepository';
export declare class ListEntityTypesQueryHandler implements IQueryHandler<ListEntityTypesQuery, EntityTypeDto[]> {
    private readonly entityTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository);
    handle(query: ListEntityTypesQuery): Promise<EntityTypeDto[]>;
}
