import { UniqueEntityId } from './UniqueEntityId';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  protected readonly _props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this._id = id || new UniqueEntityId();
    this._props = props;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  protected get props(): T {
    return this._props;
  }

  equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id.equals(object._id);
  }
}
