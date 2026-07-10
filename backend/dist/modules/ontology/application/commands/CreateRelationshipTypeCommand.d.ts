import { ICommand } from '../../../../shared/application/commands/ICommand';
export interface CreateRelationshipTypeCommand extends ICommand {
    ontologyId: string;
    name: string;
    description: string;
    sourceEntityTypeId: string;
    targetEntityTypeId: string;
}
