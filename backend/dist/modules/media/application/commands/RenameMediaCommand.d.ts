import { ICommand } from '../../../../shared/application/commands/ICommand';
import { RenameMediaDto } from '../dtos/RenameMediaDto';
export declare class RenameMediaCommand implements ICommand {
    readonly data: RenameMediaDto;
    constructor(data: RenameMediaDto);
}
