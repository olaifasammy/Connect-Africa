import { ICommand } from '../../../../shared/application/commands/ICommand';
import { ThumbnailDto } from '../dtos/ThumbnailDto';
export declare class GenerateThumbnailCommand implements ICommand {
    readonly data: ThumbnailDto;
    constructor(data: ThumbnailDto);
}
