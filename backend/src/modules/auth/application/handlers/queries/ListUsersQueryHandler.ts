import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListUsersQuery } from '@modules/auth/application/queries/ListUsersQuery';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery, any> {
  constructor(private userRepository: IUserRepository) {}

  async handle(query: ListUsersQuery): Promise<any> {
    try {
      const users = await this.userRepository.findAll();
      
      AuditLogger.log({
        user: query.adminUserId,
        action: 'LIST_USERS',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return users;
    } catch (error) {
      AuditLogger.log({
        user: query.adminUserId,
        action: 'LIST_USERS',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to list users');
    }
  }
}
