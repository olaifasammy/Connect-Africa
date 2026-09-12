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
  UploadAvatarCommand,
} from '../commands/UploadAvatarCommand';

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
  AvatarUpdatedEvent,
} from '@modules/auth/domain/events/AvatarUpdatedEvent';

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
  UploadAvatarCommandHandler,
  true,
)
@injectable()
export class UploadAvatarCommandHandler
  implements
    ICommandHandler<
      UploadAvatarCommand,
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
    command: UploadAvatarCommand,
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

      profile.updateProfile({
        avatarUrl:
          command.avatarUrl,
      });

      await this.profileRepository.save(
        profile,
      );

      AuditLogger.log({
        user:
          command.userId,
        action:
          'UPLOAD_AVATAR',
        resource:
          'PROFILE',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new AvatarUpdatedEvent(
          new UniqueEntityId(
            profile.userId.value,
          ),
          command.avatarUrl,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.userId,
        action:
          'UPLOAD_AVATAR',
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
            'Failed to upload avatar',
          );
    }
  }
}
