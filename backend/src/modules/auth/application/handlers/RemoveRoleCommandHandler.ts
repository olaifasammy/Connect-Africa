import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveRoleCommand } from '../commands/RemoveRoleCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { RoleRemovedEvent } from '@modules/auth/domain/events/RoleRemovedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Roles } from '@modules/auth/domain/policies/rbac/Role';

@provide(RemoveRoleCommandHandler, true)
@injectable()
export class RemoveRoleCommandHandler
  implements ICommandHandler<RemoveRoleCommand, void>
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,
    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: RemoveRoleCommand): Promise<void> {
    try {
      const actor = await this.userRepository.findById(
        new UniqueEntityId(command.adminUserId),
      );

      if (!actor) {
        throw new AuthenticationError('Administrator not found.');
      }

      if (actor.role !== Roles.ADMIN.name) {
        throw new AuthenticationError(
          'Only administrators can manage user roles.',
        );
      }

      if (command.adminUserId === command.userId) {
        throw new AuthenticationError(
          'Administrators cannot change their own role.',
        );
      }

      const user = await this.userRepository.findById(
        new UniqueEntityId(command.userId),
      );

      if (!user) {
        throw new AuthenticationError('User not found.');
      }

      const role = command.role.trim().toUpperCase();

      if (!(role in Roles)) {
        throw new AuthenticationError('Invalid role.');
      }

      user.removeRole(role);
      await this.userRepository.save(user);

      await this.sessionRepository.revokeAllUserSessions(user.id);

      AuditLogger.log({
        user: command.adminUserId,
        action: 'REMOVE_ROLE',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress,
      });

      await this.eventBus.publish(
        new RoleRemovedEvent(user.id, role),
      );
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'REMOVE_ROLE',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError('Failed to remove role');
    }
  }
}
