import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateEntityTypeCommand } from '../commands/CreateEntityTypeCommand';
import { EntityTypeService } from '../services/EntityTypeService';
export declare class CreateEntityTypeCommandHandler implements ICommandHandler<CreateEntityTypeCommand, void> {
    private readonly entityTypeService;
    constructor(entityTypeService: EntityTypeService);
    handle(command: CreateEntityTypeCommand, userId?: string, ipAddress?: string): Promise<void>;
}
