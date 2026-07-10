import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetRelationshipTypeQuery } from '../queries/GetRelationshipTypeQuery';
import { RelationshipTypeDto } from '../dto/OntologyDtos';
import { IRelationshipTypeRepository } from '../../../ontology/domain/repositories/IRelationshipTypeRepository';
export declare class GetRelationshipTypeQueryHandler implements IQueryHandler<GetRelationshipTypeQuery, RelationshipTypeDto> {
    private readonly relationshipTypeRepository;
    constructor(relationshipTypeRepository: IRelationshipTypeRepository);
    handle(query: GetRelationshipTypeQuery): Promise<RelationshipTypeDto>;
}
