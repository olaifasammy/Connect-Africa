import { ValueObject } from '@shared/domain/ValueObject';

export type EntityMetadataAttributes =
  Record<string, unknown>;

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'COMMUNITY_VERIFIED'
  | 'OFFICIALLY_VERIFIED';

interface EntityMetadataProps {
  slug?: string;
  description?: string;
  source?: string;
  tags: string[];
  attributes: EntityMetadataAttributes;
  showcaseContent?: string;
  businessProfile?: Record<string, unknown>;
  verificationStatus?: VerificationStatus;
  verificationDetails?: Record<string, unknown>;
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

      showcaseContent:
        props.showcaseContent?.trim() ||
        undefined,

      businessProfile: {
        ...(props.businessProfile ?? {}),
      },

      verificationStatus:
        props.verificationStatus ||
        'UNVERIFIED',

      verificationDetails: {
        ...(props.verificationDetails ?? {}),
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

  get showcaseContent(): string | undefined {
    return this.props.showcaseContent;
  }

  get businessProfile(): Record<string, unknown> {
    return {
      ...(this.props.businessProfile ?? {}),
    };
  }

  get verificationStatus(): VerificationStatus {
    return this.props.verificationStatus || 'UNVERIFIED';
  }

  get verificationDetails(): Record<string, unknown> {
    return {
      ...(this.props.verificationDetails ?? {}),
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

      showcaseContent:
        other.showcaseContent ??
        this.showcaseContent,

      businessProfile: {
        ...this.businessProfile,
        ...other.businessProfile,
      },

      verificationStatus:
        other.verificationStatus ??
        this.verificationStatus,

      verificationDetails: {
        ...this.verificationDetails,
        ...other.verificationDetails,
      },
    });
  }
}