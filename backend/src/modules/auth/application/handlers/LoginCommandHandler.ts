import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  LoginCommand,
} from '../commands/LoginCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  IPasswordHasher,
} from '@modules/auth/domain/interfaces/IPasswordHasher';

import {
  IJwtProvider,
} from '@modules/auth/domain/interfaces/IJwtProvider';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  ITotpProvider,
} from '@modules/auth/domain/interfaces/ITotpProvider';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UserLoggedInEvent,
} from '@modules/auth/domain/events/UserLoggedInEvent';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  Audit,
} from '@shared/infrastructure/audit/AuditDecorator';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

export interface LoginResult {
  readonly accessToken: string;
  readonly refreshToken: string;
}

@provide(
  LoginCommandHandler,
  true,
)
@injectable()
export class LoginCommandHandler
  implements
    ICommandHandler<
      LoginCommand,
      LoginResult
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('IPasswordHasher')
    private readonly passwordHasher:
      IPasswordHasher,

    @inject('IJwtProvider')
    private readonly jwtProvider:
      IJwtProvider,

    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,

    @inject('ITotpProvider')
    private readonly totpProvider:
      ITotpProvider,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  @Audit(
    'LOGIN',
    'AUTH',
  )
  async handle(
    command: LoginCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<LoginResult> {
    const user =
      await this.userRepository.findByEmail(
        command.email,
      );

    if (!user) {
      throw new AuthenticationError(
        'Invalid credentials.',
      );
    }

    switch (user.accountStatus) {
      case AccountStatus.PENDING_VERIFICATION:
        throw new AuthenticationError(
          'Email verification is required.',
        );

      case AccountStatus.DISABLED:
        throw new AuthenticationError(
          'Account is disabled.',
        );

      case AccountStatus.SUSPENDED:
        throw new AuthenticationError(
          'Account is suspended.',
        );

      case AccountStatus.BANNED:
        throw new AuthenticationError(
          'Account is banned.',
        );

      case AccountStatus.ACTIVE:
        break;

      default:
        throw new AuthenticationError(
          'Account status is invalid.',
        );
    }

    if (user.isLocked()) {
      throw new AuthenticationError(
        'Account is locked. Please try again later.',
      );
    }

    const isPasswordValid =
      await this.passwordHasher.compare(
        command.password,
        user.passwordHash.value,
      );

    if (!isPasswordValid) {
      user.incrementFailedLoginAttempts();

      await this.userRepository.save(
        user,
      );

      throw new AuthenticationError(
        'Invalid credentials.',
      );
    }

    /*
     * Password authentication has succeeded.
     *
     * MFA authentication MUST happen before issuing
     * either JWT or creating a refresh-token session.
     */
    if (user.mfaSecret) {
      if (!command.mfaCode) {
        throw new AuthenticationError(
          'MFA verification required.',
        );
      }

      if (
        !/^\d{6}$/.test(
          command.mfaCode,
        )
      ) {
        throw new AuthenticationError(
          'Invalid MFA code.',
        );
      }

      const isMfaValid =
        this.totpProvider.verifyCode(
          user.mfaSecret,
          command.mfaCode,
        );

      if (!isMfaValid) {
        throw new AuthenticationError(
          'Invalid MFA code.',
        );
      }
    }

    user.resetFailedLoginAttempts();

    await this.userRepository.save(
      user,
    );

    const accessToken =
      this.jwtProvider.generateToken(
        user.id.toString(),
        'ACCESS',
      );

    const refreshToken =
      this.jwtProvider.generateToken(
        user.id.toString(),
        'REFRESH',
      );

    await this.sessionRepository.createSession(
      new UniqueEntityId(
        user.id.toString(),
      ),
      refreshToken,
    );

    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.id,
      ),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
