import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { ArticleStatus } from '../enums/ArticleStatus';
import { ArticleCreatedEvent } from '../events/ArticleCreatedEvent';
import { ArticleUpdatedEvent } from '../events/ArticleUpdatedEvent';
import { ArticleSubmittedEvent } from '../events/ArticleSubmittedEvent';
import { ArticleApprovedEvent } from '../events/ArticleApprovedEvent';
import { ArticlePublishedEvent } from '../events/ArticlePublishedEvent';
import { ArticleArchivedEvent } from '../events/ArticleArchivedEvent';
import { Revision } from './Revision';
import { EntityLink } from '../value-objects/EntityLink';
import { RelationshipLink } from '../value-objects/RelationshipLink';
import { Citation } from '../value-objects/Citation';
import { MediaLink } from '../value-objects/MediaLink';
import { ArticleTag, ArticleCategory } from '../value-objects/Taxonomy';
import { ArticleSeo } from '../value-objects/ArticleSeo';

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
  seo: ArticleSeo;
}

export class Article extends AggregateRoot<ArticleProps> {
  private constructor(props: ArticleProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: Omit<ArticleProps, 'status' | 'createdAt' | 'updatedAt' | 'version' | 'entityLinks' | 'relationshipLinks' | 'citations' | 'mediaLinks' | 'tags' | 'categories' | 'seo'>,
    id?: UniqueEntityId
  ): Article {
    const article = new Article(
      {
        ...props,
        status: ArticleStatus.DRAFT,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        entityLinks: [],
        relationshipLinks: [],
        citations: [],
        mediaLinks: [],
        tags: [],
        categories: [],
        seo: new ArticleSeo({}),
      },
      id
    );

    article.addDomainEvent(new ArticleCreatedEvent(article.id));
    return article;
  }

  public static rehydrate(props: ArticleProps, id: UniqueEntityId): Article {
    return new Article(props, id);
  }

  get status(): ArticleStatus { return this.props.status; }
  get title(): string { return this.props.title; }
  get summary(): string { return this.props.summary; }
  get content(): string { return this.props.content; }
  get tags(): ArticleTag[] { return this.props.tags; }
  get categories(): ArticleCategory[] { return this.props.categories; }
  get authorId(): UniqueEntityId { return this.props.authorId; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get publishedAt(): Date | undefined { return this.props.publishedAt; }
  get version(): number { return this.props.version; }
  get slug(): string { return this.props.slug; }
  get language(): string { return this.props.language; }
  get entityLinks(): EntityLink[] { return this.props.entityLinks; }
  get relationshipLinks(): RelationshipLink[] { return this.props.relationshipLinks; }
  get citations(): Citation[] { return this.props.citations; }
  get mediaLinks(): MediaLink[] { return this.props.mediaLinks; }
  get seo(): ArticleSeo { return this.props.seo; }




  public update(title?: string, summary?: string, content?: string): void {
    if (title) this.props.title = title;
    if (summary) this.props.summary = summary;
    if (content) this.props.content = content;
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addTag(tag: ArticleTag): void {
    if (this.props.tags.some(t => t.value === tag.value)) return;
    this.props.tags.push(tag);
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addCategory(category: ArticleCategory): void {
    if (this.props.categories.some(c => c.name === category.name)) return;
    this.props.categories.push(category);
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addMediaLink(mediaLink: MediaLink): void {
    this.props.mediaLinks.push(mediaLink);
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addCitation(sourceId: UniqueEntityId, text: string): void {
    const order = this.props.citations.length + 1;
    const citation = new Citation(this.id, sourceId, text, order);
    this.props.citations.push(citation);
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addEntityLink(entityId: UniqueEntityId): void {
    if (this.props.entityLinks.some(link => link.entityId.equals(entityId))) {
      return; 
    }
    this.props.entityLinks.push(new EntityLink(entityId));
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public addRelationshipLink(relationshipId: UniqueEntityId): void {
    if (this.props.relationshipLinks.some(link => link.relationshipId.equals(relationshipId))) {
      return; 
    }
    this.props.relationshipLinks.push(new RelationshipLink(relationshipId));
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public restoreFromRevision(revision: Revision): void {
    const snapshot = revision.contentSnapshot;
    
    this.props.title = snapshot.title;
    this.props.slug = snapshot.slug;
    this.props.summary = snapshot.summary;
    this.props.content = snapshot.content;
    this.props.language = snapshot.language;
    this.props.authorId = snapshot.authorId;
    
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public submitForReview(): void {
    if (this.props.status !== ArticleStatus.DRAFT && this.props.status !== ArticleStatus.REJECTED) {
      throw new Error('Only DRAFT or REJECTED articles can be submitted for review');
    }
    this.props.status = ArticleStatus.REVIEW;
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleSubmittedEvent(this.id));
  }

  public approve(): void {
    if (this.props.status !== ArticleStatus.REVIEW) {
      throw new Error('Only REVIEW articles can be approved');
    }
    this.props.status = ArticleStatus.APPROVED;
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleApprovedEvent(this.id));
  }

  public reject(): void {
    if (this.props.status !== ArticleStatus.REVIEW) {
      throw new Error('Only REVIEW articles can be rejected');
    }
    this.props.status = ArticleStatus.REJECTED;
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleUpdatedEvent(this.id));
  }

  public publish(): void {
    if (this.props.status !== ArticleStatus.APPROVED) {
      throw new Error('Only APPROVED articles can be published');
    }
    this.props.status = ArticleStatus.PUBLISHED;
    this.props.publishedAt = new Date();
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticlePublishedEvent(this.id));
  }

  public archive(): void {
    this.props.status = ArticleStatus.ARCHIVED;
    this.props.updatedAt = new Date();
    this.props.version += 1;
    this.addDomainEvent(new ArticleArchivedEvent(this.id));
  }
}
