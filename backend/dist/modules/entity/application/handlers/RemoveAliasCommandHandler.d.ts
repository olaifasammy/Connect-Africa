import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RemoveAliasCommand } from '../../../entity/application/commands/RemoveAliasCommand';
import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RemoveAliasCommandHandler implements ICommandHandler<RemoveAliasCommand, void> {
    private readonly entityAliasRepository;
    private readonly eventBus;
    constructor(entityAliasRepository: IEntityAliasRepository, eventBus: EventBus);
    handle(command: RemoveAliasCommand): Promise<void>;
}
