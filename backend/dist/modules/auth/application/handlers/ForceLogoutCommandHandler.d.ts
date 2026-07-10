import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ForceLogoutCommand } from '../commands/ForceLogoutCommand';
import { ISessionRepository } from '../../../auth/domain/repositories/ISessionRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ForceLogoutCommandHandler implements ICommandHandler<ForceLogoutCommand, void> {
    private sessionRepository;
    private eventBus;
    constructor(sessionRepository: ISessionRepository, eventBus: EventBus);
    handle(command: ForceLogoutCommand): Promise<void>;
}
