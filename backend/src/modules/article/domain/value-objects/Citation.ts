import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface CitationProps {
  articleId: UniqueEntityId;
  sourceId: UniqueEntityId;
  text: string;
  order: number;
}

export class Citation {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly sourceId: UniqueEntityId,
    public readonly text: string,
    public readonly order: number
  ) {}
}
