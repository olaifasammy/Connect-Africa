import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { CreateOntologyCommand } from '../../../ontology/application/commands/CreateOntologyCommand';
import { OntologyResponseDto } from '../../../ontology/application/dto/OntologyDto';
import { OntologyService } from '../../../ontology/application/services/OntologyService';
export declare class CreateOntologyCommandHandler implements ICommandHandler<CreateOntologyCommand, OntologyResponseDto> {
    private readonly ontologyService;
    constructor(ontologyService: OntologyService);
    handle(command: CreateOntologyCommand, userId?: string, ipAddress?: string): Promise<OntologyResponseDto>;
}
