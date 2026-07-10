import { GetRelationshipQuery } from '../queries/RelationshipQueries';
import { IRelationshipRepository } from '../../../relationship/domain/repositories/IRelationshipRepository';
import { RelationshipDto } from '../dto/RelationshipDto';
export declare class GetRelationshipByIdHandler {
    private readonly repository;
    constructor(repository: IRelationshipRepository);
    handle(query: GetRelationshipQuery): Promise<RelationshipDto | null>;
}
