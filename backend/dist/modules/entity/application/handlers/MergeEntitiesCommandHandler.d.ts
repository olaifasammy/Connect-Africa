import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { MergeEntitiesCommand } from '../../../entity/application/commands/MergeEntitiesCommand';
import { IEntityMergeService } from '../../../entity/domain/services/IEntityMergeService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class MergeEntitiesCommandHandler implements ICommandHandler<MergeEntitiesCommand, void> {
    private readonly entityMergeService;
    private readonly eventBus;
    constructor(entityMergeService: IEntityMergeService, eventBus: EventBus);
    handle(command: MergeEntitiesCommand): Promise<void>;
}
