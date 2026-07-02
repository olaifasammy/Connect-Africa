import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface IGraphRepository {
  findById(id: UniqueEntityId): Promise<any | null>;
  save(entity: any): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
