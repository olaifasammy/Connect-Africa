import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateOntologyVersionCommand } from '../commands/CreateOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';
export declare class CreateOntologyVersionCommandHandler implements ICommandHandler<CreateOntologyVersionCommand, void> {
    private readonly ontologyVersionService;
    constructor(ontologyVersionService: OntologyVersionService);
    handle(command: CreateOntologyVersionCommand): Promise<void>;
}
