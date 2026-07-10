import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetCurrentUserQuery } from '@modules/auth/application/queries/GetCurrentUserQuery';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetCurrentUserQueryHandler implements IQueryHandler<GetCurrentUserQuery, any> {
  constructor(private userRepository: IUserRepository) {}

  async handle(query: GetCurrentUserQuery): Promise<any> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(query.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      
      AuditLogger.log({
        user: query.userId,
        action: 'GET_CURRENT_USER',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return user;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_CURRENT_USER',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get current user');
    }
  }
}
