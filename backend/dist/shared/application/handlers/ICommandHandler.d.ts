import { ICommand } from '../commands/ICommand';
export interface ICommandHandler<T extends ICommand, R = void> {
    handle(command: T): Promise<R>;
}
