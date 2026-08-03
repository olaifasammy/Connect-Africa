import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserId } from '@modules/auth/public';
import { SettingsProfileId } from '../value-objects/SettingsValueObjects';

interface SettingsProfileProps {
  userId: UserId;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  updatedAt: Date;
}

export class SettingsProfile extends AggregateRoot<SettingsProfileProps> {
  private constructor(props: SettingsProfileProps, id?: SettingsProfileId) {
    super(props, id || new SettingsProfileId());
  }

  static create(props: SettingsProfileProps, id?: SettingsProfileId): SettingsProfile {
    return new SettingsProfile(props, id);
  }

  get userId(): UserId { return this.props.userId; }
  get displayName(): string { return this.props.displayName; }
  get avatarUrl(): string | undefined { return this.props.avatarUrl; }
  get bio(): string | undefined { return this.props.bio; }
  get updatedAt(): Date { return this.props.updatedAt; }

  updateProfile(props: Partial<SettingsProfileProps>): void {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }
}
