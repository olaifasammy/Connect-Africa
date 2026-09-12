import { ValueObject } from '@shared/domain/ValueObject';

export type EntityMetadataAttributes =
  Record<string, unknown>;

interface EntityMetadataProps {
  slug?: string;
  description?: string;
  source?: string;
  tags: string[];
  attributes: EntityMetadataAttributes;
}

export class EntityMetadata
  extends ValueObject<EntityMetadataProps>
{
  private constructor(
    props: EntityMetadataProps,
  ) {
    super({
      ...props,
      tags: [...props.tags],
      attributes: {
        ...props.attributes,
      },
    });
  }

  public static create(
    props: Partial<EntityMetadataProps> = {},
  ): EntityMetadata {
    return new EntityMetadata({
      slug:
        props.slug?.trim() ||
        undefined,

      description:
        props.description?.trim() ||
        undefined,

      source:
        props.source?.trim() ||
        undefined,

      tags: [
        ...(props.tags ?? []),
      ],

      attributes: {
        ...(props.attributes ?? {}),
      },
    });
  }

  get slug(): string | undefined {
    return this.props.slug;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get source(): string | undefined {
    return this.props.source;
  }

  get tags(): string[] {
    return [...this.props.tags];
  }

  get attributes(): EntityMetadataAttributes {
    return {
      ...this.props.attributes,
    };
  }

  public merge(
    other: EntityMetadata,
  ): EntityMetadata {
    return EntityMetadata.create({
      slug:
        other.slug ??
        this.slug,

      description:
        other.description ??
        this.description,

      source:
        other.source ??
        this.source,

      tags: [
        ...new Set([
          ...this.tags,
          ...other.tags,
        ]),
      ],

      attributes: {
        ...this.attributes,
        ...other.attributes,
      },
    });
  }
}