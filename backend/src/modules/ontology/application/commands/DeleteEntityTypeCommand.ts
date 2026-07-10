import { ICommand } from '@shared/application/commands/ICommand';

export interface DeleteEntityTypeCommand extends ICommand {
  id: string;
}
