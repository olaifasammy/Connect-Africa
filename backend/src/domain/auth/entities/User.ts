import { AggregateRoot } from '@domain/shared/AggregateRoot';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';
import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
import { UserCreatedEvent } from '../events/UserCreatedEvent';

export interface UserProps {
  email: Email;
  passwordHash: PasswordHash;
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
}
