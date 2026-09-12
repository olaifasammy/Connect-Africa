import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { ArticleStatus } from '../enums/ArticleStatus';
import { ArticleDomainError } from '../errors/ArticleDomainErrors';
import { EntityLink } from '../value-objects/EntityLink';
import { RelationshipLink } from '../value-objects/RelationshipLink';
import { Citation } from '../value-objects/Citation';
import { MediaLink } from '../value-objects/MediaLink';
import {
  ArticleTag,
  ArticleCategory,
} from '../value-objects/Taxonomy';
import {
  ArticleSeoProps,
} from '../value-objects/ArticleSeo';

import { ArticleCreatedEvent } from '../events/ArticleCreatedEvent';
import { ArticleUpdatedEvent } from '../events/ArticleUpdatedEvent';
import { ArticleSubmittedEvent } from '../events/ArticleSubmittedEvent';
import { ArticleApprovedEvent } from '../events/ArticleApprovedEvent';
import { ArticlePublishedEvent } from '../events/ArticlePublishedEvent';
import { ArticleArchivedEvent } from '../events/ArticleArchivedEvent';
import { ArticleRejectedEvent } from '../events/ArticleRejectedEvent';
import { ArticleUnpublishedEvent } from '../events/ArticleUnpublishedEvent';

export interface ArticleProps {
  title: string;
  slug: string;
  summary: string;
  content: string;
  language: string;
  status: ArticleStatus;
  authorId: UniqueEntityId;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  version: number;
  entityLinks: EntityLink[];
  relationshipLinks: RelationshipLink[];
  citations: Citation[];
  mediaLinks: MediaLink[];
  tags: ArticleTag[];
  categories: ArticleCategory[];
  seo: {
    props: ArticleSeoProps;
  };
}

/**
 * Persistence-safe Article snapshot.
 *
 * Domain Value Objects are deliberately flattened into primitives so the
 * snapshot can be JSON.stringify()'d and later reconstructed losslessly.
 */
export interface ArticleSnapshot {
  title: string;
  slug: string;
  summary: string;
  content: string;
  language: string;
  status: ArticleStatus;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  entityLinks: Array<{
    entityId: string;
  }>;
  relationshipLinks: Array<{
    relationshipId: string;
  }>;
  citations: Array<{
    articleId: string;
    sourceId: string;
    text: string;
    order: number;
  }>;
  mediaLinks: Array<{
    mediaId: string;
    type: string;
    caption?: string;
    isFeatured: boolean;
  }>;
  tags: ArticleTag[];
  categories: ArticleCategory[];
  seo: ArticleSeoProps;
}

export class Article extends AggregateRoot<ArticleProps> {
  private constructor(
    props: ArticleProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
  }

  public static create(
    props: Pick<
      ArticleProps,
      | 'title'
      | 'slug'
      | 'summary'
      | 'content'
      | 'language'
      | 'authorId'
    >,
    id?: UniqueEntityId,
  ): Article {
    const now = new Date();

    const article = new Article(
      {
        ...props,
        status: ArticleStatus.DRAFT,
        createdAt: now,
        updatedAt: now,
        version: 1,
        entityLinks: [],
        relationshipLinks: [],
        citations: [],
        mediaLinks: [],
        tags: [],
        categories: [],
        seo: {
          props: {},
        },
      },
      id,
    );

    article.addDomainEvent(
      new ArticleCreatedEvent(article.id),
    );

    return article;
  }

  public static rehydrate(
    props: ArticleProps,
    id: UniqueEntityId,
  ): Article {
    return new Article(
      {
        ...props,
        entityLinks: [...props.entityLinks],
        relationshipLinks: [...props.relationshipLinks],
        citations: [...props.citations],
        mediaLinks: [...props.mediaLinks],
        tags: [...props.tags],
        categories: [...props.categories],
        seo: {
          props: {
            ...props.seo.props,
            openGraphMetadata: props.seo.props.openGraphMetadata
              ? { ...props.seo.props.openGraphMetadata }
              : undefined,
          },
        },
      },
      id,
    );
  }

