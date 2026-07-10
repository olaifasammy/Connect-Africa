import { RelationshipType } from '../entities/RelationshipType';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IRelationshipTypeRepository {
    findById(id: UniqueEntityId): Promise<RelationshipType | null>;
    findByName(name: string): Promise<RelationshipType | null>;
    save(relationshipType: RelationshipType): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
}
