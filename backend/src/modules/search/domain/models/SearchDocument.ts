import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SearchDocument {
  constructor(
    public readonly id: UniqueEntityId,
    public readonly resourceType: string,
    public readonly resourceId: UniqueEntityId,
    public readonly content: Record<string, any>,
    public readonly createdAt: Date = new Date(),
  ) {}
}
