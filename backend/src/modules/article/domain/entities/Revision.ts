import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { ArticleProps } from './Article';

export interface RevisionProps {
  articleId: UniqueEntityId;
  contentSnapshot: Omit<ArticleProps, 'version'>;
  version: number;
  createdAt: Date;
  metadata: Record<string, any>;
}

export class Revision extends Entity<RevisionProps> {
  private constructor(props: RevisionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: RevisionProps, id?: UniqueEntityId): Revision {
    return new Revision(props, id);
  }

  get contentSnapshot(): Omit<ArticleProps, 'version'> {
    return this.props.contentSnapshot;
  }
}
