import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export type SearchContentValue =
  | string
  | number
  | boolean
  | null
  | SearchContentValue[]
  | {
      [key: string]: SearchContentValue;
    };

export type SearchContent = Record<string, SearchContentValue>;

export type SearchResourceType =
  | 'entity'
  | 'article'
  | 'ontology'
  | 'relationship'
  | 'source'
  | 'user';

export interface SearchDocumentProps {
  readonly id: UniqueEntityId;
  readonly resourceType: SearchResourceType;
  readonly resourceId: UniqueEntityId;
  readonly content: SearchContent;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly projectionVersion?: number;
}

export class SearchDocument {
  public static readonly CURRENT_PROJECTION_VERSION = 1;

  public readonly id: UniqueEntityId;
  public readonly resourceType: SearchResourceType;
  public readonly resourceId: UniqueEntityId;
  public readonly content: SearchContent;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly projectionVersion: number;

  constructor(props: SearchDocumentProps) {
    if (!props.id) {
      throw new Error('Search document ID is required.');
    }

    if (!props.resourceId) {
      throw new Error('Search resource ID is required.');
    }

    if (
      typeof props.resourceType !== 'string' ||
      props.resourceType.trim() === ''
    ) {
      throw new Error('Search resource type is required.');
    }

    if (
      !props.content ||
      typeof props.content !== 'object' ||
      Array.isArray(props.content)
    ) {
      throw new Error('Search document content must be an object.');
    }

    if (
      !(props.createdAt instanceof Date) ||
      Number.isNaN(props.createdAt.getTime())
    ) {
      throw new Error(
        'Search document createdAt must be a valid date.',
      );
    }

    const updatedAt = props.updatedAt ?? props.createdAt;

    if (
      !(updatedAt instanceof Date) ||
      Number.isNaN(updatedAt.getTime())
    ) {
      throw new Error(
        'Search document updatedAt must be a valid date.',
      );
    }

    const projectionVersion =
      props.projectionVersion ??
      SearchDocument.CURRENT_PROJECTION_VERSION;

    if (
      !Number.isInteger(projectionVersion) ||
      projectionVersion < 1
    ) {
      throw new Error(
        'Search document projectionVersion must be a positive integer.',
      );
    }

    this.id = props.id;
    this.resourceType = props.resourceType;
    this.resourceId = props.resourceId;
    this.content = SearchDocument.cloneContent(props.content);
    this.createdAt = new Date(props.createdAt.getTime());
    this.updatedAt = new Date(updatedAt.getTime());
    this.projectionVersion = projectionVersion;
  }

  private static cloneContent(
    content: SearchContent,
  ): SearchContent {
    return JSON.parse(
      JSON.stringify(content),
    ) as SearchContent;
  }
}
