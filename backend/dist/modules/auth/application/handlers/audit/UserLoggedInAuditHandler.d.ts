import { ICommandHandler } from '../../../../../shared/application/handlers/ICommandHandler';
import { UserLoggedInEvent } from '../../../../auth/domain/events/UserLoggedInEvent';
export declare class UserLoggedInAuditHandler implements ICommandHandler<UserLoggedInEvent, void> {
    handle(event: UserLoggedInEvent): Promise<void>;
}
