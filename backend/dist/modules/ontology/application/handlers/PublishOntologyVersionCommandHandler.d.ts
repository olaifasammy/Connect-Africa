import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { PublishOntologyVersionCommand } from '../commands/PublishOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';
export declare class PublishOntologyVersionCommandHandler implements ICommandHandler<PublishOntologyVersionCommand, void> {
    private readonly ontologyVersionService;
    constructor(ontologyVersionService: OntologyVersionService);
    handle(command: PublishOntologyVersionCommand): Promise<void>;
}
