import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { PublishEntityCommand } from '../../../entity/application/commands/PublishEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class PublishEntityCommandHandler implements ICommandHandler<PublishEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: PublishEntityCommand): Promise<void>;
}
