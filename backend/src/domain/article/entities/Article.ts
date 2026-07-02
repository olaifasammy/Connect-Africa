import { AggregateRoot } from '@domain/shared/AggregateRoot';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface ArticleProps {
  title: string;
  content: string;
  authorId: UniqueEntityId;
}

export class Article extends AggregateRoot<ArticleProps> {
  constructor(props: ArticleProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
