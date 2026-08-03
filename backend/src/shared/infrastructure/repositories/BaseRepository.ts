import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export abstract class BaseRepository<T extends AggregateRoot<any>> {
  abstract save(aggregate: T): Promise<void>;
  abstract findById(id: UniqueEntityId): Promise<T | null>;
  abstract delete(id: UniqueEntityId): Promise<void>;
}
