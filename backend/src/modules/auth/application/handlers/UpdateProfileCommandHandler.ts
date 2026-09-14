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
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

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

import {
  UserProfile,
} from '@modules/auth/domain/entities/UserProfile';

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

    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: UpdateProfileCommand,
  ): Promise<void> {
    try {
      const targetUserId = UserId.create(
        command.userId,
      );

      let profile =
        await this.profileRepository.findByUserId(
          targetUserId,
        );

      if (!profile) {
        const user = await this.userRepository.findById(
          new UniqueEntityId(targetUserId.value),
        );
        const defaultName = user ? user.email.value.split('@')[0] : 'User';
        profile = UserProfile.create({
          userId: targetUserId,
          displayName: defaultName,
        });
        await this.profileRepository.save(profile);
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

        ...(command.coverImageUrl !==
          undefined && {
          coverImageUrl:
            command.coverImageUrl,
        }),

        ...(command.website !==
          undefined && {
          website:
            command.website,
        }),

        ...(command.socialLinks !==
          undefined && {
          socialLinks:
            command.socialLinks,
        }),

        ...(command.country !==
          undefined && {
          country:
            command.country,
        }),

        ...(command.languages !==
          undefined && {
          languages:
            command.languages,
        }),

        ...(command.expertise !==
          undefined && {
          expertise:
            command.expertise,
        }),

        ...(command.researchInterests !==
          undefined && {
          researchInterests:
            command.researchInterests,
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
    } catch (error: any) {
      console.error('UpdateProfileCommandHandler error stack:', error.stack || error);
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
            error.message || 'Failed to update profile',
          );
    }
  }
}
