import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateProfileCommand } from '../commands/UpdateProfileCommand';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserUpdatedEvent } from '@modules/auth/domain/events/UserUpdatedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UpdateProfileCommandHandler implements ICommandHandler<UpdateProfileCommand, void> {
  constructor(
    private profileRepository: IUserProfileRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UpdateProfileCommand): Promise<void> {
    try {
      const profile = await this.profileRepository.findById(UserProfileId.create(command.userId));
      
      if (!profile) {
        throw new AuthenticationError('Profile not found');
      }

      if (command.displayName) profile.updateProfile({ displayName: command.displayName });
      
      await this.profileRepository.save(profile);
      
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_PROFILE',
        resource: 'PROFILE',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new UserUpdatedEvent(new UniqueEntityId(profile.userId.value)));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_PROFILE',
        resource: 'PROFILE',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to update profile');
    }
  }
}
