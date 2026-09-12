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
  UpdateProfileCommand,
} from '../commands/UpdateProfileCommand';

import {
  IUserProfileRepository,
} from '@modules/auth/domain/repositories/IUserProfileRepository';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  UserUpdatedEvent,
} from '@modules/auth/domain/events/UserUpdatedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UserId,
} from '@modules/auth/domain/value-objects/UserId';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

@provide(
  UpdateProfileCommandHandler,
  true,
)
@injectable()
export class UpdateProfileCommandHandler
  implements
    ICommandHandler<
      UpdateProfileCommand,
      void
    >
{
  constructor(
    @inject('IUserProfileRepository')
    private readonly profileRepository:
      IUserProfileRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: UpdateProfileCommand,
  ): Promise<void> {
    try {
      const profile =
        await this.profileRepository.findByUserId(
          UserId.create(
            command.userId,
          ),
        );

      if (!profile) {
        throw new AuthenticationError(
          'Profile not found',
        );
      }

      const updates = {
        ...(command.displayName !==
          undefined && {
          displayName:
            command.displayName,
        }),

        ...(command.bio !==
          undefined && {
          bio:
            command.bio,
        }),

        ...(command.avatarUrl !==
          undefined && {
          avatarUrl:
            command.avatarUrl,
        }),
      };

      if (
        Object.keys(updates).length > 0
      ) {
        profile.updateProfile(
          updates,
        );
      }

      await this.profileRepository.save(
        profile,
      );

      AuditLogger.log({
        user:
          command.userId,
        action:
          'UPDATE_PROFILE',
        resource:
          'PROFILE',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new UserUpdatedEvent(
          new UniqueEntityId(
            profile.userId.value,
          ),
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.userId,
        action:
          'UPDATE_PROFILE',
        resource:
          'PROFILE',
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to update profile',
          );
    }
  }
}
