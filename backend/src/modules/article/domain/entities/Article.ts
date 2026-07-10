import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

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
