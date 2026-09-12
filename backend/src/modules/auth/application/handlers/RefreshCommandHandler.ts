import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  ICommand,
} from '@shared/application/commands/ICommand';

import {
  IJwtProvider,
} from '@modules/auth/domain/interfaces/IJwtProvider';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

export class RefreshCommand
  implements ICommand
{
  constructor(
    public readonly refreshToken: string,
    public readonly ipAddress?: string,
  ) {}
}

@provide(
  RefreshCommandHandler,
  true,
)
@injectable()
export class RefreshCommandHandler
  implements
    ICommandHandler<
      RefreshCommand,
      {
        accessToken: string;
        refreshToken: string;
      }
    >
{
  constructor(
    @inject('IJwtProvider')
    private readonly jwtProvider:
      IJwtProvider,

    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,

    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,
  ) {}

  async handle(
    command: RefreshCommand,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let authenticatedUserId =
      'UNKNOWN';

    try {
      const userId =
        this.jwtProvider.verifyToken(
          command.refreshToken,
          'REFRESH',
        );

      authenticatedUserId =
        userId;

      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            userId,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
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
          'Account is locked.',
        );
      }

      const sessionUserId =
        await this.sessionRepository.getSessionUserId(
          command.refreshToken,
        );

      if (
        !sessionUserId ||
        sessionUserId.toString() !== userId
      ) {
        throw new AuthenticationError(
          'Refresh session is invalid or has been revoked.',
        );
      }

      const accessToken =
        this.jwtProvider.generateToken(
          userId,
          'ACCESS',
        );

      const refreshToken =
        this.jwtProvider.generateToken(
          userId,
          'REFRESH',
        );

      await this.sessionRepository.rotateSession(
        new UniqueEntityId(userId),
        command.refreshToken,
        refreshToken,
      );

      AuditLogger.log({
        user:
          userId,
        action:
          'REFRESH_TOKEN',
        resource:
          'AUTH',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      AuditLogger.log({
        user:
          authenticatedUserId,
        action:
          'REFRESH_TOKEN',
        resource:
          'AUTH',
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to refresh token.',
      );
    }
  }
}
