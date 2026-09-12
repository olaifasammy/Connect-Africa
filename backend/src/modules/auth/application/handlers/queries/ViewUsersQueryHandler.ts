import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ViewUsersQuery } from '../../queries/ViewUsersQuery';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

@provide(ViewUsersQueryHandler, true)
@injectable()
export class ViewUsersQueryHandler implements IQueryHandler<ViewUsersQuery, any> {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async handle(query: ViewUsersQuery): Promise<any> {
    try {
      // Policy enforcement would be here
      const users = await this.userRepository.findAll(); // Assume this exists
      
      AuditLogger.log({
        user: query.adminUserId,
        action: 'VIEW_USERS',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return users;
    } catch (error) {
      AuditLogger.log({
        user: query.adminUserId,
        action: 'VIEW_USERS',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to view users');
    }
  }
}
