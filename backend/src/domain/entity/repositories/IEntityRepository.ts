import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface IEntityRepository {
  findById(id: UniqueEntityId): Promise<any | null>;
  save(entity: any): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
