import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
import { AccountStatus } from '../value-objects/AccountStatus';

import { UserCreatedEvent } from '../events/UserCreatedEvent';
import { Roles } from '../policies/rbac/Role';

export interface UserProps {
  email: Email;
  passwordHash: PasswordHash;

  /**
   * Canonical account lifecycle state.
   */
  accountStatus?: AccountStatus;

  /**
   * Legacy construction compatibility.
   *
   * This is accepted only so existing callers/tests can migrate
   * without making the lifecycle model depend on a persisted
   * is_active field.
   */
  isActive?: boolean;

  /**
   * Independent email-verification state.
   */
  emailVerifiedAt?: Date | null;

  failedLoginAttempts?: number;
  lockedUntil?: Date | null;
  mfaSecret?: string;
  role?: string;
}

export class User
  extends AggregateRoot<UserProps>
{
  constructor(
    props: UserProps,
    id?: UniqueEntityId,
  ) {
    User.validateProps(props);

    const accountStatus =
      props.accountStatus ??
      (
        props.isActive === undefined
          ? AccountStatus.PENDING_VERIFICATION
          : (
              props.isActive
                ? AccountStatus.ACTIVE
                : AccountStatus.PENDING_VERIFICATION
            )
      );

    super(
      {
        ...props,
        accountStatus,
        isActive: undefined,
        emailVerifiedAt:
          props.emailVerifiedAt ?? null,
        failedLoginAttempts:
          props.failedLoginAttempts ?? 0,
        lockedUntil:
          props.lockedUntil ?? null,
        mfaSecret:
          props.mfaSecret ?? undefined,
        role:
          props.role ?? Roles.USER.name,
      },
      id,
    );

    this.validateInvariants();

    if (!id) {
      this.addDomainEvent(
        new UserCreatedEvent(
          this.id,
          this.props.email.value,
        ),
      );
    }
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  /**
   * Compatibility projection.
   *
   * Account lifecycle is governed by accountStatus.
   * This getter must not be persisted.
   */
  get isActive(): boolean {
    return (
      this.accountStatus ===
      AccountStatus.ACTIVE
    );
  }

  get accountStatus(): AccountStatus {
    return (
      this.props.accountStatus ??
      AccountStatus.PENDING_VERIFICATION
    );
  }

  get emailVerifiedAt(): Date | null {
    return (
      this.props.emailVerifiedAt ??
      null
    );
  }

  get failedLoginAttempts(): number {
    return this.props.failedLoginAttempts ?? 0;
  }

  get lockedUntil(): Date | null {
    return this.props.lockedUntil ?? null;
  }

  get mfaSecret(): string | undefined {
    return this.props.mfaSecret;
  }

  get role(): string {
    return this.props.role ?? Roles.USER.name;
  }

  isEmailVerified(): boolean {
    return this.emailVerifiedAt !== null;
  }

  verifyEmail(at: Date = new Date()): void {
    if (!(at instanceof Date)) {
      throw new Error(
        'Email verification timestamp is invalid.',
      );
    }

    if (
      this.emailVerifiedAt !== null
    ) {
      return;
    }

    this.props.emailVerifiedAt = at;
  }

  assignRole(role: string): void {
    const normalizedRole =
      role.trim().toUpperCase();

    if (!(normalizedRole in Roles)) {
      throw new Error('Invalid user role.');
    }

    if (
      normalizedRole === Roles.USER.name &&
      this.role === Roles.USER.name
    ) {
      return;
    }

    this.props.role = normalizedRole;
  }

  removeRole(role: string): void {
    const normalizedRole =
      role.trim().toUpperCase();

    if (!(normalizedRole in Roles)) {
      throw new Error('Invalid user role.');
    }

    if (
      normalizedRole === Roles.USER.name
    ) {
      throw new Error(
        'The USER role cannot be removed.',
      );
    }

    if (this.role !== normalizedRole) {
      throw new Error(
        'User does not have the specified role.',
      );
    }

    this.props.role = Roles.USER.name;
  }

  setMfaSecret(secret: string): void {
    if (
      typeof secret !== 'string' ||
      secret.trim() === ''
    ) {
      throw new Error(
        'MFA secret is required.',
      );
    }

    this.props.mfaSecret = secret.trim();
  }

  clearMfaSecret(): void {
    this.props.mfaSecret = undefined;
  }

  updatePassword(
    passwordHash: PasswordHash,
  ): void {
    if (!passwordHash) {
      throw new Error(
        'Password hash is required.',
      );
    }

    this.props.passwordHash = passwordHash;
    this.resetFailedLoginAttempts();
  }

  updateEmail(email: Email): void {
    if (!email) {
      throw new Error('Email is required.');
    }

    this.props.email = email;
  }

  isLocked(): boolean {
    const lockedUntil =
      this.props.lockedUntil;

    return (
      lockedUntil !== null &&
      lockedUntil !== undefined &&
      lockedUntil > new Date()
    );
  }

  incrementFailedLoginAttempts(): void {
    this.props.failedLoginAttempts =
      this.failedLoginAttempts + 1;

    if (
      this.props.failedLoginAttempts >= 5
    ) {
      this.props.lockedUntil =
        new Date(
          Date.now() +
            15 * 60 * 1000,
        );
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
    this.props.accountStatus =
      AccountStatus.ACTIVE;
  }

  disable(): void {
    this.props.accountStatus =
      AccountStatus.DISABLED;
  }

  suspend(): void {
    this.props.accountStatus =
      AccountStatus.SUSPENDED;
  }

  ban(): void {
    this.props.accountStatus =
      AccountStatus.BANNED;
  }

  private static validateProps(
    props: UserProps,
  ): void {
    if (!props) {
      throw new Error(
        'User properties are required.',
      );
    }

    if (!props.email) {
      throw new Error(
        'User email is required.',
      );
    }

    if (!props.passwordHash) {
      throw new Error(
        'User password hash is required.',
      );
    }

    if (
      props.accountStatus !== undefined &&
      !Object.values(AccountStatus).includes(
        props.accountStatus,
      )
    ) {
      throw new Error(
        'User account status is invalid.',
      );
    }

    if (
      props.isActive !== undefined &&
      typeof props.isActive !== 'boolean'
    ) {
      throw new Error(
        'User active status is invalid.',
      );
    }

    if (
      props.emailVerifiedAt !== undefined &&
      props.emailVerifiedAt !== null &&
      !(
        props.emailVerifiedAt instanceof Date
      )
    ) {
      throw new Error(
        'Email verification timestamp is invalid.',
      );
    }

    if (
      props.failedLoginAttempts !==
        undefined &&
      (
        !Number.isInteger(
          props.failedLoginAttempts,
        ) ||
        props.failedLoginAttempts < 0
      )
    ) {
      throw new Error(
        'Failed login attempts are invalid.',
      );
    }

    if (
      props.lockedUntil !== undefined &&
      props.lockedUntil !== null &&
      !(
        props.lockedUntil instanceof Date
      )
    ) {
      throw new Error(
        'Lock expiration is invalid.',
      );
    }

    if (
      props.mfaSecret !== undefined &&
      (
        typeof props.mfaSecret !== 'string' ||
        props.mfaSecret.trim() === ''
      )
    ) {
      throw new Error(
        'MFA secret is invalid.',
      );
    }

    if (
      props.role !== undefined &&
      (
        typeof props.role !== 'string' ||
        props.role.trim() === ''
      )
    ) {
      throw new Error(
        'User role is invalid.',
      );
    }
  }

  private validateInvariants(): void {
    if (
      !Object.values(AccountStatus).includes(
        this.accountStatus,
      )
    ) {
      throw new Error(
        'User account status is invalid.',
      );
    }

    if (
      this.failedLoginAttempts < 0
    ) {
      throw new Error(
        'Failed login attempts cannot be negative.',
      );
    }

    if (
      this.mfaSecret !== undefined &&
      this.mfaSecret.trim() === ''
    ) {
      throw new Error(
        'MFA secret cannot be empty.',
      );
    }

    if (
      this.emailVerifiedAt !== null &&
      !(this.emailVerifiedAt instanceof Date)
    ) {
      throw new Error(
        'Email verification timestamp is invalid.',
      );
    }
  }
}
