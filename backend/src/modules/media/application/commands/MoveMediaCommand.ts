import { ICommand } from '../../../../shared/application/commands/ICommand';
import { MoveMediaDto } from '../dtos/MoveMediaDto';

export class MoveMediaCommand implements ICommand {
  constructor(public readonly data: MoveMediaDto) {}
}
