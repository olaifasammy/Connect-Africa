import { UniqueEntityId } from './UniqueEntityId';
export declare abstract class Entity<T> {
    protected readonly _id: UniqueEntityId;
    protected readonly _props: T;
    constructor(props: T, id?: UniqueEntityId);
    get id(): UniqueEntityId;
    protected get props(): T;
    equals(object?: Entity<T>): boolean;
}
