import { ValueObject } from '@shared/domain/ValueObject';

interface EntityMetadataProps {
  slug?: string;
  description?: string;
  source?: string;
  tags: string[];
}

export class EntityMetadata extends ValueObject<EntityMetadataProps> {
  private constructor(props: EntityMetadataProps) {
    super(props);
  }

  public static create(props: EntityMetadataProps): EntityMetadata {
    return new EntityMetadata({
      slug: props.slug,
      description: props.description,
      source: props.source,
      tags: props.tags || [],
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
    return this.props.tags;
  }

  public merge(other: EntityMetadata): EntityMetadata {
    return EntityMetadata.create({
      slug: other.slug || this.slug,
      description: other.description || this.description,
      source: other.source || this.source,
      tags: [...new Set([...this.tags, ...other.tags])],
    });
  }
}
