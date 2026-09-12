import {
  AggregateRoot,
} from '@shared/domain/AggregateRoot';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  UserProfileId,
} from '../value-objects/UserProfileId';

import {
  UserId,
} from '../value-objects/UserId';

export interface UserProfileProps {
  userId: UserId;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  website?: string;
  socialLinks?: string[];
  country?: string;
  languages?: string[];
  expertise?: string[];
  researchInterests?: string[];
}

export class UserProfile
  extends AggregateRoot<UserProfileProps>
{
  private constructor(
    props: UserProfileProps,
    id?: UniqueEntityId,
  ) {
    UserProfile.validateProps(
      props,
    );

    super(
      UserProfile.cloneProps(
        props,
      ),
      id,
    );

    this.validateInvariants();
  }

  public static create(
    props: UserProfileProps,
    id?: UserProfileId,
  ): UserProfile {
    const entityId =
      id
        ? new UniqueEntityId(
            id.value,
          )
        : new UniqueEntityId();

    return new UserProfile(
      props,
      entityId,
    );
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get bio(): string | undefined {
    return this.props.bio;
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get coverImageUrl(): string | undefined {
    return this.props.coverImageUrl;
  }

  get website(): string | undefined {
    return this.props.website;
  }

  get socialLinks(): string[] | undefined {
    return this.props.socialLinks
      ? [...this.props.socialLinks]
      : undefined;
  }

  get country(): string | undefined {
    return this.props.country;
  }

  get languages(): string[] | undefined {
    return this.props.languages
      ? [...this.props.languages]
      : undefined;
  }

  get expertise(): string[] | undefined {
    return this.props.expertise
      ? [...this.props.expertise]
      : undefined;
  }

  get researchInterests(): string[] | undefined {
    return this.props.researchInterests
      ? [...this.props.researchInterests]
      : undefined;
  }

  updateProfile(
    props: Partial<UserProfileProps>,
  ): void {
    const nextProps: UserProfileProps = {
      ...this.props,
      ...props,
    };

    UserProfile.validateProps(
      nextProps,
    );

    const normalized =
      UserProfile.cloneProps(
        nextProps,
      );

    this.props.displayName =
      normalized.displayName;

    this.props.bio =
      normalized.bio;

    this.props.avatarUrl =
      normalized.avatarUrl;

    this.props.coverImageUrl =
      normalized.coverImageUrl;

    this.props.website =
      normalized.website;

    this.props.socialLinks =
      normalized.socialLinks;

    this.props.country =
      normalized.country;

    this.props.languages =
      normalized.languages;

    this.props.expertise =
      normalized.expertise;

    this.props.researchInterests =
      normalized.researchInterests;

    this.validateInvariants();
  }

  private static validateProps(
    props: UserProfileProps,
  ): void {
    if (!props) {
      throw new Error(
        'User profile properties are required.',
      );
    }

    if (!props.userId) {
      throw new Error(
        'User ID is required.',
      );
    }

    if (
      typeof props.displayName !==
        'string' ||
      props.displayName.trim()
        .length < 2 ||
      props.displayName.trim()
        .length > 100
    ) {
      throw new Error(
        'Display name must contain between 2 and 100 characters.',
      );
    }

    UserProfile.validateOptionalString(
      props.bio,
      'Bio',
      2000,
    );

    UserProfile.validateOptionalString(
      props.avatarUrl,
      'Avatar URL',
      2048,
    );

    UserProfile.validateOptionalString(
      props.coverImageUrl,
      'Cover image URL',
      2048,
    );

    UserProfile.validateOptionalString(
      props.website,
      'Website',
      2048,
    );

    UserProfile.validateOptionalString(
      props.country,
      'Country',
      100,
    );

    UserProfile.validateStringArray(
      props.socialLinks,
      'Social links',
      20,
      2048,
    );

    UserProfile.validateStringArray(
      props.languages,
      'Languages',
      20,
      100,
    );

    UserProfile.validateStringArray(
      props.expertise,
      'Expertise',
      50,
      200,
    );

    UserProfile.validateStringArray(
      props.researchInterests,
      'Research interests',
      50,
      200,
    );
  }

  private static validateOptionalString(
    value: string | undefined,
    field: string,
    maxLength: number,
  ): void {
    if (
      value === undefined
    ) {
      return;
    }

    if (
      typeof value !== 'string' ||
      value.trim().length >
        maxLength
    ) {
      throw new Error(
        `${field} exceeds the maximum allowed length.`,
      );
    }
  }

  private static validateStringArray(
    value: string[] | undefined,
    field: string,
    maxItems: number,
    maxItemLength: number,
  ): void {
    if (
      value === undefined
    ) {
      return;
    }

    if (
      !Array.isArray(value) ||
      value.length > maxItems
    ) {
      throw new Error(
        `${field} contains too many items.`,
      );
    }

    for (
      const item of value
    ) {
      if (
        typeof item !== 'string' ||
        item.trim() === '' ||
        item.length > maxItemLength
      ) {
        throw new Error(
          `${field} contains an invalid item.`,
        );
      }
    }
  }

  private static cloneProps(
    props: UserProfileProps,
  ): UserProfileProps {
    return {
      ...props,
      displayName:
        props.displayName.trim(),
      bio:
        props.bio?.trim(),
      avatarUrl:
        props.avatarUrl?.trim(),
      coverImageUrl:
        props.coverImageUrl?.trim(),
      website:
        props.website?.trim(),
      country:
        props.country?.trim(),
      socialLinks:
        props.socialLinks
          ? [...props.socialLinks]
          : undefined,
      languages:
        props.languages
          ? [...props.languages]
          : undefined,
      expertise:
        props.expertise
          ? [...props.expertise]
          : undefined,
      researchInterests:
        props.researchInterests
          ? [...props.researchInterests]
          : undefined,
    };
  }

  private validateInvariants(): void {
    if (!this.props.userId) {
      throw new Error(
        'User profile must belong to a user.',
      );
    }

    if (
      this.props.displayName.trim()
        .length < 2
    ) {
      throw new Error(
        'User profile display name is invalid.',
      );
    }
  }
}
