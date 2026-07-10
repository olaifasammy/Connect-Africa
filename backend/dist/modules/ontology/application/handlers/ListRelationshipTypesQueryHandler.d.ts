import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { ListRelationshipTypesQuery } from '../queries/ListRelationshipTypesQuery';
import { RelationshipTypeDto } from '../dto/OntologyDtos';
import { IRelationshipTypeRepository } from '../../../ontology/domain/repositories/IRelationshipTypeRepository';
export declare class ListRelationshipTypesQueryHandler implements IQueryHandler<ListRelationshipTypesQuery, RelationshipTypeDto[]> {
    private readonly relationshipTypeRepository;
    constructor(relationshipTypeRepository: IRelationshipTypeRepository);
    handle(query: ListRelationshipTypesQuery): Promise<RelationshipTypeDto[]>;
}
