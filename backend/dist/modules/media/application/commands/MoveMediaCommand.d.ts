import { ICommand } from '../../../../shared/application/commands/ICommand';
import { MoveMediaDto } from '../dtos/MoveMediaDto';
export declare class MoveMediaCommand implements ICommand {
    readonly data: MoveMediaDto;
    constructor(data: MoveMediaDto);
}
