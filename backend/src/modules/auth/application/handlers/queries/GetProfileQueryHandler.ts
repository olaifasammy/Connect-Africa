import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '@modules/auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';
import { UserId } from '@modules/auth/domain/value-objects/UserId';
import { UserProfile } from '@modules/auth/domain/entities/UserProfile';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(GetProfileQueryHandler, true)
@injectable()
export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(
    @inject('IUserProfileRepository') private profileRepository: IUserProfileRepository,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  @Audit('GET_PROFILE', 'USER_PROFILE')
  async handle(query: GetProfileQuery, userId?: string, ipAddress?: string): Promise<any> {
    const targetUserId = UserId.create(query.userId);
    let profile = await this.profileRepository.findByUserId(targetUserId);

    if (!profile) {
      const user = await this.userRepository.findById(new UniqueEntityId(targetUserId.value));
      const defaultName = user ? user.email.value.split('@')[0] : 'User';
      profile = UserProfile.create({
        userId: targetUserId,
        displayName: defaultName,
      });
      await this.profileRepository.save(profile);
    }

    return profile;
  }
}
