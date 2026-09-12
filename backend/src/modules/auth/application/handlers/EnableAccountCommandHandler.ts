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
  EnableAccountCommand,
} from '@modules/auth/application/commands/EnableAccountCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

@provide(
  EnableAccountCommandHandler,
  true,
)
@injectable()
export class EnableAccountCommandHandler
  implements
    ICommandHandler<
      EnableAccountCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,
  ) {}

  async handle(
    command: EnableAccountCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userIdToEnable,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.ACTIVE
      ) {
        throw new AuthenticationError(
          'Account is already active.',
        );
      }

      if (
        user.accountStatus !==
        AccountStatus.DISABLED
      ) {
        throw new AuthenticationError(
          'Only disabled accounts can be enabled.',
        );
      }

      user.activate();

      await this.userRepository.save(
        user,
      );

      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'ENABLE_ACCOUNT',
        resource:
          command.userIdToEnable,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'ENABLE_ACCOUNT',
        resource:
          command.userIdToEnable,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to enable account.',
          );
    }
  }
}
