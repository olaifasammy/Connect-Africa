import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { AddAliasCommand } from '../../../entity/application/commands/AddAliasCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AddAliasCommandHandler implements ICommandHandler<AddAliasCommand, void> {
    private readonly entityRepository;
    private readonly entityAliasRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, entityAliasRepository: IEntityAliasRepository, eventBus: EventBus);
    handle(command: AddAliasCommand): Promise<void>;
}
