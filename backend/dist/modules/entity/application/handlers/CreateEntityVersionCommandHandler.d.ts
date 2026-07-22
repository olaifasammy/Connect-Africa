import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateEntityVersionCommand } from '../../../entity/application/commands/CreateEntityVersionCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IEntityVersionService } from '../../../entity/domain/services/IEntityVersionService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateEntityVersionCommandHandler implements ICommandHandler<CreateEntityVersionCommand, void> {
    private readonly entityRepository;
    private readonly entityVersionService;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, entityVersionService: IEntityVersionService, eventBus: EventBus);
    handle(command: CreateEntityVersionCommand): Promise<void>;
}
