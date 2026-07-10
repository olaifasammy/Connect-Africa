import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateRelationshipTypeCommand } from '../commands/CreateRelationshipTypeCommand';
import { RelationshipTypeService } from '../services/RelationshipTypeService';
export declare class CreateRelationshipTypeCommandHandler implements ICommandHandler<CreateRelationshipTypeCommand, void> {
    private readonly relationshipTypeService;
    constructor(relationshipTypeService: RelationshipTypeService);
    handle(command: CreateRelationshipTypeCommand, userId?: string, ipAddress?: string): Promise<void>;
}
