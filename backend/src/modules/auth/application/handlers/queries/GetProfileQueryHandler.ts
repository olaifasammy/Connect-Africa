import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '@modules/auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';

export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(
    private profileRepository: IUserProfileRepository,
    private eventBus: EventBus
  ) {}

  async handle(query: GetProfileQuery): Promise<any> {
    try {
      const profile = await this.profileRepository.findById(UserProfileId.create(query.userId));
      
      if (!profile) {
        throw new AuthenticationError('Profile not found');
      }
      
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'GET_PROFILE',
        actorId: query.adminUserId || query.userId,
        actorType: 'USER',
        resourceId: query.userId,
        resourceType: 'USER_PROFILE',
        ipAddress: query.ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
      
      return profile;
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'GET_PROFILE',
        actorId: query.adminUserId || query.userId,
        actorType: 'USER',
        resourceId: query.userId,
        resourceType: 'USER_PROFILE',
        ipAddress: query.ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get profile');
    }
  }
}
