import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetMediaByEntityQuery {
  constructor(public readonly entityId: UniqueEntityId) {}
}
