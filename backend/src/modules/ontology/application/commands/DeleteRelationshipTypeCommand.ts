import { ICommand } from '@shared/application/commands/ICommand';

export interface DeleteRelationshipTypeCommand extends ICommand {
  id: string;
}
