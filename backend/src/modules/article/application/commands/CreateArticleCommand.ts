import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CreateArticleCommand {
  constructor(
    public readonly title: string,
    public readonly summary: string,
    public readonly content: string,
    public readonly authorId: UniqueEntityId,
    public readonly language: string = 'en'
  ) {}
}
