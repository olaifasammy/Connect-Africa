import { ICommand } from '@shared/application/commands/ICommand';

export interface UpdateEntityTypeCommand extends ICommand {
  id: string;
  name: string;
  description: string;
}
