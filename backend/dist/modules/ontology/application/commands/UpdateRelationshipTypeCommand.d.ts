import { ICommand } from '../../../../shared/application/commands/ICommand';
export interface UpdateRelationshipTypeCommand extends ICommand {
    id: string;
    name: string;
    description: string;
}
