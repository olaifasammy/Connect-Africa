import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { MergeEntitiesCommand } from '../../../entity/application/commands/MergeEntitiesCommand';
import { IEntityMergeService } from '../../../entity/domain/services/IEntityMergeService';
import { IAuditRepository } from '../../../audit/domain/repositories/IAuditRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class MergeEntitiesCommandHandler implements ICommandHandler<MergeEntitiesCommand, void> {
    private readonly entityMergeService;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityMergeService: IEntityMergeService, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: MergeEntitiesCommand): Promise<void>;
}
