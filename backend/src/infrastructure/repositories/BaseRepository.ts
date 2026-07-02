import { AggregateRoot } from '@domain/shared/AggregateRoot';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export abstract class BaseRepository<T extends AggregateRoot<any>> {
  abstract save(aggregate: T): Promise<void>;
  abstract findById(id: UniqueEntityId): Promise<T | null>;
  abstract delete(id: UniqueEntityId): Promise<void>;
}
