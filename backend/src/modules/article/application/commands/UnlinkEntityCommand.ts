import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UnlinkEntityCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly entityId: UniqueEntityId,
    public readonly userId: string
  ) {}
}
