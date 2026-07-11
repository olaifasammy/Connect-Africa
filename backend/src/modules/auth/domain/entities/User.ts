import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
import { UserCreatedEvent } from '../events/UserCreatedEvent';

export interface UserProps {
  email: Email;
  passwordHash: PasswordHash;
  isActive: boolean;
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

  activate(): void {
    this.props.isActive = true;
  }

  ban(): void {
    this.props.isActive = false;
  }
}
