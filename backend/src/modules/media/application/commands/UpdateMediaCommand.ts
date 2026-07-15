import { ICommand } from '../../../../shared/application/commands/ICommand';
import { UpdateMediaDto } from '../dtos/UpdateMediaDto';

export class UpdateMediaCommand implements ICommand {
  constructor(public readonly data: UpdateMediaDto) {}
}
