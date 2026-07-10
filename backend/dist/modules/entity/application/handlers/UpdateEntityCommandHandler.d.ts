import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateEntityCommand } from '../../../entity/application/commands/UpdateEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/domain/repositories/IAuditRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateEntityCommandHandler implements ICommandHandler<UpdateEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: UpdateEntityCommand): Promise<void>;
}
