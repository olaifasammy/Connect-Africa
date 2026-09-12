import { ICommand } from '@shared/application/commands/ICommand';

export interface DeleteEntityTypePropertyCommand
  extends ICommand {
  id: string;
  }