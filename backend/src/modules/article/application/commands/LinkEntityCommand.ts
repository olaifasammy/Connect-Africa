import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class LinkEntityCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly entityId: UniqueEntityId,
    public readonly userId: string
  ) {}
}
