import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RestoreEntityCommand } from '../../../entity/application/commands/RestoreEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RestoreEntityCommandHandler implements ICommandHandler<RestoreEntityCommand, void> {
    private readonly entityRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, eventBus: EventBus);
    handle(command: RestoreEntityCommand): Promise<void>;
}
