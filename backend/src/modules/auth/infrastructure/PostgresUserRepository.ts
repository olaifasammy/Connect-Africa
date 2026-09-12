import { Pool } from 'pg';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  User,
} from '@modules/auth/domain/entities/User';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  Email,
} from '@modules/auth/domain/value-objects/Email';

import {
  PasswordHash,
} from '@modules/auth/domain/value-objects/PasswordHash';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
} from 'inversify';

import {
  Roles,
} from '@modules/auth/domain/policies/rbac/Role';

@provide(
  'IUserRepository',
  true,
)
@injectable()
export class PostgresUserRepository
  implements IUserRepository
{
  private static readonly USER_COLUMNS = `
    id,
    email,
    password_hash,
    account_status,
    email_verified_at,
    failed_login_attempts,
    locked_until,
    role,
    mfa_secret
  `;

  constructor(
    private readonly pool: Pool,
  ) {}

  async save(
    user: User,
  ): Promise<void> {
    const query = `
      INSERT INTO users (
        id,
        email,
        password_hash,
        account_status,
        email_verified_at,
        failed_login_attempts,
        locked_until,
        role,
        mfa_secret
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        account_status = EXCLUDED.account_status,
        email_verified_at = EXCLUDED.email_verified_at,
        failed_login_attempts = EXCLUDED.failed_login_attempts,
        locked_until = EXCLUDED.locked_until,
        role = EXCLUDED.role,
        mfa_secret = EXCLUDED.mfa_secret
    `;

    await this.pool.query(
      query,
      [
        user.id.toString(),
        user.email.value,
        user.passwordHash.value,
        user.accountStatus,
        user.emailVerifiedAt,
        user.failedLoginAttempts,
        user.lockedUntil,
        user.role,
        user.mfaSecret ?? null,
      ],
    );
  }

  async delete(
    id: UniqueEntityId,
  ): Promise<void> {
    const result =
      await this.pool.query(
        `
          DELETE FROM users
          WHERE id = $1
        `,
        [
          id.toString(),
        ],
      );

    if (result.rowCount !== 1) {
      throw new Error(
        'User could not be deleted because the account no longer exists.',
      );
    }
  }

  async findById(
    id: UniqueEntityId,
  ): Promise<User | null> {
    const result =
      await this.pool.query(
        `
          SELECT
            ${PostgresUserRepository.USER_COLUMNS}
          FROM users
          WHERE id = $1
        `,
        [
          id.toString(),
        ],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.toDomain(
      result.rows[0],
    );
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    const normalizedEmail =
      this.normalizeEmail(email);

    const result =
      await this.pool.query(
        `
          SELECT
            ${PostgresUserRepository.USER_COLUMNS}
          FROM users
          WHERE LOWER(email) = $1
        `,
        [
          normalizedEmail,
        ],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.toDomain(
      result.rows[0],
    );
  }

  async findAll(): Promise<User[]> {
    const result =
      await this.pool.query(
        `
          SELECT
            ${PostgresUserRepository.USER_COLUMNS}
          FROM users
          ORDER BY id ASC
        `,
      );

    return result.rows.map(
      (row) =>
        this.toDomain(row),
    );
  }

  async search(
    term: string,
  ): Promise<User[]> {
    const normalizedTerm =
      term.trim();

    if (
      normalizedTerm === ''
    ) {
      return [];
    }

    const result =
      await this.pool.query(
        `
          SELECT
            ${PostgresUserRepository.USER_COLUMNS}
          FROM users
          WHERE LOWER(email)
            LIKE LOWER($1)
          ORDER BY email ASC
        `,
        [
          `%${normalizedTerm}%`,
        ],
      );

    return result.rows.map(
      (row) =>
        this.toDomain(row),
    );
  }

  private normalizeEmail(
    email: string,
  ): string {
    return email
      .trim()
      .toLowerCase();
  }

  private toDomain(
    row: {
      id: string;
      email: string;
      password_hash: string;
      account_status: string;
      email_verified_at: Date | null;
      failed_login_attempts: number;
      locked_until: Date | null;
      role: string;
      mfa_secret: string | null;
    },
  ): User {
    if (
      typeof row.id !== 'string' ||
      row.id.trim() === ''
    ) {
      throw new Error(
        'Persisted user ID is invalid.',
      );
    }

    if (
      typeof row.email !== 'string' ||
      row.email.trim() === ''
    ) {
      throw new Error(
        'Persisted user email is invalid.',
      );
    }

    if (
      typeof row.password_hash !== 'string' ||
      row.password_hash.trim() === ''
    ) {
      throw new Error(
        'Persisted user password hash is invalid.',
      );
    }

    const normalizedStatus =
      typeof row.account_status === 'string'
        ? row.account_status
            .trim()
            .toUpperCase()
        : '';

    if (
      !Object.values(AccountStatus).includes(
        normalizedStatus as AccountStatus,
      )
    ) {
      throw new Error(
        'Persisted user account status is invalid.',
      );
    }

    if (
      row.email_verified_at !== null &&
      !(
        row.email_verified_at instanceof Date
      )
    ) {
      throw new Error(
        'Persisted email verification timestamp is invalid.',
      );
    }

    if (
      !Number.isInteger(
        row.failed_login_attempts,
      ) ||
      row.failed_login_attempts < 0
    ) {
      throw new Error(
        'Persisted failed login attempts are invalid.',
      );
    }

    if (
      row.locked_until !== null &&
      !(
        row.locked_until instanceof Date
      )
    ) {
      throw new Error(
        'Persisted lock expiration is invalid.',
      );
    }

    const normalizedRole =
      typeof row.role === 'string'
        ? row.role.trim().toUpperCase()
        : '';

    if (
      !(normalizedRole in Roles)
    ) {
      throw new Error(
        'Persisted user role is invalid.',
      );
    }

    if (
      row.mfa_secret !== null &&
      (
        typeof row.mfa_secret !== 'string' ||
        row.mfa_secret.trim() === ''
      )
    ) {
      throw new Error(
        'Persisted MFA secret is invalid.',
      );
    }

    return new User(
      {
        email:
          new Email(row.email),

        passwordHash:
          new PasswordHash(
            row.password_hash,
          ),

        accountStatus:
          normalizedStatus as AccountStatus,

        emailVerifiedAt:
          row.email_verified_at,

        failedLoginAttempts:
          row.failed_login_attempts,

        lockedUntil:
          row.locked_until,

        role:
          normalizedRole,

        mfaSecret:
          row.mfa_secret ??
          undefined,
      },

      new UniqueEntityId(
        row.id,
      ),
    );
  }
}
