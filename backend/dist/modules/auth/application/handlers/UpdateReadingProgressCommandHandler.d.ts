import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateReadingProgressCommand } from '../commands/UpdateReadingProgressCommand';
import { IContinueReadingRepository } from '../../../auth/domain/repositories/IContinueReadingRepository';
export declare class UpdateReadingProgressCommandHandler implements ICommandHandler<UpdateReadingProgressCommand, void> {
    private repository;
    constructor(repository: IContinueReadingRepository);
    handle(command: UpdateReadingProgressCommand): Promise<void>;
}
