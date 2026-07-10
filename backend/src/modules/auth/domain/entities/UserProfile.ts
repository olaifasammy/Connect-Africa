import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserId } from '../value-objects/UserId';

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

export class UserProfile extends AggregateRoot<UserProfileProps> {
  private constructor(props: UserProfileProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UserProfileProps, id?: UserProfileId): UserProfile {
    const entityId = id ? new UniqueEntityId(id.value) : new UniqueEntityId();
    return new UserProfile(props, entityId);
  }

  get userId(): UserId { return this.props.userId; }
  get bio(): string | undefined { return this.props.bio; }
  get avatarUrl(): string | undefined { return this.props.avatarUrl; }
  get displayName(): string { return this.props.displayName; }
  get coverImageUrl(): string | undefined { return this.props.coverImageUrl; }
  get website(): string | undefined { return this.props.website; }
  get socialLinks(): string[] | undefined { return this.props.socialLinks; }
  get country(): string | undefined { return this.props.country; }
  get languages(): string[] | undefined { return this.props.languages; }
  get expertise(): string[] | undefined { return this.props.expertise; }
  get researchInterests(): string[] | undefined { return this.props.researchInterests; }

  updateProfile(props: Partial<UserProfileProps>): void {
    Object.assign(this.props, props);
  }
}
