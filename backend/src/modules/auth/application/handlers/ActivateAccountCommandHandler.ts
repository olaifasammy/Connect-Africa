import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  ActivateAccountCommand,
} from '../commands/ActivateAccountCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  AccountActivatedEvent,
} from '@modules/auth/domain/events/AccountActivatedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

@provide(
  ActivateAccountCommandHandler,
  true,
)
@injectable()
export class ActivateAccountCommandHandler
  implements
    ICommandHandler<
      ActivateAccountCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: ActivateAccountCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userId,
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
        AccountStatus.PENDING_VERIFICATION
      ) {
        throw new AuthenticationError(
          'Only pending accounts can be activated.',
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
          'ACTIVATE_ACCOUNT',
        resource:
          command.userId,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new AccountActivatedEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'ACTIVATE_ACCOUNT',
        resource:
          command.userId,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to activate account.',
          );
    }
  }
}
