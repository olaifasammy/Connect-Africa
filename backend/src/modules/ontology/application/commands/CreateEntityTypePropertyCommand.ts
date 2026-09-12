import { ICommand } from '@shared/application/commands/ICommand';

export interface CreateEntityTypePropertyCommand
  extends ICommand {
  entityTypeId: string;
  name: string;
  dataType: string;
  minCardinality?: number;
  maxCardinality?: number | null;
  required?: boolean;
  }