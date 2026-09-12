import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import {
  ArticleSnapshot,
} from './Article';

export interface RevisionProps {
  articleId: UniqueEntityId;
  contentSnapshot: ArticleSnapshot;
  version: number;
  createdAt: Date;
  metadata: Record<string, unknown>;
}

export class Revision extends Entity<RevisionProps> {
  private constructor(
    props: RevisionProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
  }

  public static create(
    props: RevisionProps,
    id?: UniqueEntityId,
  ): Revision {
    if (!props.articleId) {
      throw new Error(
        'Revision articleId is required.',
      );
    }

    if (
      !Number.isInteger(props.version) ||
      props.version < 1
    ) {
      throw new Error(
        'Revision version must be a positive integer.',
      );
    }

    if (!props.contentSnapshot) {
      throw new Error(
        'Revision contentSnapshot is required.',
      );
    }

    if (!(props.createdAt instanceof Date)) {
      throw new Error(
        'Revision createdAt must be a Date.',
      );
    }

    return new Revision(
      {
        ...props,
        contentSnapshot: {
          ...props.contentSnapshot,
          entityLinks: [
            ...props.contentSnapshot.entityLinks,
          ],
          relationshipLinks: [
            ...props.contentSnapshot.relationshipLinks,
          ],
          citations: [
            ...props.contentSnapshot.citations,
          ],
          mediaLinks: [
            ...props.contentSnapshot.mediaLinks,
          ],
          tags: [
            ...props.contentSnapshot.tags,
          ],
          categories: [
            ...props.contentSnapshot.categories,
          ],
          seo: {
            ...props.contentSnapshot.seo,
            openGraphMetadata:
              props.contentSnapshot.seo
                .openGraphMetadata
                ? {
                    ...props.contentSnapshot.seo
                      .openGraphMetadata,
                  }
                : undefined,
          },
        },
        metadata: {
          ...props.metadata,
        },
      },
      id,
    );
  }

  get articleId(): UniqueEntityId {
    return this.props.articleId;
  }

  get contentSnapshot(): ArticleSnapshot {
    return {
      ...this.props.contentSnapshot,
      entityLinks: [
        ...this.props.contentSnapshot.entityLinks,
      ],
      relationshipLinks: [
        ...this.props.contentSnapshot.relationshipLinks,
      ],
      citations: [
        ...this.props.contentSnapshot.citations,
      ],
      mediaLinks: [
        ...this.props.contentSnapshot.mediaLinks,
      ],
      tags: [
        ...this.props.contentSnapshot.tags,
      ],
      categories: [
        ...this.props.contentSnapshot.categories,
      ],
      seo: {
        ...this.props.contentSnapshot.seo,
        openGraphMetadata:
          this.props.contentSnapshot.seo
            .openGraphMetadata
            ? {
                ...this.props.contentSnapshot.seo
                  .openGraphMetadata,
              }
            : undefined,
      },
    };
  }

  get version(): number {
    return this.props.version;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get metadata(): Record<string, unknown> {
    return {
      ...this.props.metadata,
    };
  }
}
