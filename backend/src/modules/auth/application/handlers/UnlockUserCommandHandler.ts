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
  UnlockUserCommand,
} from '@modules/auth/application/commands/UnlockUserCommand';

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

@provide(
  UnlockUserCommandHandler,
  true,
)
@injectable()
export class UnlockUserCommandHandler
  implements
    ICommandHandler<
      UnlockUserCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,
  ) {}

  async handle(
    command: UnlockUserCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userIdToUnlock,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (!user.isLocked()) {
        throw new AuthenticationError(
          'Account is not locked.',
        );
      }

      user.unlock();

      await this.userRepository.save(
        user,
      );

      AuditLogger.log({
        user:
          command.userIdToUnlock,
        action:
          'UNLOCK_USER',
        resource:
          'USER',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });
    } catch (error) {
      AuditLogger.log({
        user:
          command.userIdToUnlock,
        action:
          'UNLOCK_USER',
        resource:
          'USER',
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to unlock user.',
          );
    }
  }
}
