import { ICommand } from '../../../../shared/application/commands/ICommand';
import { ThumbnailDto } from '../dtos/ThumbnailDto';

export class GenerateThumbnailCommand implements ICommand {
  constructor(public readonly data: ThumbnailDto) {}
}
