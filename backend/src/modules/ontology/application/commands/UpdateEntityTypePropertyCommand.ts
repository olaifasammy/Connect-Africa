import { ICommand } from '@shared/application/commands/ICommand';

export interface UpdateEntityTypePropertyCommand
  extends ICommand {
  id: string;
  name: string;
  dataType: string;
  minCardinality?: number;
  maxCardinality?: number | null;
  required?: boolean;
  }