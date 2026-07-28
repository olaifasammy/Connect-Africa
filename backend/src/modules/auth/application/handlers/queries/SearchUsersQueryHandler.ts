import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { SearchUsersQuery } from '../../queries/SearchUsersQuery';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class SearchUsersQueryHandler implements IQueryHandler<SearchUsersQuery, any> {
  constructor(private userRepository: IUserRepository) {}

  async handle(query: SearchUsersQuery): Promise<any> {
    try {
      const users = await this.userRepository.search(query.searchTerm); // Assume search exists
      
      AuditLogger.log({
        user: query.adminUserId,
        action: 'SEARCH_USERS',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return users;
    } catch (error) {
      AuditLogger.log({
        user: query.adminUserId,
        action: 'SEARCH_USERS',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to search users');
    }
  }
}
