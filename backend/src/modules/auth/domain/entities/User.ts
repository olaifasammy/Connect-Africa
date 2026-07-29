import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
import { UserCreatedEvent } from '../events/UserCreatedEvent';

export interface UserProps {
  email: Email;
  passwordHash: PasswordHash;
  isActive: boolean;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
}

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    if (!id) {
        this.addDomainEvent(new UserCreatedEvent(this.id, this.props.email.value));
    }
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get failedLoginAttempts(): number {
      return this.props.failedLoginAttempts;
  }

  get lockedUntil(): Date | null {
      return this.props.lockedUntil;
  }

  isLocked(): boolean {
      return this.props.lockedUntil !== null && this.props.lockedUntil > new Date();
  }

  incrementFailedLoginAttempts(): void {
      this.props.failedLoginAttempts += 1;
      if (this.props.failedLoginAttempts >= 5) {
          this.props.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      }
  }

  resetFailedLoginAttempts(): void {
      this.props.failedLoginAttempts = 0;
      this.props.lockedUntil = null;
  }

  unlock(): void {
      this.resetFailedLoginAttempts();
  }

  activate(): void {
    this.props.isActive = true;
  }

  ban(): void {
    this.props.isActive = false;
  }
}
