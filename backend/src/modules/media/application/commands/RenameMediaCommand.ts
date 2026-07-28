import { ICommand } from '../../../../shared/application/commands/ICommand';
import { RenameMediaDto } from '../dtos/RenameMediaDto';

export class RenameMediaCommand implements ICommand {
  constructor(public readonly data: RenameMediaDto) {}
}
