import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateOntologyCommand } from '../commands/UpdateOntologyCommand';
import { OntologyService } from '../services/OntologyService';
export declare class UpdateOntologyCommandHandler implements ICommandHandler<UpdateOntologyCommand, void> {
    private readonly ontologyService;
    constructor(ontologyService: OntologyService);
    handle(command: UpdateOntologyCommand, userId?: string, ipAddress?: string): Promise<void>;
}
