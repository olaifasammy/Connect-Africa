import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface IRelationshipRepository {
  findById(id: UniqueEntityId): Promise<any | null>;
  save(entity: any): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
