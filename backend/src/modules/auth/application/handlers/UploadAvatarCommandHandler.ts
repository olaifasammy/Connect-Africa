import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UploadAvatarCommand } from '../commands/UploadAvatarCommand';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AvatarUpdatedEvent } from '@modules/auth/domain/events/AvatarUpdatedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UploadAvatarCommandHandler implements ICommandHandler<UploadAvatarCommand, void> {
  constructor(
    private profileRepository: IUserProfileRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UploadAvatarCommand): Promise<void> {
    try {
      const profile = await this.profileRepository.findById(UserProfileId.create(command.userId));
      
      if (!profile) {
        throw new AuthenticationError('Profile not found');
      }

      await this.profileRepository.save(profile);
      
      AuditLogger.log({
        user: command.userId,
        action: 'UPLOAD_AVATAR',
        resource: 'PROFILE',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new AvatarUpdatedEvent(new UniqueEntityId(profile.userId.value), command.avatarUrl));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'UPLOAD_AVATAR',
        resource: 'PROFILE',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to upload avatar');
    }
  }
}
