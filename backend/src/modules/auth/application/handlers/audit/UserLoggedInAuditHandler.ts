import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UserLoggedInEvent } from '@modules/auth/domain/events/UserLoggedInEvent';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

@provide(UserLoggedInAuditHandler, true)
@injectable()
export class UserLoggedInAuditHandler implements ICommandHandler<UserLoggedInEvent, void> {
  async handle(event: UserLoggedInEvent): Promise<void> {
    AuditLogger.log({
      user: event.userId.toString(),
      action: 'LOGIN',
      resource: 'AUTH',
      status: 'SUCCESS',
    });
  }
}
