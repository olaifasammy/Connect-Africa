import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '@modules/auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';

export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(private profileRepository: IUserProfileRepository) {}

  async handle(query: GetProfileQuery): Promise<any> {
    try {
      const profile = await this.profileRepository.findById(UserProfileId.create(query.userId));
      
      if (!profile) {
        throw new AuthenticationError('Profile not found');
      }
      
      AuditLogger.log({
        user: query.adminUserId || query.userId,
        action: 'GET_PROFILE',
        resource: query.userId,
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return profile;
    } catch (error) {
      AuditLogger.log({
        user: query.adminUserId || query.userId,
        action: 'GET_PROFILE',
        resource: query.userId,
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get profile');
    }
  }
}
