import { UniqueEntityId } from './UniqueEntityId';
export declare abstract class Entity<T> {
    protected readonly _id: UniqueEntityId;
    protected props: T;
    constructor(props: T, id?: UniqueEntityId);
    get id(): UniqueEntityId;
    equals(object?: Entity<T>): boolean;
}
