import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateEntityCommand } from '../../../entity/application/commands/CreateEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/domain/repositories/IAuditRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateEntityCommandHandler implements ICommandHandler<CreateEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: CreateEntityCommand): Promise<void>;
}
