import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateEntityCommand } from '../../../entity/application/commands/CreateEntityCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { IOntologyGraphService } from '../../../ontology/public';
export declare class CreateEntityCommandHandler implements ICommandHandler<CreateEntityCommand, void> {
    private readonly entityRepository;
    private readonly ontologyGraphService;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, ontologyGraphService: IOntologyGraphService, eventBus: EventBus);
    handle(command: CreateEntityCommand): Promise<void>;
}
