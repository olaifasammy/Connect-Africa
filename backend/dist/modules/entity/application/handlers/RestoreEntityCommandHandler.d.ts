import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RestoreEntityCommand } from '../../../entity/application/commands/RestoreEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RestoreEntityCommandHandler implements ICommandHandler<RestoreEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: RestoreEntityCommand): Promise<void>;
}
