import { AggregateRoot } from '../../domain/AggregateRoot';
import { UniqueEntityId } from '../../domain/UniqueEntityId';
export declare abstract class BaseRepository<T extends AggregateRoot<any>> {
    abstract save(aggregate: T): Promise<void>;
    abstract findById(id: UniqueEntityId): Promise<T | null>;
    abstract delete(id: UniqueEntityId): Promise<void>;
}