  public snapshot(): ArticleSnapshot {
    return {
      title: this.props.title,
      slug: this.props.slug,
      summary: this.props.summary,
      content: this.props.content,
      language: this.props.language,
      status: this.props.status,
      authorId: this.props.authorId.toString(),
      createdAt: this.props.createdAt.toISOString(),
      updatedAt: this.props.updatedAt.toISOString(),
      publishedAt: this.props.publishedAt?.toISOString(),

      entityLinks: this.props.entityLinks.map((link) => ({
        entityId: link.entityId.toString(),
      })),

      relationshipLinks: this.props.relationshipLinks.map(
        (link) => ({
          relationshipId: link.relationshipId.toString(),
        }),
      ),

      citations: this.props.citations.map((citation) => ({
        articleId: citation.articleId.toString(),
        sourceId: citation.sourceId.toString(),
        text: citation.text,
        order: citation.order,
      })),

      mediaLinks: this.props.mediaLinks.map((media) => ({
        mediaId: media.props.mediaId.toString(),
        type: media.props.type,
        caption: media.props.caption,
        isFeatured: media.props.isFeatured,
      })),

      tags: this.props.tags.map((tag) => ({
        value: tag.value,
      })),

      categories: this.props.categories.map((category) => ({
        name: category.name,
      })),

      seo: {
        ...this.props.seo.props,
        openGraphMetadata: this.props.seo.props.openGraphMetadata
          ? {
              ...this.props.seo.props.openGraphMetadata,
            }
          : undefined,
      },
    };
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get summary(): string {
    return this.props.summary;
  }

  get content(): string {
    return this.props.content;
  }

  get language(): string {
    return this.props.language;
  }

  get status(): ArticleStatus {
    return this.props.status;
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  get publishedAt(): Date | undefined {
    return this.props.publishedAt
      ? new Date(this.props.publishedAt)
      : undefined;
  }

  get version(): number {
    return this.props.version;
  }

  get entityLinks(): EntityLink[] {
    return [...this.props.entityLinks];
  }

  get relationshipLinks(): RelationshipLink[] {
    return [...this.props.relationshipLinks];
  }

  get citations(): Citation[] {
    return [...this.props.citations];
  }

  get mediaLinks(): MediaLink[] {
    return [...this.props.mediaLinks];
  }

  get tags(): ArticleTag[] {
    return [...this.props.tags];
  }

  get categories(): ArticleCategory[] {
    return [...this.props.categories];
  }

  get seo(): ArticleSeoProps {
    return {
      ...this.props.seo.props,
      openGraphMetadata: this.props.seo.props.openGraphMetadata
        ? {
            ...this.props.seo.props.openGraphMetadata,
          }
        : undefined,
    };
  }

  public update(
    title?: string,
    summary?: string,
    content?: string,
  ): void {
    if (title !== undefined) {
      this.props.title = title;
    }

    if (summary !== undefined) {
      this.props.summary = summary;
    }

    if (content !== undefined) {
      this.props.content = content;
    }

    this.touch();

    this.addDomainEvent(
      new ArticleUpdatedEvent(
        this.id,
        this.entityLinks.map(
          (link) => link.entityId,
        ),
      ),
    );
  }

  public addTag(tag: ArticleTag): void {
    if (
      !this.props.tags.some(
        (existing) =>
          existing.value === tag.value,
      )
    ) {
      this.props.tags.push({
        ...tag,
      });

      this.touch();
      this.emitUpdated();
    }
  }

  public addCategory(category: ArticleCategory): void {
    if (
      !this.props.categories.some(
        (existing) =>
          existing.name === category.name,
      )
    ) {
      this.props.categories.push({
        ...category,
      });

      this.touch();
      this.emitUpdated();
    }
  }

  public addMediaLink(media: MediaLink): void {
    this.props.mediaLinks.push(media);

    this.touch();
    this.emitUpdated();
  }

  public addCitation(citation: Citation): void {
    this.props.citations.push(citation);

    this.touch();
    this.emitUpdated();
  }

  public addEntityLink(entityLink: EntityLink): void {
    if (
      !this.props.entityLinks.some(
        (existing) =>
          existing.entityId.equals(
            entityLink.entityId,
          ),
      )
    ) {
      this.props.entityLinks.push(entityLink);

      this.touch();
      this.emitUpdated();
    }
  }

  public addRelationshipLink(
    relationshipLink: RelationshipLink,
  ): void {
    if (
      !this.props.relationshipLinks.some(
        (existing) =>
          existing.relationshipId.equals(
            relationshipLink.relationshipId,
          ),
      )
    ) {
      this.props.relationshipLinks.push(
        relationshipLink,
      );

      this.touch();
      this.emitUpdated();
    }
  }

  public submitForReview(): void {
    if (
      this.props.status !== ArticleStatus.DRAFT &&
      this.props.status !== ArticleStatus.REJECTED
    ) {
      throw new ArticleDomainError(
        `Article cannot be submitted from status ${this.props.status}.`,
      );
    }

    if (this.props.entityLinks.length === 0) {
      throw new ArticleDomainError(
        'Article must be linked to at least one Entity before review.',
      );
    }

    this.props.status = ArticleStatus.REVIEW;
    this.touch();

    this.addDomainEvent(
      new ArticleSubmittedEvent(this.id),
    );
  }

  public reject(): void {
    if (
      this.props.status !== ArticleStatus.REVIEW
    ) {
      throw new ArticleDomainError(
        `Article cannot be rejected from status ${this.props.status}.`,
      );
    }

    this.props.status = ArticleStatus.REJECTED;
    this.touch();

    this.addDomainEvent(
      new ArticleRejectedEvent(this.id),
    );
  }

  public approve(): void {
    if (
      this.props.status !== ArticleStatus.REVIEW
    ) {
      throw new ArticleDomainError(
        `Article cannot be approved from status ${this.props.status}.`,
      );
    }

    this.props.status = ArticleStatus.APPROVED;
    this.touch();

    this.addDomainEvent(
      new ArticleApprovedEvent(this.id),
    );
  }

  public publish(): void {
    if (
      this.props.status !== ArticleStatus.APPROVED
    ) {
      throw new ArticleDomainError(
        `Article cannot be published from status ${this.props.status}.`,
      );
    }

    if (this.props.entityLinks.length === 0) {
      throw new ArticleDomainError(
        'Article must be linked to at least one Entity before publication.',
      );
    }

    this.props.status = ArticleStatus.PUBLISHED;
    this.props.publishedAt = new Date();
    this.touch();

    this.addDomainEvent(
      new ArticlePublishedEvent(this.id),
    );
  }

  public unpublish(): void {
    if (
      this.props.status !== ArticleStatus.PUBLISHED
    ) {
      throw new ArticleDomainError(
        `Article cannot be unpublished from status ${this.props.status}.`,
      );
    }

    this.props.status = ArticleStatus.DRAFT;
    this.props.publishedAt = undefined;
    this.touch();

    this.addDomainEvent(
      new ArticleUnpublishedEvent(this.id),
    );
  }

  public archive(): void {
    if (
      this.props.status === ArticleStatus.ARCHIVED
    ) {
      throw new ArticleDomainError(
        'Article is already archived.',
      );
    }

    this.props.status = ArticleStatus.ARCHIVED;
    this.touch();

    this.addDomainEvent(
      new ArticleArchivedEvent(this.id),
    );
  }

  public restoreFromRevision(
    snapshot: ArticleSnapshot,
  ): void {
    this.props.title = snapshot.title;
    this.props.slug = snapshot.slug;
    this.props.summary = snapshot.summary;
    this.props.content = snapshot.content;
    this.props.language = snapshot.language;
    this.props.authorId = new UniqueEntityId(
      snapshot.authorId,
    );

    this.props.createdAt = new Date(
      snapshot.createdAt,
    );

    this.props.updatedAt = new Date(
      snapshot.updatedAt,
    );

    this.props.publishedAt =
      snapshot.publishedAt
        ? new Date(snapshot.publishedAt)
        : undefined;

    this.props.entityLinks =
      snapshot.entityLinks.map(
        (link) =>
          new EntityLink(
            new UniqueEntityId(
              link.entityId,
            ),
          ),
      );

    this.props.relationshipLinks =
      snapshot.relationshipLinks.map(
        (link) =>
          new RelationshipLink(
            new UniqueEntityId(
              link.relationshipId,
            ),
          ),
      );

    this.props.citations =
      snapshot.citations.map(
        (citation) =>
          new Citation(
            new UniqueEntityId(
              citation.articleId,
            ),
            new UniqueEntityId(
              citation.sourceId,
            ),
            citation.text,
            citation.order,
          ),
      );

    this.props.mediaLinks =
      snapshot.mediaLinks.map(
        (media) =>
          new MediaLink({
            mediaId: new UniqueEntityId(
              media.mediaId,
            ),
            type: media.type as any,
            caption: media.caption,
            isFeatured: media.isFeatured,
          }),
      );

    this.props.tags =
      snapshot.tags.map((tag) => ({
        ...tag,
      }));

    this.props.categories =
      snapshot.categories.map(
        (category) => ({
          ...category,
        }),
      );

    this.props.seo = {
      props: {
        ...snapshot.seo,
        openGraphMetadata:
          snapshot.seo.openGraphMetadata
            ? {
                ...snapshot.seo.openGraphMetadata,
              }
            : undefined,
      },
    };

    this.props.status = ArticleStatus.DRAFT;
    this.props.publishedAt = undefined;

    this.touch();

    this.addDomainEvent(
      new ArticleUpdatedEvent(
        this.id,
        this.entityLinks.map(
          (link) => link.entityId,
        ),
      ),
    );
  }

  public removeEntityLink(entityId: UniqueEntityId): void {
    if (
      (this.props.status === ArticleStatus.REVIEW ||
        this.props.status === ArticleStatus.PUBLISHED) &&
      this.props.entityLinks.length <= 1
    ) {
      throw new ArticleDomainError(
        'Cannot remove the last Entity link while article is in REVIEW or PUBLISHED status.',
      );
    }

    const initialLength = this.props.entityLinks.length;
    this.props.entityLinks = this.props.entityLinks.filter(
      (link) => !link.entityId.equals(entityId),
    );

    if (this.props.entityLinks.length !== initialLength) {
      this.touch();
      this.emitUpdated();
    }
  }

  public removeRelationshipLink(relationshipId: UniqueEntityId): void {
    const initialLength = this.props.relationshipLinks.length;
    this.props.relationshipLinks = this.props.relationshipLinks.filter(
      (link) => !link.relationshipId.equals(relationshipId),
    );

    if (this.props.relationshipLinks.length !== initialLength) {
      this.touch();
      this.emitUpdated();
    }
  }

  public removeCitation(sourceId: UniqueEntityId): void {
    const initialLength = this.props.citations.length;
    this.props.citations = this.props.citations.filter(
      (citation) => !citation.sourceId.equals(sourceId),
    );

    if (this.props.citations.length !== initialLength) {
      this.touch();
      this.emitUpdated();
    }
  }

  public removeMediaLink(mediaId: UniqueEntityId): void {
    const initialLength = this.props.mediaLinks.length;
    this.props.mediaLinks = this.props.mediaLinks.filter(
      (media) => !media.props.mediaId.equals(mediaId),
    );

    if (this.props.mediaLinks.length !== initialLength) {
      this.touch();
      this.emitUpdated();
    }
  }

  private touch(): void {
    this.props.updatedAt = new Date();
    this.props.version += 1;
  }

  private emitUpdated(): void {
    this.addDomainEvent(
      new ArticleUpdatedEvent(
        this.id,
        this.entityLinks.map(
          (link) => link.entityId,
        ),
      ),
    );
  }
}
