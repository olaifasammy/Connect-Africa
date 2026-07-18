import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ArchiveEntityCommand } from '../../../entity/application/commands/ArchiveEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ArchiveEntityCommandHandler implements ICommandHandler<ArchiveEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: ArchiveEntityCommand): Promise<void>;
}
