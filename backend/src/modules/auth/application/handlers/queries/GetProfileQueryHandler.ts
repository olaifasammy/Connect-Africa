import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '@modules/auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';

@provide(GetProfileQueryHandler, true)
@injectable()
export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(
    @inject('IUserProfileRepository') private profileRepository: IUserProfileRepository
  ) {}

  @Audit('GET_PROFILE', 'USER_PROFILE')
  async handle(query: GetProfileQuery, userId?: string, ipAddress?: string): Promise<any> {
    const profile = await this.profileRepository.findById(UserProfileId.create(query.userId));
      
    if (!profile) {
      throw new AuthenticationError('Profile not found');
    }
      
    return profile;
  }
}
