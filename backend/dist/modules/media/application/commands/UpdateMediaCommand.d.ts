import { ICommand } from '../../../../shared/application/commands/ICommand';
import { UpdateMediaDto } from '../dtos/UpdateMediaDto';
export declare class UpdateMediaCommand implements ICommand {
    readonly data: UpdateMediaDto;
    constructor(data: UpdateMediaDto);
}
