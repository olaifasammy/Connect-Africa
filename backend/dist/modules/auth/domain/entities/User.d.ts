import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
export interface UserProps {
    email: Email;
    passwordHash: PasswordHash;
    isActive: boolean;
}
export declare class User extends AggregateRoot<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityId);
    get email(): Email;
    get passwordHash(): PasswordHash;
    get isActive(): boolean;
    activate(): void;
    ban(): void;
}
