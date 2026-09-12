import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityLink {
  constructor(public readonly entityId: UniqueEntityId) {}
}
