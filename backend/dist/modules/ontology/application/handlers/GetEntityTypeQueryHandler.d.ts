import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetEntityTypeQuery } from '../queries/GetEntityTypeQuery';
import { EntityTypeDto } from '../dto/OntologyDtos';
import { IEntityTypeRepository } from '../../../ontology/domain/repositories/IEntityTypeRepository';
export declare class GetEntityTypeQueryHandler implements IQueryHandler<GetEntityTypeQuery, EntityTypeDto> {
    private readonly entityTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository);
    handle(query: GetEntityTypeQuery): Promise<EntityTypeDto>;
}
